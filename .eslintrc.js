module.exports = {
	env: {
		browser: true,
		es6: true,
	},
	extends: ['airbnb-base'],
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly',
		ga: 'readonly',
	},
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: 'module',
	},
	rules: {
		'comma-dangle': 0,
		'no-tabs': 0,
		'no-use-before-define': 0,
		indent: [2, 'tab'],
	},
};
