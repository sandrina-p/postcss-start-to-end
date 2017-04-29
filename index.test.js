/* eslint max-len: ["error", 120 ] */

var postcss = require('postcss');

var plugin = require('./');

function run(input, output, opts) {
    return postcss([ plugin(opts) ]).process(input)
        .then(result => {
            expect(result.css).toEqual(output);
            expect(result.warnings().length).toBe(0);
        });
}

var css = '';
var cssOutputted = '';

/* ==================================================================
    Border Tests
================================================================== */

it('LTR: border-start: -> border-left:', () => {
    css = '.foo { border-start: 1px solid teal; }';
    cssOutputted = '.foo { border-left: 1px solid teal; }';

    return run(css, cssOutputted, {});
});

it('RTL: border-start: -> border-right:', () => {
    css = '.foo { border-start: 1px solid teal; }';
    cssOutputted = '.foo { border-right: 1px solid teal; }';

    return run(css, cssOutputted, { direction: 'RTL' });
});

it('LTR: border-end -> border-right:', () => {
    css = '.foo { border-end: 1px solid teal; }';
    cssOutputted = '.foo { border-right: 1px solid teal; }';

    return run(css, cssOutputted, {});
});

it('RTL: border-end -> border-left:', () => {
    css = '.foo { border-end: 1px solid teal; }';
    cssOutputted = '.foo { border-left: 1px solid teal; }';

    return run(css, cssOutputted, { direction: 'RTL' });
});

/* ==================================================================
    Padding Tests
================================================================== */

it('LTR: padding-start: -> padding-left:', () => {
    css = '.foo { padding-start: 1rem; }';
    cssOutputted = '.foo { padding-left: 1rem; }';

    return run(css, cssOutputted, {});
});

it('RTL: padding-start: -> padding-right:', () => {
    css = '.foo { padding-start: 1rem; }';
    cssOutputted = '.foo { padding-right: 1rem; }';

    return run(css, cssOutputted, { direction: 'RTL' });
});

it('LTR: padding-end -> padding-right:', () => {
    css = '.foo { padding-end: 1rem; }';
    cssOutputted = '.foo { padding-right: 1rem; }';

    return run(css, cssOutputted, {});
});

it('RTL: padding-end -> padding-left:', () => {
    css = '.foo { padding-end: 1rem; }';
    cssOutputted = '.foo { padding-left: 1rem; }';

    return run(css, cssOutputted, { direction: 'RTL' });
});

it('LTR: padding: 1rem 1rem 1rem 2rem; -> same', () => {
    css = '.foo { padding: 1rem 1rem 1rem 2rem; }';

    return run(css, css, {});
});

it('LTR: padding: 1rem 1rem   1rem  2rem; -> same', () => {
    css = '.foo { padding: 1rem 1rem   1rem  2rem; }';

    return run(css, css, {});
});

it('RTL: padding: 1rem 2rem 1rem 2rem; -> padding: 1rem 2rem 1rem 1rem;', () => {
    css = '.foo { padding: 1rem 1rem 1rem 2rem; }';
    cssOutputted = '.foo { padding: 1rem 2rem 1rem 1rem; }';

    return run(css, cssOutputted, { direction: 'RTL' });
});

it('RTL: padding: 1rem 1rem   1rem  3rem; -> padding: 1rem 3rem 1rem 1rem;', () => {
    css = '.foo { padding: 1rem 1rem   1rem  3rem; }';
    cssOutputted = '.foo { padding: 1rem 3rem 1rem 1rem; }';

    return run(css, cssOutputted, { direction: 'RTL' });
});


/* ==================================================================
    Margin Tests
================================================================== */

it('LTR: margin-start: -> margin-left:', () => {
    css = '.foo { margin-start: 1rem; }';
    cssOutputted = '.foo { margin-left: 1rem; }';

    return run(css, cssOutputted, {});
});

it('RTL: margin-start: -> margin-right:', () => {
    css = '.foo { margin-start: 1rem; }';
    cssOutputted = '.foo { margin-right: 1rem; }';

    return run(css, cssOutputted, { direction: 'RTL' });
});

it('LTR: margin-end -> margin-right:', () => {
    css = '.foo { margin-end: 1rem; }';
    cssOutputted = '.foo { margin-right: 1rem; }';

    return run(css, cssOutputted, {});
});

it('RTL: margin-end -> margin-left:', () => {
    css = '.foo { margin-end: 1rem; }';
    cssOutputted = '.foo { margin-left: 1rem; }';

    return run(css, cssOutputted, { direction: 'RTL' });
});

/* ==================================================================
    Position Tests
================================================================== */

it('LTR: start: -> left:', () => {
    css = '.foo { start: 1rem; }';
    cssOutputted = '.foo { left: 1rem; }';

    return run(css, cssOutputted, {});
});

it('RTL: start: -> right:', () => {
    css = '.foo { start: 1rem; }';
    cssOutputted = '.foo { right: 1rem; }';

    return run(css, cssOutputted, { direction: 'RTL' });
});

it('LTR: end: -> right:', () => {
    css = '.foo { end: 1rem; }';
    cssOutputted = '.foo { right: 1rem; }';

    return run(css, cssOutputted, {});
});

it('RTL: end: -> left:', () => {
    css = '.foo { end: 1rem; }';
    cssOutputted = '.foo { left: 1rem; }';

    return run(css, cssOutputted, { direction: 'RTL' });
});


/* ==================================================================
    Text-align Tests
================================================================== */

it('LTR: text-align: start; -> text-align: left;', () => {
    css = '.foo { text-align: start; }';
    cssOutputted = '.foo { text-align: left; }';

    return run(css, cssOutputted, {});
});

it('RTL: text-align: start; -> text-align: right;', () => {
    css = '.foo { text-align: start; }';
    cssOutputted = '.foo { text-align: right; }';

    return run(css, cssOutputted, { direction: 'RTL' });
});

it('LTR: text-align: end; -> text-align: right;', () => {
    css = '.foo { text-align: end; }';
    cssOutputted = '.foo { text-align: right; }';

    return run(css, cssOutputted, {});
});

it('RTL: text-align: end; -> text-align: left;', () => {
    css = '.foo { text-align: end; }';
    cssOutputted = '.foo { text-align: left; }';

    return run(css, cssOutputted, { direction: 'RTL' });
});

/* ==================================================================
    Clear Tests
================================================================== */

it('LTR: clear: start; -> clear: left;', () => {
    css = '.foo { clear: start; }';
    cssOutputted = '.foo { clear: left; }';

    return run(css, cssOutputted, {});
});

it('RTL: clear: start; -> clear: right;', () => {
    css = '.foo { clear: start; }';
    cssOutputted = '.foo { clear: right; }';

    return run(css, cssOutputted, { direction: 'RTL' });
});

it('LTR: clear: end; -> clear: right;', () => {
    css = '.foo { clear: end; }';
    cssOutputted = '.foo { clear: right; }';

    return run(css, cssOutputted, {});
});

it('RTL: clear: end; -> clear: left;', () => {
    css = '.foo { clear: end; }';
    cssOutputted = '.foo { clear: left; }';

    return run(css, cssOutputted, { direction: 'RTL' });
});


/* ==================================================================
    Float Tests
================================================================== */

it('LTR: float: start; -> float: left;', () => {
    css = '.foo { float: start; }';
    cssOutputted = '.foo { float: left; }';

    return run(css, cssOutputted, {});
});

it('RTL: float: start; -> float: right;', () => {
    css = '.foo { float: start; }';
    cssOutputted = '.foo { float: right; }';

    return run(css, cssOutputted, { direction: 'RTL' });
});

it('LTR: float: end; -> float: right;', () => {
    css = '.foo { float: end; }';
    cssOutputted = '.foo { float: right; }';

    return run(css, cssOutputted, {});
});

it('RTL: float: end; -> float: left;', () => {
    css = '.foo { float: end; }';
    cssOutputted = '.foo { float: left; }';

    return run(css, cssOutputted, { direction: 'RTL' });
});


/* ==================================================================
    Multiple Props Test
================================================================== */
it('LTR: Convert multiple rules', () => {
    css = '.foo { color: red; float: end; margin-end: 1rem;}';
    cssOutputted = '.foo { color: red; float: right; margin-right: 1rem;}';

    return run(css, cssOutputted, {});
});

it('RTL: Convert multiple rules', () => {
    css = '.foo { color: red; float: end; margin-end: 1rem;}';
    cssOutputted = '.foo { color: red; float: left; margin-left: 1rem;}';

    return run(css, cssOutputted, { direction: 'RTL' });
});

/* ==================================================================
    Warning Props Test
================================================================== */

it('LTR: Warn about margin-right to use margin-end ', () => {
    css = '.foo { margin-right: 1rem;}';
    const warning = '"margin-right:" found on line 1. Replace it by "margin-end" to support LTR and RTL';

    return postcss([ plugin({}) ]).process(css)
        .then(result => {
            expect(result.css).toEqual(css);
            expect(result.warnings()[0]).toHaveProperty('text', warning);
        });
});

it('LTR: Warn about right to use end ', () => {
    css = '.foo { right: 10%;}';
    const warning = '"right:" found on line 1. Replace it by "end" to support LTR and RTL';

    return postcss([ plugin({}) ]).process(css)
        .then(result => {
            expect(result.css).toEqual(css);
            expect(result.warnings()[0]).toHaveProperty('text', warning);
        });
});

it('RTL: Warn about padding-left to use padding-end', () => {
    css = '.foo { padding-left: 1rem; }';
    const warning = '"padding-left:" found on line 1. Replace it by "padding-end" to support LTR and RTL';

    return postcss([ plugin( { direction: 'RTL' } ) ]).process(css)
        .then(result => {
            expect(result.css).toEqual(css);
            expect(result.warnings()[0]).toHaveProperty('text', warning);
        });
});


/* ==================================================================
    Warning Values Test
================================================================== */

it('LTR: Warn about float: right; to use float: end;', () => {
    css = '.foo { float: right; }';
    const warning = '"float: right;" found on line 1. Replace it by "float: end;" to support LTR and RTL';

    return postcss([ plugin() ]).process(css)
        .then(result => {
            expect(result.css).toEqual(css);
            expect(result.warnings()[0]).toHaveProperty('text', warning);
        });
});

it('RTL: Warn about float: right; to use float: end;', () => {
    css = '.foo { text-align: left; }';
    const warning = '"text-align: left;" found on line 1. Replace it by "text-align: end;" to support LTR and RTL';

    return postcss([ plugin( { direction: 'RTL' } ) ]).process(css)
        .then(result => {
            expect(result.css).toEqual(css);
            expect(result.warnings()[0]).toHaveProperty('text', warning);
        });
});

it('LTR: Do not warn about float: center;', () => {
    css = '.foo { float: center; }';

    return run(css, css, { });
});

it('LTR: Do not warn when `warning: disabled`', () => {
    css = '.foo { text-align: left; }';

    return run(css, css, { warnings: false });
});
