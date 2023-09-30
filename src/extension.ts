import * as vscode from "vscode";

async function searchActive() {
  const lines: string[] = [];

  const files = await vscode.workspace.findFiles("**/*.ts", "**/node_modules/**", 100);
  await Promise.all(
    files.map(async (file) => {
      const data = await vscode.workspace.fs.readFile(file);
      lines.push(...data.toString().split("\r\n"));
    })
  );

  const quickPick = vscode.window.createQuickPick();
  quickPick.placeholder = "Search all files... (excluding **/node_modules/**)";
  quickPick.items = lines.map((label) => ({ label }));

  quickPick.onDidHide(() => quickPick.dispose());
  quickPick.show();
}

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand("searchground.searchactive", searchActive);

  context.subscriptions.push(disposable);
}

export function deactivate() {}
