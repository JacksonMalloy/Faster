export const itemReplacer = (array: any[], oldItem: any, newItem: any) =>
  array.map((item: any) => (item === oldItem ? newItem : item))

export const itemDeleter = (array: any, deletedItem: any) => array.filter((item: any) => !deletedItem.includes(item))
