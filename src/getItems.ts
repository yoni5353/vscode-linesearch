import * as vscode from "vscode";

export async function getItems(): Promise<vscode.QuickPickItem[]> {
  function getCodeFiles() {
    return vscode.workspace.findFiles(
      "**/*.{ts,tsx}",
      "**/node_modules/**" // TODO vscode.workspace.getConfiguration("search").get("exclude")
    );
  }

  const items: vscode.QuickPickItem[] = [];

  const activeFileUri = vscode.window.activeTextEditor?.document.uri;
  const files = await getCodeFiles();
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
      data
        .toString()
        .split("\r\n")
        .forEach((line, index) => {
          line && items.push({ label: line });
        });
    })
  );

  return items;
}
