const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLBoolean } = require('graphql')
const { MenuHeaderType } = require('./menuheader')
const { MenuChoiceType } = require('./menuchoice')
const { FileType } = require('./file')

const getMenuItemHeader = async (parent, args, context) => {
  const query = `SELECT * FROM "fm"."menuheaders" WHERE menu_header_id = $1`
  const params = [parent.menu_header_id]

  try {
    const result = await context.pool.query(query, params)
    //console.log(result.rows)
    return result.rows[0]
  } catch (error) {
    //console.log(error)
    throw error
  }
}

const getMenuItemImage = async (parent, args, context) => {
  const query = `SELECT * FROM "fm"."images" WHERE menu_item_id = $1`
  const params = [parent.menu_item_id]

  try {
    const result = await context.pool.query(query, params)
    //console.log(result.rows)
    return result.rows[0]
  } catch (error) {
    //console.log(error)
    throw error
  }
}

const getMenuItemChoices = async (parent, args, context) => {
  const query = `SELECT
                  *
                FROM
                  "fm"."menuchoices" c
                INNER JOIN
                  "fm"."menuchoices_to_menuitems" mci
                ON c.menu_choice_id = mci.menu_choice_id
                INNER JOIN
                  "fm"."menuitems" i
                  ON mci.menu_item_id = i.menu_item_id
                WHERE i.menu_item_id = $1`

  const params = [parent.menu_item_id]

  try {
    const result = await context.pool.query(query, params)
    return result.rows
  } catch (error) {
    //console.log(error)
    throw error
  }
}

const MenuItemType = new GraphQLObjectType({
  name: 'MenuItem',
  fields: () => ({
    menu_item_id: { type: GraphQLString },
    menu_header_id: { type: GraphQLString },
    menu_id: { type: GraphQLString },
    base_price: { type: GraphQLString },
    description: { type: GraphQLString },
    name: { type: GraphQLString },
    // Might have to use Dataloader here
    menu_header: {
      type: MenuHeaderType,
      resolve: async (parent, args, context, info) => await getMenuItemHeader(parent, args, context),
    },
    image: {
      type: FileType,
      resolve: async (parent, args, context, info) => await getMenuItemImage(parent, args, context),
    },
    menu_choices: {
      type: new GraphQLList(MenuChoiceType),
      resolve: async (parent, args, context, info) => await getMenuItemChoices(parent, args, context),
    },
  }),
})

module.exports = { MenuItemType }
