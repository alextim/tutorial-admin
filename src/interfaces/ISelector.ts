import type { IEntityBase } from './IEntityBase';
import type { SelectorType } from './selector-type.enum';

export interface ISelector extends IEntityBase {
  name: string;

  selector: string;

  type: SelectorType;

  multiply?: boolean;

  // parsers?: Parser[];

  queryId: number;

  parentId: number | null;
}
