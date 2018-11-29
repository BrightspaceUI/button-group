/**
`d2l-button-group`
Polymer-based web component to responsively encapsulate a group of buttons and dropdowns

@demo demo/button-group.html Buttons and Dropdowns
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '../@polymer/polymer/polymer-legacy.js';

import './d2l-button-group-responsive-behavior.js';
import './d2l-button-group-styles.js';
import './d2l-button-group-menu.js';
import './localize-behavior.js';
import { Polymer } from '../@polymer/polymer/lib/legacy/polymer-fn.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="d2l-button-group">
	<template strip-whitespace="">
		<style include="d2l-button-group-styles">
			/*
			 * https://github.com/Polymer/tools/issues/408
			 * Empty style blocks break linter.
			 */
			:host {}
		</style>
		<div class="d2l-button-group-container">
			<slot id="buttons"></slot>
			<d2l-button-group-menu text="[[localize('moreActions')]]"></d2l-button-group-menu>
		</div>
	</template>
	
</dom-module>`;

document.head.appendChild($_documentContainer.content);
Polymer({
	is: 'd2l-button-group',

	behaviors: [
		D2L.PolymerBehaviors.ButtonGroup.ResponsiveBehavior,
		D2L.PolymerBehaviors.ButtonGroup.LocalizeBehavior
	]

});
