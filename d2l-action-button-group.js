/**
`d2l-action-button-group`
Polymer-based web component to responsively encapsulate a group of actions buttons
@demo demo/action-button-group.html Subtle Buttons
*/
import 'd2l-button/d2l-button-subtle.js';
import 'd2l-colors/d2l-colors.js';
import 'd2l-dropdown/d2l-dropdown.js';
import 'd2l-dropdown/d2l-dropdown-menu.js';
import 'd2l-dropdown/d2l-dropdown-more.js';
import 'd2l-icons/d2l-icon.js';
import 'd2l-menu/d2l-menu.js';
import 'd2l-offscreen/d2l-offscreen-shared-styles.js';
import './d2l-button-group-responsive-behavior.js';
import './d2l-button-group-styles.js';
import './localize-behavior.js';
import '@polymer/polymer/lib/elements/dom-if.js';
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';

class ActionButtonGroup extends mixinBehaviors([
	D2L.PolymerBehaviors.ButtonGroup.ResponsiveBehavior,
	D2L.PolymerBehaviors.ButtonGroup.LocalizeBehavior
], PolymerElement) {

	static get properties() {
		return {
			openerType: {
				type: String,
				value: 'button'
			}
		};
	}

	static get template() {
		return html`
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
				<template is="dom-if" if="{{!_isOpenerMore(openerType)}}">
					<d2l-dropdown class="d2l-overflow-dropdown">
						<d2l-button-subtle class="d2l-dropdown-opener">
							<span class="d2l-dropdown-opener-text">[[localize('moreActions')]]</span>
							<d2l-icon icon="[[icon]]"></d2l-icon>
						</d2l-button-subtle>
						<d2l-dropdown-menu>
							<d2l-menu id="overflowMenu" label="[[localize('more')]]">
							</d2l-menu>
						</d2l-dropdown-menu>
					</d2l-dropdown>
				</template>
				<template is="dom-if" if="{{_isOpenerMore(openerType)}}">
					<d2l-dropdown-more class="d2l-overflow-dropdown" text="[[localize('moreActions')]]">
						<d2l-dropdown-menu>
							<d2l-menu id="overflowMenu" label="[[localize('more')]]">
							</d2l-menu>
						</d2l-dropdown-menu>
					</d2l-dropdown>
				</template>
			</div>
		`;
	}

	_isOpenerMore(openerType) {
		return openerType === 'more';
	}

}
customElements.define('d2l-action-button-group', ActionButtonGroup);
