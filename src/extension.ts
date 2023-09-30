import * as vscode from "vscode";
import { getItems } from "./getItems";

function search() {
  const quickPick = vscode.window.createQuickPick();
  quickPick.placeholder = "Search all files... (excluding **/node_modules/**)";
  quickPick.onDidHide(() => quickPick.dispose());
  quickPick.busy = true;
  quickPick.show();

  getItems().then((items) => {
    quickPick.items = items;
    quickPick.busy = false;
  });
}

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("searchground.search", search)
  );
}

export function deactivate() {}
