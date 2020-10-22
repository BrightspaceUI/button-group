# d2l-button-group
[![Build status][ci-image]][ci-url]

[Polymer](https://www.polymer-project.org)-based web component for responsive button groups, overflowing buttons into a dropdown menu based on configuration and space available.

For further information on this and other components, refer to [The Brightspace UI Guide](https://github.com/BrightspaceUI/guide/wiki).

## Usage

A `<d2l-button-group>` custom element can be used in your application to define a responsive group of buttons and dropdown buttons.  The `min-to-show` and `max-to-show` attributes can be used to configure how many buttons will be displayed.  By default, a minimum of zero buttons will be displayed, and all buttons will be displayed if space is available.

```html
<d2l-button-group min-to-show="1" max-to-show="3">
	<d2l-button primary>New</d2l-button>
	<d2l-button>Copy</d2l-button>
	<d2l-button>Import</d2l-button>
	<d2l-button>Delete</d2l-button>
	<d2l-dropdown-button text="Explore Topics">
		<d2l-dropdown-menu>
			<d2l-menu label="Astronomy">
				<d2l-menu-item text="Introduction"></d2l-menu-item>
				<d2l-menu-item text="Searching for the Heavens "></d2l-menu-item>
				<d2l-menu-item text="The Solar System"></d2l-menu-item>
				<d2l-menu-item text="Stars &amp; Galaxies"></d2l-menu-item>
				<d2l-menu-item text="The Night Sky"></d2l-menu-item>
				<d2l-menu-item text="The Universe"></d2l-menu-item>
			</d2l-menu>
		</d2l-dropdown-menu>
	</d2l-dropdown-button>
</d2l-button-group>
```

A `<d2l-action-button-group>` custom element can be used in your application to define a responsive group of actions with the same behavior and attributes as described for `<d2l-button-group>`.  Typically these will include one or more subtle buttons (`<d2l-button-subtle>`) as shown.

```html
<d2l-action-button-group min-to-show="1" max-to-show="5">
	<d2l-button-subtle icon="d2l-tier1:add" text="Add"></d2l-button-subtle>
	<d2l-button-subtle icon="d2l-tier1:copy" text="Copy"></d2l-button-subtle>
	<d2l-button-subtle icon="d2l-tier1:pin-filled" text="Pin"></d2l-button-subtle>
	<d2l-button-subtle icon="d2l-tier1:print" text="Print"></d2l-button-subtle>
	<d2l-button-subtle icon="d2l-tier1:delete" text="Delete"></d2l-button-subtle>
	<d2l-button-subtle icon="d2l-tier1:gear" text="Settings"></d2l-button-subtle>
	<d2l-button-subtle icon="d2l-tier1:refresh" text="Refresh"></d2l-button-subtle>
</d2l-action-button-group>
```

To use a `<d2l-dropdown-more>` "..." opener, set the `opener-type` attribute to `"more"`.

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

[ci-url]: https://travis-ci.com/BrightspaceUI/button-group
[ci-image]: https://travis-ci.com/BrightspaceUI/button-group.svg?branch=master

## Versioning & Releasing

All version changes should obey [semantic versioning](https://semver.org/) rules.

Include either `[increment major]`, `[increment minor]` or `[increment patch]` in your merge commit message to automatically increment the `package.json` version and create a tag during the next build.
