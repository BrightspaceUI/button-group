import '@polymer/polymer/polymer-legacy.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="d2l-button-group-styles">
	<template>
		<style>

			:host {
				display: block;
			}

			:host .d2l-button-group-container {
				/*align-items: stretch;*/
				display: flex;
				flex: 0 1 auto;
				flex-wrap: wrap;
			}

			:host .d2l-button-group-container ::slotted(d2l-button),
			:host .d2l-button-group-container ::slotted(d2l-button-subtle),
			:host .d2l-button-group-container ::slotted(d2l-button-icon),
			:host .d2l-button-group-container ::slotted(d2l-link),
			:host .d2l-button-group-container ::slotted(span),
			:host .d2l-button-group-container ::slotted(d2l-dropdown:not(.d2l-overflow-dropdown)),
			:host .d2l-button-group-container ::slotted(d2l-dropdown-button),
			:host .d2l-button-group-container ::slotted(d2l-dropdown-button-subtle),
			:host .d2l-button-group-container ::slotted(.d2l-button-group-custom-item) {
				margin-right: 0.75rem;
			}

			:host-context([dir='rtl']) .d2l-button-group-container ::slotted(d2l-button),
			:host-context([dir='rtl']) .d2l-button-group-container ::slotted(d2l-button-subtle),
			:host-context([dir='rtl']) .d2l-button-group-container ::slotted(d2l-button-icon),
			:host-context([dir='rtl']) .d2l-button-group-container ::slotted(d2l-link),
			:host-context([dir='rtl']) .d2l-button-group-container ::slotted(span),
			:host-context([dir='rtl']) .d2l-button-group-container ::slotted(d2l-dropdown:not(.d2l-overflow-dropdown)),
			:host-context([dir='rtl']) .d2l-button-group-container ::slotted(d2l-dropdown-button),
			:host-context([dir='rtl']) .d2l-button-group-container ::slotted(d2l-dropdown-button-subtle),
			:host-context([dir='rtl']) .d2l-button-group-container ::slotted(.d2l-button-group-custom-item) {
				margin-left: 0.75rem;
				margin-right: 0;
			}

			:host(:dir(rtl)) .d2l-button-group-container ::slotted(d2l-button),
			:host(:dir(rtl)) .d2l-button-group-container ::slotted(d2l-button-subtle),
			:host(:dir(rtl)) .d2l-button-group-container ::slotted(d2l-button-icon),
			:host(:dir(rtl)) .d2l-button-group-container ::slotted(d2l-link),
			:host(:dir(rtl)) .d2l-button-group-container ::slotted(span),
			:host(:dir(rtl)) .d2l-button-group-container ::slotted(d2l-dropdown:not(.d2l-overflow-dropdown)),
			:host(:dir(rtl)) .d2l-button-group-container ::slotted(d2l-dropdown-button),
			:host(:dir(rtl)) .d2l-button-group-container ::slotted(d2l-dropdown-button-subtle),
			:host(:dir(rtl)) .d2l-button-group-container ::slotted(.d2l-button-group-custom-item) {
				margin-left: 0.75rem;
				margin-right: 0;
			}

			/* using !important to force override.  ex. consumer has explicitly
			specified display. note: inline styles, and shadow-dom with consumer specified
			css will override this unless !important is specified */
			:host .d2l-button-group-container ::slotted([chomped]) {
				display: none !important;
			}

			:host([mini]) .d2l-dropdown-opener {
				padding-left: 0.5rem;
				padding-right: 0.5rem;
			}

		</style>
	</template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
