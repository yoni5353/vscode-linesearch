import * as vscode from "vscode";
import { type LineItem, getItems } from "./getItems";

function search() {
  const quickPick = vscode.window.createQuickPick();
  quickPick.placeholder = "Search all files... (excluding **/node_modules/**)";
  quickPick.onDidHide(() => quickPick.dispose());
  quickPick.busy = true;

  quickPick.onDidChangeActive((items) => {
    const item = items[0] as LineItem;
    if (!item) return;

    vscode.window.showTextDocument(item.file, {
      preview: true,
      selection: new vscode.Range(item.lineIndex, 0, item.lineIndex, 0),
      preserveFocus: true,
    });
  });

  const startingSelection = vscode.window.activeTextEditor?.selection;
  const startingFile = vscode.window.activeTextEditor?.document.uri;
  quickPick.onDidHide(() => {
    startingFile &&
      vscode.window.showTextDocument(startingFile, {
        selection: startingSelection,
      });
  });

  quickPick.onDidAccept(() => {
    quickPick.hide();
  });

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
