import * as vscode from "vscode";

export type LineItem = vscode.QuickPickItem & {
  file: vscode.Uri;
  lineIndex: number;
};

export async function getItems(): Promise<LineItem[]> {
  function getCodeFiles() {
    return vscode.workspace.findFiles(
      "**/*.{ts,tsx,md,js,jsx,json,yml,yaml,css,scss,less,html,htm}", // TODO any text file
      "**/node_modules/**" // TODO vscode.workspace.getConfiguration("search").get("exclude")
    );
  }

  const items: LineItem[] = [];

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
        .split(/\r?\n/)
        .forEach((line, index) => {
          line && items.push({ label: line, file, lineIndex: index });
        });
    })
  );

  return items;
}
