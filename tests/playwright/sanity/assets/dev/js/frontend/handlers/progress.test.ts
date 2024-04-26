import { expect, test } from '@playwright/test';
import WpAdminPage from '../../../../../../pages/wp-admin-page';

test.describe( 'ProgressBar test', () => {
	test( 'Testing intersection observer in progress bar', async ( { page }, testInfo ) => {
		// Arrange.
		const wpAdmin = new WpAdminPage( page, testInfo ),
			editor = await wpAdmin.openNewPage();

		// Assert.
		await editor.addElement( { elType: 'container' }, 'document' );
		await editor.setSliderControlValue( 'min_height', '1000' );
		await editor.addWidget( 'progress' );
		await editor.publishAndViewPage();

		const progressBar = page.locator( '.elementor-progress-bar' );

		// Assert.
		await expect( progressBar ).not.toHaveCSS( 'width', '50%' );

		await page.evaluate( () => window.scrollBy( { top: 600 } ) );

		await expect( progressBar ).not.toHaveCSS( 'width', '50%' );
	} );
} );
