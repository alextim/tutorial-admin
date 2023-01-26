import { ParserType } from "../../../../interfaces/parser-type.enum";

export const parserTitle = {
  [ParserType.ReplaceText]: 'Replace Text',
  [ParserType.RemoveWhitespaces]: 'Remove Whitespaces',
  [ParserType.AddText]: 'Add Text',
  [ParserType.StripHTML]: 'Strip HTML',
};


export const parserColor = {
  [ParserType.ReplaceText]: 'red',
  [ParserType.RemoveWhitespaces]: 'pink',
  [ParserType.AddText]: 'green',
  [ParserType.StripHTML]: 'magenta',
};
