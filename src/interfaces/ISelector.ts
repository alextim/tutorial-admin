import { IEntityBase } from './IEntityBase';
import { SelectorType } from './selector-type.enum';

export interface ISelector extends IEntityBase {
  name: string;

  selector: string;

  type: SelectorType;

  multiply?: boolean;

  regex?: string;

  // parsers?: Parser[];

  queryId: number;
}
