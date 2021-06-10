import {
  FormattingOptions,
  DocumentFormattingEditProvider,
  DocumentRangeFormattingEditProvider,
  TextDocument,
  TextEdit,
  Range,
  workspace,
  window,
} from "vscode";
import { parse, generate } from "wxml-parse";

export class WxmlFormater
  implements
    DocumentFormattingEditProvider,
    DocumentRangeFormattingEditProvider
{
  // constructor() {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async format(doc: TextDocument, range: Range, options?: FormattingOptions) {
    const code = doc.getText(range);
    let content: string = code;

    const config = workspace.getConfiguration();
    const isOpen = config.get(`wxml-pretty.format`);
    const maxWidth: number = config.get(`wxml-pretty.maxWidth`);
    if (isOpen) {
      try {
        const ast = parse(content);
        content = generate(ast, { compress: false, maxWidth });
      } catch (err) {
        window.showErrorMessage(err.message);
      }
    }

    return [new TextEdit(range, content)];
  }

  provideDocumentFormattingEdits(
    doc: TextDocument,
    options: FormattingOptions
  ): Promise<TextEdit[]> {
    const range = new Range(
      doc.lineAt(0).range.start,
      doc.lineAt(doc.lineCount - 1).range.end
    );
    return this.format(doc, range, options);
  }

  provideDocumentRangeFormattingEdits(
    doc: TextDocument,
    range: Range,
    options: FormattingOptions
  ): Promise<TextEdit[]> {
    // const prefixRange = doc.getWordRangeAtPosition(range.start, /[ \t]+/);
    // const prefix = prefixRange ? doc.getText(prefixRange) : "";
    return this.format(doc, range, options);
  }
}
