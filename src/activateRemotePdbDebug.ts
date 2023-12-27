'use strict';

import * as vscode from 'vscode';
// import { WorkspaceFolder, DebugConfiguration, ProviderResult, CancellationToken } from 'vscode';

export function activateRemotePdbDebug(context: vscode.ExtensionContext) {


    context.subscriptions.push(
        vscode.commands.registerCommand('extension.pyremotedebugger.Connect', config => {
            return vscode.window.showInputBox({
                placeHolder: "Please enter the name of a mapping directory in the workspace folder",
                value: ""
            });
        })
        // vscode.commands.registerCommand('extension.pyremotedebugger.Connect', async () => {
        //     const host = await vscode.window.showInputBox({ prompt: "Enter the host for remote debugging" });
        //     const port = await vscode.window.showInputBox({ prompt: "Enter the port for remote debugging" });

        //     // ここでhostとportを使用してtelnet接続を行う処理を実装する
        //     console.log(host);
        //     console.log(port);
        // })
    );




    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    // console.log('Congratulations, your extension "pyremotedebugger" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json

    // context.subscriptions.push(vscode.commands.registerCommand('pyremotedebugger.helloWorld', () => {
    //     // The code you place here will be executed every time your command is executed
    //     // Display a message box to the user
    //     vscode.window.showInformationMessage('Hello World from PyRemoteDebugger!');
    // }));

    // context.subscriptions.push(vscode.commands.registerCommand('pyremotedebugger.activateRemotePdbDebug', activateRemotePdbDebug));

    // context.subscriptions.push(vscode.commands.registerCommand('pyremotedebugger.deactivateRemotePdbDebug', deactivateRemotePdbDebug));

    // context.subscriptions.push(vscode.commands.registerCommand('pyremotedebugger.startRemotePdbDebug', startRemotePdbDebug));

    // context.subscriptions.push(vscode.commands.registerCommand('pyremotedebugger.stopRemotePdbDebug', stopRemotePdbDebug));

    // context.subscriptions.push(vscode.commands.registerCommand('pyremotedebugger.restartRemotePdbDebug', restartRemotePdbDebug));

    // context.subscriptions.push(vscode.commands.registerCommand('pyremotedebugger.stepOverRemotePdbDebug', stepOverRemotePdbDebug));

    // context.subscriptions.push(vscode.commands.registerCommand('pyremotedebugger.stepIntoRemotePdbDebug', stepIntoRemotePdbDebug));

    // context.subscriptions.push(vscode.commands.registerCommand('pyremotedebugger.stepOutRemotePdbDebug', stepOutRemotePdbDebug));

    // context.subscriptions.push(vscode.commands.registerCommand('pyremotedebugger.continueRemotePdbDebug', continueRemotePdbDebug));

    // context.subscriptions.push(vscode.commands.registerCommand('pyremotedebugger.pauseRemotePdbDebug', pauseRemotePdbDebug));

    // context.subscriptions.push(vscode.commands.registerCommand('pyremotedebugger.restartFrameRemotePdbDebug', restartFrameRemotePdbDebug));

    // context.subscriptions.push(vscode.commands.registerCommand('pyremotedebugger.gotoFrameRemotePdbDebug', gotoFrameRemoteP
}

