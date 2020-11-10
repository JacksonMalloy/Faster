const { GraphQLObjectType, GraphQLSchema } = require('graphql')

// Admin Models
const { admin, adminsByOrganization } = require('./models/admin/queries')
const {
  signupAdmin,
  signupDirector,
  signinAdmin,
  joinAdminToOrganization,
  removeAdmin,
} = require('./models/admin/mutations')

// Active User Models
const { activeAdmin, activeCustomer } = require('./models/me/queries')

// Customer Models
const { customer, customersByOrganization } = require('./models/customer/queries')
const {
  signupCustomer,
  signinCustomer,
  joinCustomerToOrganization,
  removeCustomer,
} = require('./models/customer/mutations')

// Organization Models
const { organization, organizations } = require('./models/organization/queries')
const { createOrganization, removeOrganization, editOrganization } = require('./models/organization/mutations')

// Menu Models
const { menusByOrganization, menu } = require('./models/menu/queries')
const { addMenu, editMenu, removeMenu } = require('./models/menu/mutations')

// Menu Item Models
const { menuItem, menuItemsByOrganization, menuItemsByMenu } = require('./models/menuitem/queries')
const { addMenuItem, editMenuItem, removeMenuItem } = require('./models/menuitem/mutations')

// Menu Choice Models
const { menuChoice, menuChoicesByOrganization } = require('./models/menuchoice/queries')
const {
  addMenuChoice,
  editMenuChoice,
  removeMenuChoice,
  connectMenuChoicesToMenuItem,
  removeMenuChoicesMenuItemsConnection,
} = require('./models/menuchoice/mutations')

// Menu Selection Models
const {
  menuSelection,
  menuSelectionsByMenuItem,
  menuSelectionsByOrganization,
  menuSelectionsByMenuChoice,
} = require('./models/menuselection/queries')
const {
  addMenuSelection,
  editMenuSelection,
  removeMenuSelection,
  connectMenuSelectionsToMenuChoice,
  removeMenuSelectionsMenuChoicesConnection,
} = require('./models/menuselection/mutations')

// Menu Header Models
const { menuHeader, menuHeadersByMenu } = require('./models/menuheader/queries')
const { addMenuHeader, editMenuHeader, removeMenuHeader } = require('./models/menuheader/mutations')

// Image Models
const { imagesByOrganization, imagesByMenu, imageById, imageByMenuItem } = require('./models/image/queries')
const { uploadImage, deleteImage, connectImageToMenu, connectImageToMenuItem } = require('./models/image/mutations')

// Order Models
// const { createOrder } = require('./models/orders/mutations')
// const { newOrder, createOrder } = require('./models/orders/subscriptions')

const Query = new GraphQLObjectType({
  name: 'Queries',
  fields: {
    admin,
    adminsByOrganization,
    customer,
    customersByOrganization,
    organization,
    organizations,
    menu,
    menusByOrganization,
    menuItem,
    menuItemsByOrganization,
    menuItemsByMenu,
    menuChoice,
    menuChoicesByOrganization,
    menuSelection,
    menuSelectionsByMenuItem,
    menuSelectionsByOrganization,
    menuSelectionsByMenuChoice,
    menuHeader,
    menuHeadersByMenu,
    activeAdmin,
    activeCustomer,
    imagesByOrganization,
    imagesByMenu,
    imageById,
    imageByMenuItem,
  },
})

const Mutation = new GraphQLObjectType({
  name: 'Mutations',
  fields: () => ({
    signupAdmin,
    signupDirector,
    signupCustomer,
    signinAdmin,
    signinCustomer,
    createOrganization,
    joinAdminToOrganization,
    joinCustomerToOrganization,
    removeOrganization,
    editOrganization,
    removeAdmin,
    removeCustomer,
    addMenu,
    editMenu,
    removeMenu,
    addMenuItem,
    editMenuItem,
    removeMenuItem,
    addMenuHeader,
    editMenuHeader,
    removeMenuHeader,
    addMenuChoice,
    editMenuChoice,
    removeMenuChoice,
    connectMenuChoicesToMenuItem,
    removeMenuChoicesMenuItemsConnection,
    addMenuSelection,
    editMenuSelection,
    removeMenuSelection,
    connectMenuSelectionsToMenuChoice,
    removeMenuSelectionsMenuChoicesConnection,
    uploadImage,
    deleteImage,
    connectImageToMenu,
    connectImageToMenuItem,
    createOrder,
  }),
})

const { OrderType } = require('./typeDefs/order')
const { GraphQLID, GraphQLString, GraphQLNonNull, GraphQLList, GraphQLInt } = require('graphql')
const { PubSub } = require('graphql-subscriptions')

const pubsub = new PubSub()

const CREATED_ORDER = `CREATED_ORDER`

const createMenuOrder = async ({ admin_id, customer_id, total, charge }, context) => {
  const query = `INSERT INTO "fm"."orders" (admin_id, customer_id, total, charge) VALUES ($1, $2, $3, $4) RETURNING *`
  const params = [admin_id, customer_id, total, charge]

  try {
    const result = await context.pool.query(query, params)

    return result.rows[0]
  } catch (error) {
    //console.log(error)
    throw error
  }
}

const createOrder = {
  type: OrderType,
  description: 'Create an Order',
  args: {
    admin_id: { type: GraphQLID },
    customer_id: { type: GraphQLID },
    total: { type: GraphQLInt },
    charge: { type: GraphQLString },
  },
  resolve: async (obj, args, context, info) => {
    return createMenuOrder(args, context).then((order) => {
      pubsub.publish(CREATED_ORDER, { newOrder: order })
      console.log({ order })
      return order
    })
  },
}

const Subscription = new GraphQLObjectType({
  name: 'Subscriptions',

  fields: {
    newOrder: {
      type: OrderType,
      resolve: (payload, args, context, info) => {
        // Without this it does not work neither
        console.log({ payload })
        return payload
      },
      subscribe: () => pubsub.asyncIterator(CREATED_ORDER),
    },
  },
})

module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
  subscription: Subscription,
})
