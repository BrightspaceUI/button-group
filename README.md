> Deprecated: use [BrightspaceUI/core/components/overflow-group](https://github.com/BrightspaceUI/core/tree/master/components/overflow-group) `<d2l-overflow-group>` web component instead.


# d2l-button-group

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

## Versioning & Releasing

> TL;DR: Commits prefixed with `fix:` and `feat:` will trigger patch and minor releases when merged to `master`. Read on for more details...

The [sematic-release GitHub Action](https://github.com/BrightspaceUI/actions/tree/master/semantic-release) is called from the `release.yml` GitHub Action workflow to handle version changes and releasing.

### Version Changes

All version changes should obey [semantic versioning](https://semver.org/) rules:
1. **MAJOR** version when you make incompatible API changes,
2. **MINOR** version when you add functionality in a backwards compatible manner, and
3. **PATCH** version when you make backwards compatible bug fixes.

The next version number will be determined from the commit messages since the previous release. Our semantic-release configuration uses the [Angular convention](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular) when analyzing commits:
* Commits which are prefixed with `fix:` or `perf:` will trigger a `patch` release. Example: `fix: validate input before using`
* Commits which are prefixed with `feat:` will trigger a `minor` release. Example: `feat: add toggle() method`
* To trigger a MAJOR release, include `BREAKING CHANGE:` with a space or two newlines in the footer of the commit message
* Other suggested prefixes which will **NOT** trigger a release: `build:`, `ci:`, `docs:`, `style:`, `refactor:` and `test:`. Example: `docs: adding README for new component`

To revert a change, add the `revert:` prefix to the original commit message. This will cause the reverted change to be omitted from the release notes. Example: `revert: fix: validate input before using`.

### Releases

When a release is triggered, it will:
* Update the version in `package.json`
* Tag the commit
* Create a GitHub release (including release notes)

### Releasing from Maintenance Branches

Occasionally you'll want to backport a feature or bug fix to an older release. `semantic-release` refers to these as [maintenance branches](https://semantic-release.gitbook.io/semantic-release/usage/workflow-configuration#maintenance-branches).

Maintenance branch names should be of the form: `+([0-9])?(.{+([0-9]),x}).x`.

Regular expressions are complicated, but this essentially means branch names should look like:
* `1.15.x` for patch releases on top of the `1.15` release (after version `1.16` exists)
* `2.x` for feature releases on top of the `2` release (after version `3` exists)
