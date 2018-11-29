import '../fastdom/fastdom.js';
import '../d2l-menu/d2l-menu-item.js';
import '../d2l-menu/d2l-menu-item-link.js';
import '../d2l-menu/d2l-menu-item-separator.js';
import { afterNextRender } from '../@polymer/polymer/lib/utils/render-status.js';
import { dom } from '../@polymer/polymer/lib/legacy/polymer.dom.js';

window.D2L = window.D2L || {};
window.D2L.PolymerBehaviors = window.D2L.PolymerBehaviors || {};
window.D2L.PolymerBehaviors.ButtonGroup = window.D2L.PolymerBehaviors.ButtonGroup || {};

/** @polymerBehavior D2L.PolymerBehaviors.ButtonGroup.ResponsiveBehavior */
D2L.PolymerBehaviors.ButtonGroup.ResponsiveBehaviorImpl = {

	properties: {

		/**
		 * Automatically detect min and max to show based on item classes.
		 */
		autoShow: {
			type: Boolean,
			observer: '_autoShowChanged',
			value: false
		},

		/**
		 * Minimum number of buttons to show.
		 */
		minToShow: {
			type: Number,
			observer: '_boundaryChanged',
			value: 0
		},

		/**
		 * Maximum number of buttons to show before overflowing to menu.
		 */
		maxToShow: {
			type: Number,
			observer: '_boundaryChanged',
			value: -1
		}

	},

	_autoShowClass: 'd2l-button-group-show',

	_autoNoShowClass: 'd2l-button-group-no-show',

	_container: null,

	_layout: null,

	_overflowMenu: null,

	_refId: 0,

	ready: function() {
		this._resizeHandler = this._resizeHandler.bind(this);
	},

	attached: function() {

		afterNextRender(this, function() {

			this._buttonObserver = dom(this.$.buttons).observeNodes(function(data) {
				if (!this._layout) {
					this._init();
				} else {
					this._update(data.addedNodes, data.removedNodes);
				}
			}.bind(this));

			window.addEventListener('resize', this._resizeHandler);

		}.bind(this));

	},

	detached: function() {
		dom(this.$.buttons).unobserveNodes(this._buttonObserver);
		window.removeEventListener('resize', this._resizeHandler);
	},

	_addToOverflowMenu: function(item, index) {

		var tagName = item.tagName.toLowerCase();
		var menuItem;
		if (tagName === 'd2l-button' || tagName === 'd2l-button-subtle' || tagName === 'button' || tagName === 'd2l-button-icon') {
			menuItem = this._createMenuItem(item);
		} else if (tagName === 'd2l-link' || tagName === 'a') {
			menuItem = this._createMenuItemLink(item);
		} else if (item.getAttribute('role') === 'separator') {
			menuItem = this._createMenuItemSeparator();
		} else if (tagName === 'd2l-dropdown-button') {
			menuItem = this._createMenuItemMenu(item);
		} else if (item.classList.contains('d2l-button-group-custom-item')) {
			menuItem = this._createMenuItem(item);
		} else {
			return;
		}

		menuItem.setAttribute('bgi-ref', item.getAttribute('bgi-ref'));

		var overflowMenu = dom(this._overflowMenu);

		/**
		 * 3 scenarios
		 * - adding to start (ex. due to resize smaller)
		 * - adding to end (ex. initial chomp)
		 * - adding to middle (ex. new button added to light-dom shifting everything)
		 */
		if (overflowMenu.childNodes.length <= index) {
			overflowMenu.appendChild(menuItem);
		} else {
			overflowMenu.insertBefore(menuItem, overflowMenu.childNodes[index]);
		}

	},

	_autoDetectBoundaries: function(items) {

		var minToShow, maxToShow;
		for (var i = 0; i < items.length; i++) {
			if (items[i].classList.contains(this._autoShowClass)) {
				minToShow = i + 1;
			}
			if (maxToShow === undefined && items[i].classList.contains(this._autoNoShowClass)) {
				maxToShow = i;
			}
		}

		if (minToShow !== undefined) {
			this.minToShow = minToShow;
		}
		if (maxToShow !== undefined) {
			this.maxToShow = maxToShow;
		}

	},

	_autoShowChanged: function(value) {

		if (!this._layout) {
			// avoid chomping before init
			return;
		}

		if (value) {
			this._autoDetectBoundaries(this._getItems());
		}

		this._chomp();

	},

	_boundaryChanged: function() {

		if (!this._layout) {
			// avoid chomping before init
			return;
		}

		if (this.autoShow) {
			return;
		}

		this._chomp();

	},

	_chomp: function(items) {

		if (this._layout.totalWidth === 0) {
			fastdom.mutate(function() {
				this._overflowMenu.style.display = 'none';
			}.bind(this));
			return;
		}

		if (!items) {
			items = this._getItems();
		}

		var showing = {
			count: 0,
			width: 0
		};

		fastdom.mutate(function() {

			var chomp = function(item, index) {
				if (!item.hasAttribute('chomped')) {
					this._addToOverflowMenu(item, index);
					item.setAttribute('chomped', 'chomped');
				}
			}.bind(this);

			var undoChomp = function(item) {
				if (item.hasAttribute('chomped')) {
					this._removeFromOverflowMenu(item);
					item.removeAttribute('chomped');
				}
			}.bind(this);

			var isSoftOverflowing, isForcedOverflowing;
			for (var i = 0; i < this._layout.items.length; i++) {
				var itemLayout = this._layout.items[i];

				if (!itemLayout.isVisible) {
					continue;
				}

				// make sure we show the min
				if (showing.count < this.minToShow) {
					showing.width += itemLayout.width;
					showing.count += 1;
					itemLayout.trigger = 'force-show';
					itemLayout.isChomped = false;
					continue;
				}

				// make sure we only show the max
				if (this.maxToShow >= 0 && showing.count >= this.maxToShow) {
					isForcedOverflowing = true;
					itemLayout.trigger = 'force-hide';
					itemLayout.isChomped = true;
					continue;
				}

				// chomp or unchomp based on space available, and we've already handled min/max above
				if (!isSoftOverflowing && ((showing.width + itemLayout.width) < this._layout.availableWidth)) {
					showing.width += itemLayout.width;
					showing.count += 1;
					itemLayout.trigger = 'soft-show';
					itemLayout.isChomped = false;
				} else {
					// as soon as one overflows due to space, overflow the rest so they don't seem out of order
					isSoftOverflowing = true;
					itemLayout.trigger = 'soft-hide';
					itemLayout.isChomped = true;
				}

			}

			if (isSoftOverflowing || isForcedOverflowing) {
				for (var j = this._layout.items.length; j--;) {
					if (showing.width + this._layout.overflowMenuWidth < this._layout.availableWidth) {
						break;
					}
					var itemLayoutOverflowing = this._layout.items[j];
					if (!itemLayoutOverflowing.isVisible || itemLayoutOverflowing.trigger !== 'soft-show') {
						continue;
					}
					showing.width -= itemLayoutOverflowing.width;
					isSoftOverflowing = true;
					itemLayoutOverflowing.trigger = 'soft-hide';
					itemLayoutOverflowing.isChomped = true;
				}
			}

			// if there is at least one showing and no more to be hidden, enable collapsing more button to [...]
			if (this.minToShow > 0 && (showing.width + this._layout.overflowMenuWidth > this._layout.availableWidth)) {
				this._overflowMenu.mini = true;
			} else {
				this._overflowMenu.mini = false;
			}

			var chompIndex = 0;
			for (var k = 0; k < this._layout.items.length; k++) {
				var itemLayoutDetailed = this._layout.items[k];
				if (itemLayoutDetailed.isChomped) {
					chomp(items[k], chompIndex++);
				} else {
					undoChomp(items[k]);
				}
			}

			// if there is at least one showing and no more to be hidden, enable collapsing more button to [...]
			//if (this.minToShow > 0 && (showing.width + this._layout.overflowMenuWidth > this._layout.availableWidth)) {
			//	this._overflowMenu.mini = true;
			//} else {
			//	this._overflowMenu.mini = false;
			//}

			this._overflowMenu.style.display = ((!isSoftOverflowing && !isForcedOverflowing) ? 'none' : '');

			this.dispatchEvent(new CustomEvent('d2l-button-group-updated', {bubbles: true, composed: true}));

		}.bind(this));

	},

	_createMenuItem: function(item) {
		var menuItem = document.createElement('d2l-menu-item');
		var childText = item.firstChild && (item.firstChild.label || item.firstChild.text || item.firstChild.textContent);
		menuItem.setAttribute('text', item.label || item.text || item.textContent || childText);
		if (item.disabled) {
			menuItem.setAttribute('disabled', 'disabled');
		}
		menuItem.addEventListener('d2l-menu-item-select', function() {
			item.dispatchEvent(new CustomEvent('d2l-button-ghost-click'));
			item.click();
		});
		return menuItem;
	},

	_createMenuItemLink: function(item) {
		var menuItem = document.createElement('d2l-menu-item-link');
		menuItem.preventDefault = item.getAttribute('data-prevent-default');
		menuItem.setAttribute('text', item.textContent);
		menuItem.setAttribute('href', item.href);
		if (item.target) {
			menuItem.setAttribute('target', item.target);
		}
		return menuItem;
	},

	_createMenuItemSeparator: function() {
		return document.createElement('d2l-menu-item-separator');
	},

	_createMenuItemMenu: function(item) {
		item.querySelector('d2l-dropdown-menu').forceRender();
		var subMenu = item.querySelector('d2l-menu');
		var menuItem = document.createElement('d2l-menu-item');
		menuItem.setAttribute('text', item.text);
		dom(menuItem).appendChild(subMenu);
		return menuItem;
	},

	_createLayoutItem: function(item) {

		var refId = 'bgi-' + (++this._refId);
		item.setAttribute('bgi-ref', refId);

		var itemLayout = {
			refId: refId,
			isVisible: (item.offsetParent !== null),
			width: item.offsetWidth
				+ parseInt(window.getComputedStyle(item).marginLeft.replace('px', ''))
				+ parseInt(window.getComputedStyle(item).marginRight.replace('px', ''))
		};

		return itemLayout;

	},

	_getItems: function() {
		return Array.prototype.filter.call(
			dom(this).childNodes,
			function(node) {
				return node.nodeType === Node.ELEMENT_NODE && node.tagName.toLowerCase() !== 'template';
			}
		);
	},

	_init: function() {

		fastdom.measure(function() {

			this._container = dom(this.root).querySelector('.d2l-button-group-container');
			this._overflowMenu = dom(this.root).querySelector('d2l-button-group-menu') || dom(this.root).querySelector('d2l-button-subtle-group-menu');

			var items = this._getItems();
			if (this.autoShow) {
				this._autoDetectBoundaries(items);
			}

			this._layout = {
				totalWidth: 0
			};

			this._layout.items = items.map(function(item) {
				var itemLayout = this._createLayoutItem(item);
				if (itemLayout.isVisible) {
					this._layout.totalWidth += itemLayout.width;
				}
				return itemLayout;
			}.bind(this));

			this._layout.overflowMenuWidth = this._overflowMenu.offsetWidth;
			this._layout.availableWidth = this._container.clientWidth;
			this._chomp(items);

		}.bind(this));

	},

	_isOverflowMenuMini: function() {
		return this._overflowMenu.hasAttribute('mini');
	},

	_removeFromOverflowMenu: function(item) {

		var menuItem = dom(this._overflowMenu).querySelector('[bgi-ref="' + item.getAttribute('bgi-ref') + '"]');
		if (!menuItem) {
			return;
		}

		var tagName = item.tagName.toLowerCase();
		if (tagName === 'd2l-dropdown-button') {
			dom(item).querySelector('d2l-dropdown-menu').appendChild(
				dom(menuItem).querySelector('d2l-menu')
			);
		}
		dom(dom(menuItem).parentNode).removeChild(menuItem);

	},

	_resizeHandler: function() {
		if (!this._layout || !this._container) {
			return;
		}
		fastdom.measure(function() {
			this._layout.availableWidth = this._container.clientWidth;
			this._chomp();
		}.bind(this));
	},

	_update: function(addedNodes, removedNodes) {

		if (addedNodes.length === 0 && removedNodes.length === 0) {
			return;
		}

		fastdom.measure(function() {

			var items = this._getItems();
			var item, itemLayout;

			for (var addedIndex = 0; addedIndex < addedNodes.length; addedIndex++) {
				item = addedNodes[addedIndex];
				var itemIndex = items.indexOf(item);
				itemLayout = this._createLayoutItem(item);
				this._layout.items.splice(itemIndex, 0, itemLayout);
				if (itemLayout.isVisible) {
					this._layout.totalWidth += itemLayout.width;
				}
			}

			for (var removedIndex = 0; removedIndex < removedNodes.length; removedIndex++) {
				item = removedNodes[removedIndex];

				var refId = item.getAttribute('bgi-ref');
				for (var i = 0; i < this._layout.items.length; i++) {
					itemLayout = this._layout.items[i];
					if (itemLayout.refId === refId) {
						if (itemLayout.isVisible) {
							this._layout.totalWidth -= itemLayout.width;
						}
						this._layout.items.splice(i, 1);
						break;
					}
				}

				if (item.hasAttribute('chomped')) {
					fastdom.mutate(function() {
						this._removeFromOverflowMenu(item);
						item.removeAttribute('chomped');
					}.bind(this));
				}

			}

			this._chomp(items);

		}.bind(this));

	}

};

/** @polymerBehavior D2L.PolymerBehaviors.ButtonGroup.ResponsiveBehavior */
D2L.PolymerBehaviors.ButtonGroup.ResponsiveBehavior = [
	D2L.PolymerBehaviors.ButtonGroup.ResponsiveBehaviorImpl
];
