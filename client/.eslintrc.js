module.exports = {
	parser: 'babel-eslint',
	extends: ['airbnb', 'prettier', 'prettier/react'],
	plugins: ['react', 'jsx-a11y', 'import', 'react-hooks'],
	env: {
		browser: true,
		es6: true,
	},
	rules: {
		'react/jsx-filename-extension': [0],
		'react/forbid-prop-types': [0],
		'no-shadow': 'off',
		'import/prefer-default-export': 'off',
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'warn',
		'no-underscore-dangle': 'off'
	},
};
