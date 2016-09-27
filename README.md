# Select
Replacement for select boxes.

Requires jQuery.

## Install
```sh
bower install trendwerk/select --save
```

## Usage
Using `select` is a three-step process:

1. **HTML**: Create an HTML template for the select box;
2. **JS**: Use the jQuery plugin on the element that should behave like a select box;
3. **SCSS**: `@include` the mixin on the same element.

### Implementation

#### HTML
The HTML should be formatted like the example below. Use a `hidden` input field if you'd like to use the data in a form. You can hook into the jQuery plugin (see [Options](https://github.com/trendwerk/select#jquery-plugin)) if you want to do something else with the selected data.

```html
<div class="my-select-box">
  <label>Select an option</label>

  <ul>
    <li data-value="1">Option 1</li>
    <li data-value="2">Option 2</li>
    <li data-value="3">Option 3</li>
  </ul>

  <input type="hidden" />
</div>
```

In the example above:
- `.my-select-box` can be any class;
- `<label>` is always used as the default label;
- `<ul>` and `<li>` are always used as the list and options;
- `data-value` is _required_ and contains the option value;
- `<input type="hidden" />` is always used to fill the selected option value;
- Values from `<input type="hidden" />` are read on page load to activate the right option.

#### JS
```js
$('.fake-select').asSelect();
```

#### SCSS
```scss
@include select();
```

## Classes
This plugin uses the following classes for states:
- **`open`**: when the select box is opened
- **`active`**: for the currently selected option

## Options

### jQuery plugin

| Option | Default | Required | Description |
| :--- | :--- | :--- | :--- |
| `deselectable` | `true` | No | `false` if the select box shouldn't be able to be deselected (to the default label)
| `onSelect` | `null` | No | Callback. Gets called when an item is selected. First parameter is the jQuery element that got selected: `$item => {}`
| `speed` | `200` | No | Speed (in ms) for the opening and closing animation

### Mixin
Styling is a bit opinionated. Use the settings to tweak the styling as you wish. Overwrite any additional styling directly, if necessary.

| Option | Default | Required | Description |
| :--- | :--- | :--- | :--- |
| `arrow` | See [Arrow](https://github.com/trendwerk/select#arrow) | No | Settings for the arrow in the select box. Set to `false` to disable the arrow entirely
| `background` | `white` | No | Background of the label and list
| `background-active` | `rgb(238, 238, 238)` | No | Background of active items and hovers
| `border` | `1px solid rgb(204, 204, 204)` | No | Border around the label, list and between it's items
| `max-height` | `300px` | No | Maximum height of the list, when opened
| `max-height-screen-ratio` | `0.7` | No | For very low screens: the ratio of the height that the list can be relative to the screen size. `0.7` means the list can maximally be 70% of the screen height
| `padding` | See [Padding](https://github.com/trendwerk/select#padding) | No | Label and item padding
| `webkit-scrollbar` | See [Webkit scrollbar](https://github.com/trendwerk/select#webkit-scrollbar) | No | See [Webkit scrollbar](https://github.com/trendwerk/select#webkit-scrollbar). Set to `false` to disable entirely


#### Arrow
Uses a map with the following options:

| Option | Default | Description |
| :--- | :--- | :--- |
| `color` | `black` | Color
| `offset` | `20px` | Offset to the right of the select box
| `size` | `6px 5px` | Size

#### Padding
Uses a map with the following options:

| Option | Default |
| :--- | :--- |
| `horizontal` | `20px`
| `vertical` | `10px`

#### Webkit scrollbar
On Webkit on OS X and iOS, scrollbars are automatically hidden. This makes the select box not very user-friendly, because users cannot see that there are more options until they try scrolling.

This package implements a Webkit scrollbar that is always shown. You can disable this function entirely by setting this option to `false`. Otherwise, you can pass a map with the following options:

| Option | Default | Description |
| :--- | :--- | :--- |
| `background` | `rgb(238, 238, 238)` | Color of the background behind the scrollbar
| `foreground` | `rgba(0, 0, 0, 0.5)` | Color of the scrollbar
