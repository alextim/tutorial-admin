import { IEntityBase } from './IEntityBase';
import { ParserType } from './parser-type.enum';

export interface IParser extends IEntityBase {
  parserType: ParserType;
  sortOrder?: number;

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
