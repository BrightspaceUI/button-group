import '../@polymer/polymer/polymer-legacy.js';
import '../d2l-dropdown/d2l-dropdown-button.js';
import '../d2l-dropdown/d2l-dropdown-menu.js';
import '../d2l-icons/tier1-icons.js';
import '../d2l-icons/d2l-icon.js';
import '../d2l-menu/d2l-menu.js';
import { Polymer } from '../@polymer/polymer/lib/legacy/polymer-fn.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="d2l-button-group-menu">
	<template strip-whitespace="">
		<style>

			:host([mini]) .d2l-dropdown-opener {
				padding-left: 0.5rem;
				padding-right: 0.5rem;
			}

		</style>

		<d2l-dropdown-button text="[[text]]" class="d2l-dropdown-opener">
			<d2l-dropdown-menu render-content="">
				<d2l-menu id="overflowMenu" label="[[text]]">
					<slot></slot>
				</d2l-menu>
			</d2l-dropdown-menu>
		</d2l-dropdown-button>
	</template>
	
</dom-module>`;

document.head.appendChild($_documentContainer.content);
Polymer({
	is: 'd2l-button-group-menu',

	properties: {
		mini: {
			type: Boolean,
			reflectToAttribute: true
		},
		icon: {
			type: String,
			computed: '_getIcon(mini)'
		},
		text: String
	},

	_getIcon: function(mini) {
		return mini ? 'd2l-tier1:more' : 'd2l-tier1:chevron-down';
	}

});
