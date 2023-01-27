import { ParserType } from './parser-type.enum';

export interface IParser {
  parserType: ParserType;

  /**
   * replaceText
   */
  isRegex?: boolean;
  pattern?: string;
  replacement?: string;

  /**
   * addText
   */
  append?: string;
  prepend?: string;

  /**
   * stripHTML
   */
  stripHtmlTags?: boolean;
  decodeHtmlEntities?: boolean;

  /**
   * removeWhitespaces
   */
  removeWhitespaces?: boolean;
  removeNewlines?: boolean;

  selectorId: number;

  // selector: Selector;
}
