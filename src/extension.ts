import * as vscode from "vscode";

async function search() {
  const quickPick = vscode.window.createQuickPick();
  quickPick.placeholder = "Search all files... (excluding **/node_modules/**)";
  quickPick.busy = true;
  quickPick.onDidHide(() => quickPick.dispose());
  quickPick.show();

  const lines: string[] = [];

  const activeFileUri = vscode.window.activeTextEditor?.document.uri;

  const files = await vscode.workspace.findFiles("**/*.{ts,tsx}", "**/node_modules/**", 100);
  if (activeFileUri) {
    files.splice(
      files.findIndex((file) => file.path === activeFileUri.path),
      1
    );
    files.unshift(activeFileUri);
  }

  await Promise.all(
    files.map(async (file) => {
      const data = await vscode.workspace.fs.readFile(file);
      lines.push(...data.toString().split("\r\n"));
    })
  );

  quickPick.items = lines.map((label) => ({ label }));

  quickPick.busy = false;
}

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(vscode.commands.registerCommand("searchground.search", search));
}

export function deactivate() {}
