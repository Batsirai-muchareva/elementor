/**
 * Grunt postcss task config
 * @package Elementor
 */
module.exports = {
	dev: {
		options: {
			map: true,

			processors: [
				require( 'autoprefixer' )()
			]
		},
		files: [ {
			src: [
				'assets/css/*.css',
				'!assets/css/*.min.css'
			]
		} ]
	},
	minify: {
		options: {
			processors: [
				require( 'autoprefixer' )(),
				require( 'cssnano' )( {
					preset: [ 'default', {
						reduceIdents: false,
						zindex: false,
						calc: false
					} ]
				} )
			]
		},
		files: [ {
			expand: true,
			src: [
				'assets/css/*.css',
				'!assets/css/*.min.css',
				'assets/css/conditionals/*.css',
				'!assets/css/conditionals/*.min.css',
				'assets/css/modules/**/*.css',
				'!assets/css/modules/**/*.min.css',
				'assets/lib/swiper/css/*.css',
				'!assets/lib/swiper/css/*.min.css',
				'assets/css/templates/*.css',
				'!assets/css/templates/*.min.css'
			],
			ext: '.min.css'
		} ]
	}
};
