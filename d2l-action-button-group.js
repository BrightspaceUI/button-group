/**
`d2l-action-button-group`
Polymer-based web component to responsively encapsulate a group of actions buttons

@demo demo/action-button-group.html Subtle Buttons
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';

import 'd2l-button/d2l-button-subtle.js';
import 'd2l-colors/d2l-colors.js';
import 'd2l-dropdown/d2l-dropdown.js';
import 'd2l-dropdown/d2l-dropdown-menu.js';
import 'd2l-icons/d2l-icon.js';
import 'd2l-icons/tier1-icons.js';
import 'd2l-menu/d2l-menu.js';
import 'd2l-offscreen/d2l-offscreen-shared-styles.js';
import './d2l-button-group-responsive-behavior.js';
import './d2l-button-group-styles.js';
import './localize-behavior.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="d2l-action-button-group">
	<template strip-whitespace="">
		<style include="d2l-button-group-styles d2l-offscreen-shared-styles">

			.d2l-dropdown-opener-text {
				margin-right: 0.3rem;
				vertical-align: middle;
			}

			.d2l-dropdown-opener-text,
			d2l-icon {
				color: var(--d2l-color-celestine);
			}

			:host(:dir(rtl)) .d2l-dropdown-opener-text {
				margin-left: 0.3rem;
				margin-right: 0;
			}

			:host([mini]) .d2l-dropdown-opener-text {
				@apply --d2l-offscreen;
			}

		</style>
		<div class="d2l-button-group-container">
			<slot id="buttons"></slot>
			<d2l-dropdown class="d2l-overflow-dropdown">
				<d2l-button-subtle class="d2l-dropdown-opener">
					<span class="d2l-dropdown-opener-text">[[localize('moreActions')]]</span>
					<d2l-icon icon="[[icon]]"></d2l-icon>
				</d2l-button-subtle>
				<d2l-dropdown-menu render-content="">
					<d2l-menu id="overflowMenu" label="[[localize('more')]]">
					</d2l-menu>
				</d2l-dropdown-menu>
			</d2l-dropdown>
		</div>
	</template>
	
</dom-module>`;

document.head.appendChild($_documentContainer.content);
Polymer({
	is: 'd2l-action-button-group',

	behaviors: [
		D2L.PolymerBehaviors.ButtonGroup.ResponsiveBehavior,
		D2L.PolymerBehaviors.ButtonGroup.LocalizeBehavior
	]

});
