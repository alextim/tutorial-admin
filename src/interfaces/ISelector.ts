import { IEntityBase } from './IEntityBase';

export interface ISelector extends IEntityBase {
  name: string;

  selector: string;

  type: string;

  multiply?: boolean;

  regex?: string;

  // parsers?: Parser[];

  queryId: number;
}
