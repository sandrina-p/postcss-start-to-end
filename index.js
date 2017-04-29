/* eslint indent: ["error", 4, { "SwitchCase": 1 }] */
/* eslint max-len: ["error", 140 ] */

var postcss = require('postcss');

const defaultOpts = {
    direction: 'LTR',
    warnings: true
};

const propsToConvert = [
    'margin-left',
    'margin-right',
    'padding-left',
    'padding-right',
    'border-left',
    'border-right',
    'border-top-left',
    'border-top-right',
    'border-bottom-right',
    'border-bottom-left',
    'left',
    'right'
];

const propsWithValuesToConvert = [
    'clear',
    'text-align',
    'float'
];

var finalOpts = {};
var isLTR = null;
var logic = {};
var warningMsg = '';


function warnAboutNoStartEndSyntax(ruleProp, ruleValue, line, result) {

    if (propsToConvert.indexOf(ruleProp) > -1) {
        const newRule = ruleProp.replace('left', logic.left).replace('right', logic.right);

        warningMsg = `"${ruleProp}:" found on line ${line}. Replace it by "${newRule}" to support LTR and RTL`;

        result.warn(warningMsg);

        return true;
    }

    if (propsWithValuesToConvert.indexOf(ruleProp) > -1 && ['left', 'right'].indexOf(ruleValue) > -1) {
        const newValue = ruleValue.replace('left', logic.left).replace('right', logic.right);

        warningMsg = `"${ruleProp}: ${ruleValue};" found on line ${line}. Replace it by "${ruleProp}: ${newValue};" to support LTR and RTL`;

        result.warn(warningMsg);

        return true;
    }

    return false;
}

function convertPropsWithStartEnd(ruleProp) {
    switch (ruleProp) {

        // ruleProp that contains "start"
        case 'start':
        case 'border-start':
        case 'border-top-start':
        case 'border-bottom-start':
        case 'margin-start':
        case 'padding-start':
            return ruleProp.replace('start', logic.start);

        // ruleProp that contains "end"
        case 'end':
        case 'border-end':
        case 'border-top-end':
        case 'border-bottom-end':
        case 'margin-end':
        case 'padding-end':
            return ruleProp.replace('end', logic.end);

        default:
            return false;
    }
}

function convertValueWithStartEnd(ruleProp, ruleValue) {
    switch (ruleProp) {
        case 'clear':
        case 'float':
        case 'text-align':
            if (ruleValue === 'start') {
                return logic.start;
            } else if (ruleValue === 'end') {
                return logic.end;
            }
            return ruleValue;

        default:
            return false;
    }
}

function convertPropWith4Values(ruleProp, ruleValue) {
    switch (ruleProp) {
        case 'margin':
        case 'padding':
            if (logic.reorderValues) {

                // [1] split values by " " (spaces) found.
                // '1rem 1rem 1rem 4rem'
                // '1rem  1rem   1rem 1rem'
                // both should return ['1rem', '1rem', '1rem', '4rem']
                const arrValues = ruleValue.split(/\s{1,}/g); // [1]

                // if value has all the 4 sides
                // swap 2nd value ([1]) with last 4th value ([3])
                if (arrValues.length === 4) {
                    const valueToStore = arrValues[1];

                    arrValues[1] = arrValues[3];
                    arrValues[3] = valueToStore;

                    return arrValues.join(' ');
                }

                return false;
            }

            return false;
        default:
            return false;
    }
}


module.exports = postcss.plugin('postcss-start-to-end', opts => {

    // Work with options
    finalOpts = Object.assign({}, defaultOpts, opts);
    isLTR = finalOpts.direction === 'LTR';
    logic = {
        start: isLTR ? 'left' : 'right',
        end: isLTR ? 'right' : 'left',
        left: isLTR ? 'start' : 'end',
        right: isLTR ? 'end' : 'start',
        reorderValues: !isLTR
    };

    return (root, result) => {

        // Transform CSS AST
        root.walkDecls(rule => {

            if (rule.value) {
                if (finalOpts.warnings) {
                    warnAboutNoStartEndSyntax(rule.prop, rule.value, rule.source.start.line, result);
                }

                const newProp = convertPropsWithStartEnd(rule.prop);
                if (newProp) {
                    rule.prop = newProp;
                    return true;
                }

                const newValue = convertValueWithStartEnd(rule.prop, rule.value);
                if (newValue) {
                    rule.value = newValue;
                    return true;
                }

                const newSwapValue = convertPropWith4Values(rule.prop, rule.value);
                if (newSwapValue) {
                    rule.value = newSwapValue;
                    return true;
                }
            }

            return true;
        });
    };
});
