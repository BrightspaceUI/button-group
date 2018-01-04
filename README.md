# d2l-button-group
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/BrightspaceUI/button-group)
[![Bower version][bower-image]][bower-url]
[![Build status][ci-image]][ci-url]

[Polymer](https://www.polymer-project.org)-based web component for responsive button groups, overflowing buttons into a dropdown menu based on configuration and space available.

<!---
```
<custom-element-demo>
  <template>
    <script src="../webcomponentsjs/webcomponents-lite.js"></script>
    <link rel="import" href="../d2l-typography/d2l-typography.html">
    <link rel="import" href="../d2l-button/d2l-button.html">
    <link rel="import" href="../d2l-dropdown/d2l-dropdown-button.html">
    <link rel="import" href="../d2l-dropdown/d2l-dropdown-menu.html">
    <link rel="import" href="../d2l-menu/d2l-menu.html">
    <link rel="import" href="../d2l-menu/d2l-menu-item.html">
    <link rel="import" href="../d2l-image-action/d2l-image-action.html">
    <link rel="import" href="../d2l-icons/tier1-icons.html">
    <link rel="import" href="d2l-button-group.html">
    <link rel="import" href="d2l-action-button-group.html">
    <custom-style include="d2l-typography">
      <style is="custom-style" include="d2l-typography"></style>
    </custom-style>
    <style>
      html {
        font-size: 20px;
      }
      d2l-button-group,
      d2l-action-button-group {
        color: var(--d2l-color-ferrite);
        font-family: 'Lato', 'Lucida Sans Unicode', 'Lucida Grande', sans-serif;
        letter-spacing: 0.01rem;
        font-size: 0.95rem;
        font-weight: 400;
        line-height: 1.4rem;
      }
    </style>
    <script>
      document.body.addEventListener('d2l-dropdown-open', function() { document.body.style.height = '200px'; });
    </script>
    <next-code-block></next-code-block>
  </template>
</custom-element-demo>
```
-->
```html
<d2l-action-button-group min-to-show="1" max-to-show="3">
	<d2l-image-action-button icon="d2l-tier1:add">Add</d2l-image-action-button>
	<d2l-image-action-button icon="d2l-tier1:copy">Copy</d2l-image-action-button>
	<d2l-image-action-button icon="d2l-tier1:print">Print</d2l-image-action-button>
	<d2l-image-action-button icon="d2l-tier1:pin">Pin</d2l-image-action-button>
	<d2l-image-action-link icon="d2l-tier1:gear">Settings</d2l-image-action-link>
	<d2l-image-action-link icon="d2l-tier1:refresh">Refresh</d2l-image-action-link>
</d2l-action-button-group>
```

For further information on this and other Brightspace UI components, see the docs at [ui.developers.brightspace.com](http://ui.developers.brightspace.com/).

## Installation

`d2l-button-group` can be installed from [Bower][bower-url]:
```shell
bower install d2l-button-group
```

## Usage

Include the [webcomponents.js](http://webcomponents.org/polyfills/) "lite" polyfill (for browsers who don't natively support web components), then import `d2l-button-group.html` or `d2l-action-button-group.html`:

```html
<head>
	<script src="bower_components/webcomponentsjs/webcomponents-lite.js"></script>
	<link rel="import" href="bower_components/d2l-button-group/d2l-button-group.html">
</head>
```

A `<d2l-button-group>` custom element can be used in your application to define a responsive group of buttons and dropdown buttons.  The `min-to-show` and `max-to-show` attributes can be used to configure how many buttons will be displayed.  By default, a minimum of zero buttons will be displayed, and all buttons will be displayed if space is available.

```html
<d2l-button-group min-to-show="1" max-to-show="3">
	<d2l-button primary>New</d2l-button>
	<d2l-button>Instant Message</d2l-button>
	<d2l-button>Add Feedback</d2l-button>
	<d2l-button>Preview</d2l-button>
	<d2l-dropdown-button text="Explore Topics">
		<d2l-dropdown-menu>
			<d2l-menu label="Astronomy">
				<d2l-menu-item text="Introduction" id="first-item" ></d2l-menu-item>
				<d2l-menu-item text="Searching for the Heavens "></d2l-menu-item>
				<d2l-menu-item text="The Solar System"></d2l-menu-item>
				<d2l-menu-item text="Stars &amp; Galaxies"></d2l-menu-item>
				<d2l-menu-item text="The Night Sky"></d2l-menu-item>
				<d2l-menu-item text="The Universe" id="last-item"></d2l-menu-item>
			</d2l-menu>
		</d2l-dropdown-menu>
	</d2l-dropdown-button>
	<d2l-link href="http://www.desire2learn.com">D2L</d2l-link>
</d2l-button-group>
```

A `<d2l-action-button-group>` custom element can be used in your application to define a responsive group of actions with the same behavior and attributes as described for `<d2l-button-group>`.  Typically these will include one or more image-actions as shown.

```html
<d2l-action-button-group min-to-show="1" max-to-show="3">
	<d2l-image-action-button icon="d2l-tier1:add">Add</d2l-image-action-button>
	<d2l-image-action-button icon="d2l-tier1:copy">Copy</d2l-image-action-button>
	<d2l-image-action-button icon="d2l-tier1:print">Print</d2l-image-action-button>
	<d2l-image-action-button icon="d2l-tier1:pin">Pin</d2l-image-action-button>
	<d2l-image-action-link icon="d2l-tier1:gear">Settings</d2l-image-action-link>
	<d2l-image-action-link icon="d2l-tier1:refresh">Refresh</d2l-image-action-link>
</d2l-action-button-group>
```

## Developing, Testing and Contributing

After cloning the repo, run `npm install` to install dependencies.

If you don't have it already, install the [Polymer CLI](https://www.polymer-project.org/2.0/docs/tools/polymer-cli) globally:

```shell
npm install -g polymer-cli
```

To start a [local web server](https://www.polymer-project.org/2.0/docs/tools/polymer-cli-commands#serve) that hosts the demo page and tests:

```shell
polymer serve
```

To lint ([eslint](http://eslint.org/) and [Polymer lint](https://www.polymer-project.org/2.0/docs/tools/polymer-cli-commands#lint)):

```shell
npm run lint
```

To run unit tests locally using [Polymer test](https://www.polymer-project.org/2.0/docs/tools/polymer-cli-commands#tests):

```shell
polymer test --skip-plugin sauce
```

To lint AND run local unit tests:

```shell
npm test
```

[bower-url]: http://bower.io/search/?q=d2l-button-group
[bower-image]: https://badge.fury.io/bo/d2l-button-group.svg
[ci-url]: https://travis-ci.org/BrightspaceUI/button-group
[ci-image]: https://travis-ci.org/BrightspaceUI/button-group.svg?branch=master
