function getNewId(list) {
  let maxId = 0;
  for (const Item of list) {
    if (Item.id > maxId) {
      maxId = Item.id;
    }
  }
  return maxId + 1;
}
module.exports = getNewId;
