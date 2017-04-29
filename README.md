# PostCSS Start To End

[![Build Status][ci-img]][ci]
[![Coverage Status](https://coveralls.io/repos/github/sandrina-p/postcss-start-to-end/badge.svg)](https://coveralls.io/github/sandrina-p/postcss-start-to-end)

[PostCSS](https://github.com/postcss/postcss) plugin that let you control your layout (`ltr` or `rtl`) through logical rather than direction / physical rules.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/sandrina-p/postcss-start-to-end.svg?branch=master
[ci]:      https://travis-ci.org/sandrina-p/postcss-start-to-end

Inspired by Flexbox and CSS Grid syntax, use `start` or `end` to output `left` or `right` depending on document direction (`rtl` or `ltr`).

**Input**
```css
.foo {
    padding-start: 1rem;
    border-end: 1rem solid teal;
}
```

**Output**
```css
.foo {
   padding-left: 1rem;
   border-right: 1rem solid teal;
}
```

## Usage

```js
postcss([
    require('postcss-start-to-end'),
    require('postcss-reporter') // show warnings - check options to know more
])
```

### With some options

```js
postcss([
    require('postcss-start-to-end')({
        direction: 'RTL',
        warnings: false,
    }),
    require('postcss-reporter')
]);
```

## Options

#### `direction`
Default writing mode of CSS.  
**Type:** `string`  
**Default:** `'LTR'`  
**Values:** `'LTR'`, `'RTL'`  

**Input**
```css
.item {
    border-start: 1px solid teal;
    padding: 0 3rem 0 0;
}
```

**output with `direction: 'LTR'`**
```css
.item {
    border-left: 1px solid teal;
    padding: 0 3rem 0 0;
}
```

**output with `direction: 'RTL'`**
```css
.item {
    border-right: 1px solid teal;
    padding: 0 0 0 3rem;
}
```

#### `warnings`
Output on CLI warnings about properties / rules found that don't follow start-to-end syntax.  
**Type:** `boolean`  
**Default:** `true`  
**Values:** `true`, `false`  

**Example**

```css
.item {
    margin-left: 10%;
}
```

**Console warning if `direction: ltr:`**
>  margin-left: 10%; found on line 2. Replace it by `margin-start` to support LTR and RTL directions.

**Console warning if `direction: rtl:`**
>  margin-left: 10%; found on line 2. Replace it by `margin-end` to support LTR and RTL directions.



## Rules supported

|          Input          |       Output LTR        |       output RTL        |
| ----------------------- | ----------------------- | ----------------------- |
| **Alignment**           |                         |                         |
| text-align: start;      | text-align: left;       | text-align: right;      |
| text-align: end;        | text-align: right;      | text-align: left;       |
| **Clear**               |                         |                         |
| clear: start;           | clear: left;            | clear: right;           |
| clear: end;             | clear: right;           | clear: left;            |
| **Float**               |                         |                         |
| float: start;           | float: left;            | float: right;           |
| float: end;             | float: right;           | float: left;            |
| **Border**              |                         |                         |
| border-start            | border-left             | border-right            |
| border-end              | border-right            | border-left             |
| border-top-start        | border-top-left         | border-top-right        |
| border-top-end          | border-top-right        | border-top-left         |
| border-bottom-end       | border-bottom-right     | border-bottom-left      |
| border-bottom-start     | border-bottom-left      | border-bottom-right     |
| **Margin**              |                         |                         |
| margin-start            | margin-left             | margin-right            |
| margin-end              | margin-right            | margin-left             |
| margin: 0 2rem 0 3rem;  | margin: 0 2rem 0 3rem;  | margin: 0 3rem 0 2rem;  |
| **Padding**             |                         |                         |
| padding-start           | padding-left            | padding-right           |
| padding-end             | padding-right           | padding-left            |
| padding: 0 1rem 0 4rem; | padding: 0 1rem 0 4rem; | padding: 0 4rem 0 1rem; |
| **Position**            |                         |                         |
| start: 1rem;            | left: 1rem;             | right: 1rem;            |
| end: 1rem;              | right: 1rem;            | left: 1rem;             |


## BONUS: Convert your existing code to this syntax

Don't you feel like find/replace rules in each one of your `*.css` files?

No worries, I built a simple tool that does that for you.
You just need to tell where you want to run the converter (folder or file.css). By default it runs in `src` folder

**Input**
```css
.item {
    padding-left: 5rem;
    margin-right : 1rem;
    float:left;
}
```

### Convert from LTR layout
_Convert_ by default runs on `src` folder  
`node node_modules/postcss-start-to-end/convert`

Set a specific folder to run:  
`node node_modules/postcss-start-to-end/convert src/components`

Set a specific file to run:  
`node node_modules/postcss-start-to-end/convert styles/index.css`

**Output**
```css
.item {
    padding-start: 5rem;
    margin-end : 1rem;
    float:start;
}
```

### Convert RTL layout
`node node_modules/postcss-start-to-end/convert --rtl`

_Convert_ by default runs on `src` folder    
`node node_modules/postcss-start-to-end/convert --rtl`

Set a specific folder to run:  
`node node_modules/postcss-start-to-end/convert src/components --rtl`

Set a specific file to run:  
`node node_modules/postcss-start-to-end/convert styles/index.css --rtl`

**Output**
```css
.item {
    padding-end: 5rem;
    margin-start : 1rem;
    float:end;
}
```


## F.A.Q.

**Why should I use this instead of plugins that convert `*-left` to `*-right` and vice-versa?**

This is not a replacement of those kind of plugins.

This is a plugin to let you write code with a logical thought in mind rather than a physical/direction one.

Then if you need to convert the outputted CSS to the opposite direction you might want to try [postcss-rtl](https://www.npmjs.com/package/postcss-rtl).

**Is this tested?**

- The PostCSS Plugin has [100% coverage test](coverage/lcov-report/index.html) with all [possible scenarios](index.html) that crossed my mind.
- The Converter tests will be added soon!
- Don't fear: [Travis-ci](https://travis-ci.org/sandrina-p/postcss-start-to-end) is doing it's job!


## Motivation | References

There is a CSS Draft Spec about [CSS Logical Properties](https://drafts.csswg.org/css-logical-props/) in Level 1.  
Because this technology's specification [has not stabilized](https://drafts.csswg.org/css-logical-props/#issues-index), I decided to keep this plugin syntax simple and straight following what is already defined without adding _more sugar_.


## Contribute
Any doubts or suggestions you may have, feel free to create an issue on [github repository](https://github.com/sandrina-p/postcss-start-to-end/issues).


## License
[MIT License](LICENCE)
