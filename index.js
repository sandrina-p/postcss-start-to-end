var postcss = require('postcss');

/* eslint indent: ["error", 4, { "SwitchCase": 1 }] */
module.exports = postcss.plugin('postcss-start-to-end', opts => {

    const defaultOpts = {
        direction: 'LTR',
        warnings: 'true'
    };
    opts = opts || {};

    const finalOpts = Object.assign({}, defaultOpts, opts);

    const logic = {
        start: finalOpts.direction === 'LTR' ? 'left' : 'right',
        end: finalOpts.direction === 'LTR' ? 'right' : 'left'
    };

    return (root) => {

        root.walkDecls(rule => {

            switch (rule.prop) {

                // prop that contains "start"
                case 'start':
                case 'border-start':
                case 'border-top-start':
                case 'border-bottom-start':
                case 'padding-start':
                case 'margin-start':
                    rule.prop = rule.prop.replace('start', `${logic.start}`);
                    break;

                // prop that contains "end"
                case 'end':
                case 'border-end':
                case 'border-top-end':
                case 'border-bottom-end':
                case 'padding-end':
                case 'margin-end':
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
                default:
            }
        });
    };
});
