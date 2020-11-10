const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLBoolean } = require('graphql')
const { MenuItemType } = require('./menuitem')
const { FileType } = require('./file')

const getImageByMenu = async (parent, args, context) => {
  //console.log(`PARENT!: `, parent)

  const query = `SELECT * FROM "fm"."images"
                    WHERE menu_id = $1`
  const params = [parent.menu_id]

  try {
    const result = await context.pool.query(query, params)
    //console.log(result.rows)
    return result.rows[0]
  } catch (error) {
    //console.log(error)
    throw error
  }
}

const MenuType = new GraphQLObjectType({
  name: 'Menu',
  fields: {
    menu_id: { type: GraphQLString },
    organization_id: { type: GraphQLString },
    created_at: { type: GraphQLString },
    updated_at: { type: GraphQLString },
    published: { type: GraphQLBoolean },
    title: { type: GraphQLString },
    menu_items: {
      type: new GraphQLList(MenuItemType),
    },
    image: {
      type: FileType,
      resolve: async (parent, args, context, info) => await getImageByMenu(parent, args, context),
    },
  },
})

module.exports = { MenuType }
