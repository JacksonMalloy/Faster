const DataLoader = require('dataloader')

// IDS
// ["asdfasdfds", "asdfdsasdf"]

const batchUsers = async (ids) => {
  // Get user Array
  // const users = await User.findByIds(ids)
  // Create User Map to ensure data is returned in same order to Dataloader
  // const userMap = {}
  // users.forEach(user => {
  //    userMap[user.id] = user
  // })
  // return ids.map(id => userMap[id])
}

const userLoader = () => new DataLoader(batchUsers)

module.exports = { userLoader }
