import * as vscode from 'vscode';
import { activateRemotePdbDebug } from './activateRemotePdbDebug';

export function activate(context: vscode.ExtensionContext) {
    activateRemotePdbDebug(context);
}

export function deactivate() {
}