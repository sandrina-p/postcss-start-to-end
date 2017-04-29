/* eslint indent: ["error", 4, { "SwitchCase": 1 }] */

var postcss = require('postcss');

module.exports = postcss.plugin('postcss-start-to-end', opts => {
    opts = opts || {};

    const defaultOpts = {
        direction: 'LTR',
        warnings: true
    };

    const finalOpts = Object.assign({}, defaultOpts, opts);

    const isLTR = finalOpts.direction === 'LTR';

    const logic = {
        start: isLTR ? 'left' : 'right',
        end: isLTR ? 'right' : 'left',
        reorderValues: !isLTR
    };

    function lookForPropsWithStartEnd(ruleProp) {
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

    function lookForValueWithStartEnd(ruleProp, ruleValue) {
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

    function lookForPropWith4Values(ruleProp, ruleValue) {
        switch (ruleProp) {
            case 'margin':
            case 'padding':
                if (logic.reorderValues) {

                    // [1] split values by " " (spaces) found:
                    // '1rem 1rem 1rem 4rem'
                    // '1rem  1rem   1rem 1rem'
                    // both should return: ['1rem', '1rem', '1rem', '4rem']
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

    return (root) => {

        root.walkDecls(rule => {

            const newProp = lookForPropsWithStartEnd(rule.prop);
            if (newProp) {
                rule.prop = newProp;
                return true;
            }

            const newValue = lookForValueWithStartEnd(rule.prop, rule.value);
            if (newValue) {
                rule.value = newValue;
                return true;
            }

            const newSwapValue = lookForPropWith4Values(rule.prop, rule.value);
            if (newSwapValue) {
                rule.value = newSwapValue;
                return true;
            }

            return false;
        });
    };
});
