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

    return run(css, cssOutputted, { });
});

it('RTL: border-start: -> border-right:', () => {
    css = '.foo { border-start: 1px solid teal; }';
    cssOutputted = '.foo { border-right: 1px solid teal; }';

    return run(css, cssOutputted, { direction: 'RTL' });
});

it('LTR: border-end -> border-right:', () => {
    css = '.foo { border-end: 1px solid teal; }';
    cssOutputted = '.foo { border-right: 1px solid teal; }';

    return run(css, cssOutputted, { });
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

    return run(css, cssOutputted, { });
});

it('RTL: padding-start: -> padding-right:', () => {
    css = '.foo { padding-start: 1rem; }';
    cssOutputted = '.foo { padding-right: 1rem; }';

    return run(css, cssOutputted, { direction: 'RTL' });
});

it('LTR: padding-end -> padding-right:', () => {
    css = '.foo { padding-end: 1rem; }';
    cssOutputted = '.foo { padding-right: 1rem; }';

    return run(css, cssOutputted, { });
});

it('RTL: padding-end -> padding-left:', () => {
    css = '.foo { padding-end: 1rem; }';
    cssOutputted = '.foo { padding-left: 1rem; }';

    return run(css, cssOutputted, { direction: 'RTL' });
});


/* ==================================================================
    Margin Tests
================================================================== */

it('LTR: margin-start: -> margin-left:', () => {
    css = '.foo { margin-start: 1rem; }';
    cssOutputted = '.foo { margin-left: 1rem; }';

    return run(css, cssOutputted, { });
});

it('RTL: margin-start: -> margin-right:', () => {
    css = '.foo { margin-start: 1rem; }';
    cssOutputted = '.foo { margin-right: 1rem; }';

    return run(css, cssOutputted, { direction: 'RTL' });
});

it('LTR: margin-end -> margin-right:', () => {
    css = '.foo { margin-end: 1rem; }';
    cssOutputted = '.foo { margin-right: 1rem; }';

    return run(css, cssOutputted, { });
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

    return run(css, cssOutputted, { });
});

it('RTL: start: -> right:', () => {
    css = '.foo { start: 1rem; }';
    cssOutputted = '.foo { right: 1rem; }';

    return run(css, cssOutputted, { direction: 'RTL' });
});

it('LTR: end: -> right:', () => {
    css = '.foo { end: 1rem; }';
    cssOutputted = '.foo { right: 1rem; }';

    return run(css, cssOutputted, { });
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

    return run(css, cssOutputted, { });
});

it('RTL: text-align: start; -> text-align: right;', () => {
    css = '.foo { text-align: start; }';
    cssOutputted = '.foo { text-align: right; }';

    return run(css, cssOutputted, { direction: 'RTL' });
});

it('LTR: text-align: end; -> text-align: right;', () => {
    css = '.foo { text-align: end; }';
    cssOutputted = '.foo { text-align: right; }';

    return run(css, cssOutputted, { });
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

    return run(css, cssOutputted, { });
});

it('RTL: clear: start; -> clear: right;', () => {
    css = '.foo { clear: start; }';
    cssOutputted = '.foo { clear: right; }';

    return run(css, cssOutputted, { direction: 'RTL' });
});

it('LTR: clear: end; -> clear: right;', () => {
    css = '.foo { clear: end; }';
    cssOutputted = '.foo { clear: right; }';

    return run(css, cssOutputted, { });
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

    return run(css, cssOutputted, { });
});

it('RTL: float: start; -> float: right;', () => {
    css = '.foo { float: start; }';
    cssOutputted = '.foo { float: right; }';

    return run(css, cssOutputted, { direction: 'RTL' });
});

it('LTR: float: end; -> float: right;', () => {
    css = '.foo { float: end; }';
    cssOutputted = '.foo { float: right; }';

    return run(css, cssOutputted, { });
});

it('RTL: float: end; -> float: left;', () => {
    css = '.foo { float: end; }';
    cssOutputted = '.foo { float: left; }';

    return run(css, cssOutputted, { direction: 'RTL' });
});
