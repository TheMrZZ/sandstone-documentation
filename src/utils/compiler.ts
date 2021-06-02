// Some code from the `util` module use process.env, we must manually mock it
if (!window.process) {
	// @ts-expect-error
	window.process = {}
}
if (!window.process.env) {
	window.process.env = {}
}

import { transpile } from 'typescript';
import type { SaveOptions } from 'sandstone/datapack/saveDatapack';

export type CustomHandlerFileObject = (Parameters<Required<SaveOptions>['customFileHandler']>[0] & {key: number}) | {type: 'errors', relativePath: string, content: string, key: number};

export async function compileDataPack(tsCode: string) {
	const jsCode = transpile(tsCode)
	const sandstone = await import('sandstone')
	const { dataPack } = await import('sandstone/init')

	// First reset the data pack
	dataPack.reset()

	const require = (module: string) => {
		if (module.toLowerCase() === 'sandstone') {
			return sandstone;
		}

		console.error('Cannot import modules other than sandstone');
		return {}
	}

	const sandstoneExports = Object.keys(sandstone)

	eval(`
		const {${ sandstoneExports.join(',') }} = require('sandstone');
		(() => {
			var exports = {};
			var window = undefined;
			var document = undefined;
		${jsCode}
	})()`)
	
	const files: CustomHandlerFileObject[] = []

	await sandstone.savePack('myDataPack', {
		customFileHandler: (fileInfo) => {
			files.push({...fileInfo, key: files.length})
		},
		indentation: 2,
	})

	return files

}