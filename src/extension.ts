import { languages, ExtensionContext, commands } from "vscode";
import { WxmlFormater } from "./plugins/wxml";

export function activate(context: ExtensionContext) {
  const wxml = "wxml";
  const formater = new WxmlFormater();

  context.subscriptions.push(
    // 格式化
    languages.registerDocumentFormattingEditProvider(wxml, formater),
    languages.registerDocumentRangeFormattingEditProvider(wxml, formater),
    commands.registerCommand(`wxml-pretty.format`, () => {
      commands.executeCommand(`editor.action.formatDocument`).then(() => {
        commands.executeCommand(`workbench.action.files.save`);
      });
    })
  );
}

// this method is called when your extension is deactivated
// eslint-disable-next-line @typescript-eslint/no-empty-function
export function deactivate() {}
