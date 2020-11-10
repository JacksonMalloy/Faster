const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLBoolean } = require('graphql')

const getMenuItemsByHeader = async (parent, args, context) => {
  const query = `SELECT * FROM "fm"."menuitems" mi INNER JOIN
                     "fm"."menuheaders" mh
                ON mi.menu_header_id = mh.menu_header_id
                WHERE mh.menu_header_id = $1`

  const params = [parent.menu_header_id]

  try {
    const result = await context.pool.query(query, params)

    console.log(`THIS RUNS`)
    return result.rows
  } catch (error) {
    //console.log(error)
    throw error
  }
}

const MenuHeaderType = new GraphQLObjectType({
  name: 'MenuHeader',
  fields: () => ({
    menu_header_id: { type: GraphQLString },
    menu_id: { type: GraphQLString },
    name: { type: GraphQLString },
    sub_header: { type: GraphQLString },
    menu_items: {
      type: new GraphQLList(require('./menuitem').MenuItemType),
      resolve: async (parent, args, context, info) => await getMenuItemsByHeader(parent, args, context),
    },
  }),
})

module.exports = { MenuHeaderType }
