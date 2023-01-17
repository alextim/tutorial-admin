import { ParserType } from './parser-type.enum';

export interface IParser {
  parserType: ParserType;

  /**
   * RegexMatch
   */
  regex?: string;
  matchGroup?: string;
  multiply?: boolean;
  separator?: boolean;

  /**
   * replace
   */
  isRegex?: boolean;
  pattern?: string;
  replacement?: string;

  append?: string;
  prepend?: string;

  /**
   * Strip HTML
   */
  stripHtmlTags?: boolean;
  decodeHtmlEntities?: boolean;

  /**
   * RemoveWhitespaces
   */
  removeWhitespaces?: boolean;

  removeNewlines?: boolean;

  selectorId: number;

  // selector: Selector;
}
