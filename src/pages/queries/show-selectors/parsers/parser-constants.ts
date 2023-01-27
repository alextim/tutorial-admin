import { ParserType } from '../../../../interfaces/parser-type.enum';

export const parserTitle: Record<ParserType, string> = {
  [ParserType.ReplaceText]: 'Replace Text',
  [ParserType.RemoveWhitespaces]: 'Remove Whitespaces',
  [ParserType.AddText]: 'Add Text',
  [ParserType.StripHTML]: 'Strip HTML',
};

export const parserColor: Record<ParserType, string> = {
  [ParserType.ReplaceText]: 'red',
  [ParserType.RemoveWhitespaces]: 'pink',
  [ParserType.AddText]: 'green',
  [ParserType.StripHTML]: 'magenta',
};
