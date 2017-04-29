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

    return (root) => {

        root.walkDecls(rule => {

            switch (rule.prop) {

                // prop that contains "start"
                case 'start':
                case 'border-start':
                case 'border-top-start':
                case 'border-bottom-start':
                case 'margin-start':
                case 'padding-start':
                    rule.prop = rule.prop.replace('start', `${logic.start}`);
                    break;

                // prop that contains "end"
                case 'end':
                case 'border-end':
                case 'border-top-end':
                case 'border-bottom-end':
                case 'margin-end':
                case 'padding-end':
                    rule.prop = rule.prop.replace('end', `${logic.end}`);
                    break;

                // prop.value that contains "start"
                case 'clear':
                case 'float':
                case 'text-align':
                    if (rule.value === 'start') {
                        rule.value = logic.start;
                    } else if ( rule.value === 'end') {
                        rule.value = logic.end;
                    }
                    break;

                // prop that might have 4 arguments
                case 'margin':
                case 'padding':

                    if (logic.reorderValues) {
                        /**
                         * [1] split values by spaces character found:
                         * '1rem  1rem   1rem 1rem'
                         * '1rem 1rem 1rem 4rem'
                         * both should return: ['1rem', '1rem', '1rem', '4rem']
                         */

                        const arrValues = rule.value.split(/\s{1,}/g); // [1]

                        // if arrValues has 4 arguments (all 4 sides)
                        if (arrValues.length === 4) {

                            const valueToStore = arrValues[1];
                            arrValues[1] = arrValues[3];
                            arrValues[3] = valueToStore;
                            rule.value = arrValues.join(' ');
                        }
                    }

                    break;
                default:
            }
        });
    };
});
