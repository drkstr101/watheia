import { MarkedOptions, RendererApi } from 'marked';

/*
Based on https://github.com/etler/marked-plaintext (Plain text renderer for Marked) by Tim Etler, ISC license.
Converted to ES class & added missing checkbox() function (which does nothing, but needs to be there...).
*/
export class PlainTextRenderer implements RendererApi {
  options: MarkedOptions;
  whitespaceDelimiter: string;
  showImageText: any;
  constructor(options: MarkedOptions) {
    this.options = options || {};
    this.whitespaceDelimiter = ' ';
  }
  table(header: string, body: string): string {
    throw new Error('Method not implemented.');
  }

  code(code: string, infostring: string | undefined, escaped: boolean) {
    return (
      this.whitespaceDelimiter +
      this.whitespaceDelimiter +
      code +
      this.whitespaceDelimiter +
      this.whitespaceDelimiter
    );
  }

  blockquote(quote: string) {
    return '\t' + quote + this.whitespaceDelimiter;
  }

  html(html: string) {
    return html;
  }

  heading(text: string, level: number, raw: string) {
    return text;
  }

  hr() {
    return this.whitespaceDelimiter + this.whitespaceDelimiter;
  }

  list(body: string, ordered: boolean, start: number | '') {
    return body;
  }

  listitem(text: string, task: boolean, checked: boolean): string {
    return '\t' + text + this.whitespaceDelimiter;
  }

  checkbox(checked: boolean): string {
    return '';
  }

  paragraph(text: string): string {
    return this.whitespaceDelimiter + text + this.whitespaceDelimiter;
  }

  tabletable(header: string, body: string): string {
    return (
      this.whitespaceDelimiter +
      header +
      this.whitespaceDelimiter +
      body +
      this.whitespaceDelimiter
    );
  }

  tablerow(content: string): string {
    return content + this.whitespaceDelimiter;
  }

  tablecell(
    content: string,
    flags: { header: boolean; align: 'center' | 'left' | 'right' | null }
  ) {
    return content + '\t';
  }

  // span level renderer
  strong(text: string): string {
    return text;
  }

  em(text: string): string {
    return text;
  }

  codespan(text: string): string {
    return text;
  }

  br(): string {
    return this.whitespaceDelimiter + this.whitespaceDelimiter;
  }

  del(text: string): string {
    return text;
  }

  link(href: string, title: string | null | undefined, text: string): string {
    return text;
  }

  image(href: string, title: string | null, text: string): string {
    return this.showImageText ? text : '';
  }

  text(text: string): string {
    return text;
  }
}
