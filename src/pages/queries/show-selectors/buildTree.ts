import { ISelector } from '../../../interfaces';

export type TreeNode = ISelector & {
  children?: TreeNode[];
};

export const buildTree = (sels: ISelector[], all: ISelector[]): TreeNode[] =>
  sels.map((sel) => {
    const node: TreeNode = {
      ...sel,
    };

    const children = all.filter(({ parentId }) => parentId === sel.id);

    if (children.length === 0) {
      return node;
    }

    node.children = buildTree(children, all);
    return node;
  });
