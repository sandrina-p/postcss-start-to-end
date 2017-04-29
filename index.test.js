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

it('LTR: border-start -> border-left', () => {
    css = '.foo { border-start: 1px solid teal; }';
    cssOutputted = '.foo { border-left: 1px solid teal; }';

    return run(css, cssOutputted, { });
});

it('LTR: border-end -> border-right', () => {
    css = '.foo { border-end: 1px solid teal; }';
    cssOutputted = '.foo { border-right: 1px solid teal; }';

    return run(css, cssOutputted, { });
});

it('RTL: border-start -> border-right', () => {
    css = '.foo { border-start: 1px solid teal; }';
    cssOutputted = '.foo { border-right: 1px solid teal; }';

    return run(css, cssOutputted, { direction: 'RTL' });
});

it('RTL: border-end -> border-left', () => {
    css = '.foo { border-end: 1px solid teal; }';
    cssOutputted = '.foo { border-left: 1px solid teal; }';

    return run(css, cssOutputted, { direction: 'RTL' });
});

/* ==================================================================
    Padding Tests
================================================================== */

it('LTR: padding-start -> padding-left', () => {
    css = '.foo { padding-start: 1rem; }';
    cssOutputted = '.foo { padding-left: 1rem; }';

    return run(css, cssOutputted, { });
});

it('LTR: padding-end -> padding-right', () => {
    css = '.foo { padding-end: 1rem; }';
    cssOutputted = '.foo { padding-right: 1rem; }';

    return run(css, cssOutputted, { });
});

it('RTL: padding-start -> padding-right', () => {
    css = '.foo { padding-start: 1rem; }';
    cssOutputted = '.foo { padding-right: 1rem; }';

    return run(css, cssOutputted, { direction: 'RTL' });
});

it('RTL: padding-end -> padding-left', () => {
    css = '.foo { padding-end: 1rem; }';
    cssOutputted = '.foo { padding-left: 1rem; }';

    return run(css, cssOutputted, { direction: 'RTL' });
});


/* ==================================================================
    Margin Tests
================================================================== */

it('LTR: margin-start -> margin-left', () => {
    css = '.foo { margin-start: 1rem; }';
    cssOutputted = '.foo { margin-left: 1rem; }';

    return run(css, cssOutputted, { });
});

it('LTR: margin-end -> margin-right', () => {
    css = '.foo { margin-end: 1rem; }';
    cssOutputted = '.foo { margin-right: 1rem; }';

    return run(css, cssOutputted, { });
});

it('RTL: margin-start -> margin-right', () => {
    css = '.foo { margin-start: 1rem; }';
    cssOutputted = '.foo { margin-right: 1rem; }';

    return run(css, cssOutputted, { direction: 'RTL' });
});

it('RTL: margin-end -> margin-left', () => {
    css = '.foo { margin-end: 1rem; }';
    cssOutputted = '.foo { margin-left: 1rem; }';

    return run(css, cssOutputted, { direction: 'RTL' });
});

/* ==================================================================
    Position Tests
================================================================== */

it('LTR: start -> left', () => {
    css = '.foo { start: 1rem; }';
    cssOutputted = '.foo { left: 1rem; }';

    return run(css, cssOutputted, { });
});

it('LTR: end -> right', () => {
    css = '.foo { end: 1rem; }';
    cssOutputted = '.foo { right: 1rem; }';

    return run(css, cssOutputted, { });
});

it('RTL: start -> right', () => {
    css = '.foo { start: 1rem; }';
    cssOutputted = '.foo { right: 1rem; }';

    return run(css, cssOutputted, { direction: 'RTL' });
});

it('RTL: end -> left', () => {
    css = '.foo { end: 1rem; }';
    cssOutputted = '.foo { left: 1rem; }';

    return run(css, cssOutputted, { direction: 'RTL' });
});
