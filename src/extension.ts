import { parse, generate } from "wxml-parse";
import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    "wxml-pretty.format",
    () => {
      const doc = vscode.window.activeTextEditor?.document;
      const { uri, getText, languageId, save } = doc || {};
      save().then(() => {
        const isOpen = vscode.workspace
          .getConfiguration()
          .get(`wxml-pretty.format`);
        if (isOpen) {
          if (languageId !== "wxml") {
            return;
          }

          const ast = parse(getText());
          const content = generate(ast, { compress: false });

          vscode.workspace.fs.writeFile(uri, Buffer.from(content, "utf8"));
        }
      });

      // debugger;
      // Display a message box to the user
      // vscode.window.showInformationMessage("wxml 已经启动");
    }
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
