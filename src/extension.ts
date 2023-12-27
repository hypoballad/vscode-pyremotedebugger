// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { WorkspaceFolder, DebugConfiguration, ProviderResult, CancellationToken } from 'vscode';
import { RemetePDBDebugSession } from './remotepdbDebug';
import { FileAccessor } from './remotepdbRuntime';
//import { activateRemotePdbDebug } from './activateRemotePdbDebug';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "pyremotedebugger" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	// let disposable = vscode.commands.registerCommand('pyremotedebugger.helloWorld', () => {
	// 	// The code you place here will be executed every time your command is executed
	// 	// Display a message box to the user
	// 	vscode.window.showInformationMessage('Hello World from PyRemoteDebugger!');
	// });

	// context.subscriptions.push(disposable);

	//activateRemotePdbDebug(context);

	context.subscriptions.push(
		vscode.commands.registerCommand('extention.pyremotedebugger.getProgramName', config => {
			return vscode.window.showInputBox({
				placeHolder: "Please enter the name of a mapping directory in the workspace folder",
				value: ""
			});
		}),
		vscode.commands.registerCommand('extension.pyremotedebugger.Connect', async () => {
			const host = await vscode.window.showInputBox({ prompt: "Enter the host for remote debugging" });
			const port = await vscode.window.showInputBox({ prompt: "Enter the port for remote debugging" });

			// ここでhostとportを使用してtelnet接続を行う処理を実装する
			console.log(host);
			console.log(port);
		})
	);

	const provider = new RemotePdbDebugConfigurationProvider();
	context.subscriptions.push(vscode.debug.registerDebugConfigurationProvider('pythonRemotePdb', provider));

	let factory: vscode.DebugAdapterDescriptorFactory;
	factory = new InlineDebugAdapterFactory();

	context.subscriptions.push(vscode.debug.registerDebugAdapterDescriptorFactory('pythonRemotePdb', factory));


}


class RemotePdbDebugConfigurationProvider implements vscode.DebugConfigurationProvider {
	/**
	 * Massage a debug configuration just before a debug session is being launched,
	 * e.g. add all missing attributes to the debug configuration.
	 */
	resolveDebugConfiguration(folder: WorkspaceFolder | undefined, config: DebugConfiguration, token?: CancellationToken): ProviderResult<DebugConfiguration> {

		// if launch.json is missing or empty
		if (!config.type && !config.request && !config.name) {
			const editor = vscode.window.activeTextEditor;
			if (editor && editor.document.languageId === 'python') {
				config.type = 'pythonRemotePdb';
				config.name = 'Launch';
				config.request = 'launch';
				config.program = '${file}';
				config.stopOnEntry = true;
			}
		}

		if (!config.program) {
			return vscode.window.showInformationMessage("Cannot find a program to debug").then(_ => {
				return undefined;	// abort launch
			});
		}

		return config;
	}
}

// This method is called when your extension is deactivated
export function deactivate() { }

export const workspaceFileAccessor: FileAccessor = {
	isWindows: typeof process !== 'undefined' && process.platform === 'win32',
	async readFile(path: string): Promise<Uint8Array> {
		let uri: vscode.Uri;
		try {
			uri = pathToUri(path);
		} catch (e) {
			return new TextEncoder().encode(`cannot read '${path}'`);
		}

		return await vscode.workspace.fs.readFile(uri);
	},
	async writeFile(path: string, contents: Uint8Array) {
		await vscode.workspace.fs.writeFile(pathToUri(path), contents);
	}
};

function pathToUri(path: string) {
	try {
		return vscode.Uri.file(path);
	} catch (e) {
		return vscode.Uri.parse(path);
	}
}

class InlineDebugAdapterFactory implements vscode.DebugAdapterDescriptorFactory {

	createDebugAdapterDescriptor(_session: vscode.DebugSession): ProviderResult<vscode.DebugAdapterDescriptor> {
		return new vscode.DebugAdapterInlineImplementation(new RemetePDBDebugSession(workspaceFileAccessor));
	}
}
