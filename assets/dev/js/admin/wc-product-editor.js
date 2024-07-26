( function() {
	const WcProductEditor = {
		init() {
			this.getDefaultSettings();
			this.wcNewProductEditorSwitchButton();
		},

		getDefaultSettings() {
			this.selectors = {
				wcProductHeaderInner: '.woocommerce-product-header__inner',
				buttonTemplate: '#elementor-woocommerce-new-editor-button',
				wcLoader: '.woocommerce-product-header[role="region"]',
				wcEditButton: '.woocommerce-product-header__inner #elementor-editor-button',
				body: 'body',
			};
		},

		getDirtyRecords() {
			return wp.data.select( 'core' ).__experimentalGetDirtyEntityRecords();
		},

		getEditedEntityRecordId() {
			const dirtyRecords = this.getDirtyRecords();

			const productDirtyRecord = dirtyRecords.find( ( record ) => 'postType' === record.kind && 'product' === record.name );

			return productDirtyRecord.key;
		},

		wcNewProductEditorSwitchButton() {
			const body = document.querySelector( this.selectors.body ),
				that = this;

			if ( ! body ) {
				return;
			}

			const observer = new MutationObserver( function( mutationsList ) {
				for ( const mutation of mutationsList ) {
					if ( 'childList' === mutation.type ) {
						if ( mutation.addedNodes.length > 0 ) {
							if ( that.isWcProductEditorLoading() && ! that.isElementorButtonInjected() ) {
								that.injectElementorButton();
								observer.disconnect();
							}
						}
					}
				}
			} );

			observer.observe( body, {
				childList: true, subtree: true,
			} );
		},

		injectElementorButton() {
			const wcProductHeaderInner = document.querySelector( this.selectors.wcProductHeaderInner );

			if ( wcProductHeaderInner ) {
				const buttonTemplate = document.querySelector( this.selectors.buttonTemplate ),
					tempDiv = document.createElement( 'div' );
				tempDiv.innerHTML = buttonTemplate.innerHTML;

				const button = tempDiv.firstElementChild,
					postId = this.getEditedEntityRecordId();

				button.href = this.getElementorPostEditURL( postId );

				wcProductHeaderInner.firstChild.append( button );
			}
		},

		getElementorPostEditURL( postId ) {
			return wp.url.addQueryArgs( `${ elementorAppConfig.admin_url }/post.php`, {
				post: postId,
				action: 'elementor',
			} );
		},

		isWcProductEditorLoading() {
			return !! document.querySelector( this.selectors.wcLoader );
		},

		isElementorButtonInjected() {
			return !! document.querySelector( this.selectors.wcEditButton );
		},
	};

	WcProductEditor.init();
}() );
