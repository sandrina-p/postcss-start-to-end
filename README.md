# PostCSS Start To End [![Build Status][ci-img]][ci]

[PostCSS](https://github.com/postcss/postcss) plugin that let you control your layout (ltr or rtl) through logical rather than direction / physical rules

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/sandrina-p/postcss-start-to-end.svg
[ci]:      https://travis-ci.org/sandrina-p/postcss-start-to-end

Inspired by Flexbox and CSS Grid syntax, use `start` or `end` to output `left` or `right` depending on document direction (`rtl` or `ltr`).

**Input**
```css
.foo {
    padding-start: 1rem;
    border-end: 1px solid teal;
}
```

**Output**
```css
.foo {
   padding-left: 1rem;
   border-right: 1px solid teal;
}
```

## Usage

```js
postcss([
    require('postcss-start-to-end')
])
```

### With some options

```js
postcss([
    require('postcss-start-to-end')({
        direction: 'rtl',
        warnings: false,
    })
]);
```

## Options

#### `direction`
Default writing mode of CSS.  
**Type:** `string`  
**Default:** 'LTR'  
**Values:** `'LTR'`, `'RTL'`  

##### Example

**INPUT**
```css
    .item {
        border-start: 1px solid teal;
        padding: 0 3rem 0 0;
    }
```

**output with `direction: LTR`**
```css
    .item {
        border-left: 1px solid teal;
        padding: 0 3rem 0 0;
    }
```

**output with `direction: RTL`**
```css
    .item {
        border-right: 1px solid teal;
        padding: 0 0 0 3rem;
    }
```

#### `warnings`
Output on CLI (terminal) warnings about properties / rules found that don't follow start-to-end syntax.  
**Type:** `bollean`  
**Default:** `true`  
**Values:** `true`, `false`  

**Example**

```css
    .item {
        margin-left: 10%;
    }
```

**Console warning if direction: ltr:**
>  margin-left: 10%; found on line 2. Replace it by `margin-start` to support LTR and RTL directions.

**Console warning if direction: rtl:**
>  margin-left: 10%; found on line 2. Replace it by `margin-end` to support LTR and RTL directions.



## Properties supported

|         Input         |      Output LTR       |      output LTR       |
| --------------------- | --------------------- | --------------------- |
| **Alignment**         |                       |                       |
| text-align: start;    | text-align: left;     | text-align: right;    |
| text-align: end;      | text-align: right;    | text-align: left;     |
| *Clear*               |                       |                       |
| clear: start;         | clear: left;          | clear: right;         |
| clear: end;           | clear: right;         | clear: left;          |
| **Float**             |                       |                       |
| float: start;         | float: left;          | float: right;         |
| float: end;           | float: right;         | float: left;          |
| **Border**            |                       |                       |
| border-start          | border-left           | border-right          |
| border-end            | border-right          | border-left           |
| border-top-start      | border-top-left       | border-top-right      |
| border-top-end        | border-top-right      | border-top-left       |
| border-bottom-end     | border-bottom-right   | border-bottom-left    |
| border-bottom-start   | border-bottom-left    | border-bottom-right   |
| **Padding**           |                       |                       |
| padding-start         | padding-left          | padding-right         |
| padding-end           | padding-right         | padding-left          |
| padding: 0 1px 0 4px; | padding: 0 1px 0 4px; | padding: 0 4px 0 1px; |
| **Margin**            |                       |                       |
| margin-start          | margin-left           | margin-right          |
| margin-end            | margin-right          | margin-left           |
| margin: 0 2px 0 3px;  | margin: 0 2px 0 3px;  | margin: 0 3px 0 2px;  |
| **Float**             |                       |                       |
| start: 1px;           | left: 1px;            | right: 1px;           |
| end: 1px;             | right: 1px;           | left: 1px;            |


## Bonus: Convert your existing code to this syntax

`node node_modules/postcss-logical-props-simplify/convert src/`

```css
/* Input */
.item {
    padding-left: 5px;
}

/* Output */
.item {
    padding-start: 5px;
}
```

`node node_modules/postcss-logical-props-simplify/convert --rtl src/`

```css
/* Input */
.item {
    padding-left: 5px;
}

/* Output */
.item {
    padding-end: 5px;
}
```


## F.A.Q.

**Why should I use this instead of plugins that convert "*-left" to "*-right" and vice-versa?**

This is not a replacement of those kind of plugins.

This is a plugin to let you write code with a logical thought in mind rather than physical/direction thought.

Then if you need to convert the outputted CSS to the opposite direction you might want to try [RTLCSS](http://rtlcss.com/) or another plugins.

**Is this tested?**

The plugin has [100% coverage test](index.test.js) with all possible scenarios that crossed my mind. Also the [Travis-ci](https://travis-ci.org/sandrina-p/postcss-start-to-end) is doing it's job!


## Motivation | References

There is a CSS Draft Spec about [CSS Logical Properties](https://drafts.csswg.org/css-logical-props/) in a early phase. Because this technology's specification [has not stabilized](https://drafts.csswg.org/css-logical-props/#issues-index), I decided to keep this plugin syntax simple and straight following what is already defined without adding _more sugar_.


## Contribute
Any doubts or suggestions you may have feel free to create an issue on [github repo](https://github.com/sandrina-p/postcss-ltr-rtl-detect).


## License
MIT License
