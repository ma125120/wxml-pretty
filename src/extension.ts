import { parse, generate } from "wxml-parse";
import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    "wxml-pretty.format",
    () => {
      const doc = vscode.window.activeTextEditor?.document;
      const { uri, getText, languageId, save, fileName } = doc || {};

      save().then(() => {
        const config = vscode.workspace.getConfiguration();
        const isOpen = config.get(`wxml-pretty.format`);
        const maxWidth: number = config.get(`wxml-pretty.maxWidth`);
        if (isOpen) {
          if (languageId !== "wxml" && !/\.wxml$/g.test(fileName)) {
            return;
          }

          try {
            const ast = parse(getText());
            const content = generate(ast, { compress: false, maxWidth });
            vscode.workspace.fs.writeFile(uri, Buffer.from(content, "utf8"));
          } catch (err) {
            vscode.window.showErrorMessage(err.message);
          }
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
