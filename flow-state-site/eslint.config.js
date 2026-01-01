const nextCoreWebVitals = require('eslint-config-next/core-web-vitals');
const nextTypeScript = require('eslint-config-next/typescript');

module.exports = [
	{
		ignores: [
			'**/node_modules/**',
			'**/.next/**',
			'**/out/**',
			'**/dist/**',
			'**/coverage/**',
			'eslint.config.js',
			'scripts/**',

			// Demo/experimental modules (not part of the buyer-site ship path)
			'src/components/primo/**',
			'src/store/primoStore.ts',
			'src/store/digitalTwinStore.ts',
			'src/components/yardbuilder/YardBuilderAI.tsx',
			'app/singularity/primo/**',
		],
	},
	...nextCoreWebVitals,
	...nextTypeScript,
	{
		rules: {
			'react/no-unescaped-entities': 'off',
		},
	},
];
