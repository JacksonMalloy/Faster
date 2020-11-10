export const itemDeleter = (array, deletedItem) =>
  array.filter((item) => !deletedItem.includes(item))
