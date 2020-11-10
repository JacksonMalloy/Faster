// Need to fix all calls!

const { rule, shield, and, or, not, allow, deny } = require('graphql-shield')
const { getUserId } = require('./utils')

const rules = {
  isDeveloper: rule()(async (parent, args, context) => {
    const id = getUserId(context)
    const userPermissions = await context.prisma.user({ id }).permissions()
    return userPermissions === 'DEVELOPER'
  }),
  isDirector: rule()(async (parent, args, context) => {
    const id = getUserId(context)
    const userPermissions = await context.prisma.user({ id }).permissions()
    return userPermissions === 'DIRECTOR'
  }),
  isAdmin: rule()(async (parent, args, context) => {
    const id = getUserId(context)
    const userPermissions = await context.prisma.user({ id }).permissions()
    return userPermissions === 'ADMIN'
  }),
  isCustomer: rule()(async (parent, args, context) => {
    const id = getUserId(context)
    const userPermissions = await context.prisma.user({ id }).permissions()
    return userPermissions === 'CUSTOMER'
  }),
  isAuthenticated: rule()((parent, args, context) => {
    const userId = getUserId(context)
    return Boolean(userId)
  }),
  isOrganizationOwner: rule()(async (parent, { id }, context) => {
    const userId = getUserId(context)
    const owner = await context.prisma.organization({ id }).createdBy()
    //console.log(owner.permissions)
    return userId === owner.id
  }),
}

const permissions = shield({
  Query: {
    me: rules.isAuthenticated,
    users: rules.isDeveloper,
    userById: rules.isDeveloper,
    customer: rules.isAuthenticated,
    customers: rules.isDeveloper,
    customerById: rules.isDeveloper,
    customersByOrganization: or(rules.isAdmin, rules.isDeveloper, rules.isDirector),
    menuById: rules.isAuthenticated,
    menusByOrganization: rules.isAuthenticated,
  },
  Mutation: {
    // registerDeveloper: rules.isDeveloper,
    createOrganization: or(rules.isDeveloper, rules.isDirector),
    deleteOrganization: or(rules.isDeveloper, rules.isDirector),
    createMenu: or(rules.isAdmin, rules.isDeveloper, rules.isDirector),
    publishMenu: or(rules.isAdmin, rules.isDeveloper, rules.isDirector),
    deleteMenu: or(rules.isAdmin, rules.isDeveloper, rules.isDirector),
    createMenuItem: or(rules.isAdmin, rules.isDeveloper, rules.isDirector),
    deleteMenuItem: or(rules.isAdmin, rules.isDeveloper, rules.isDirector),
    createMenuChoice: or(rules.isAdmin, rules.isDeveloper, rules.isDirector),
    deleteMenuChoice: or(rules.isAdmin, rules.isDeveloper, rules.isDirector),
    createMenuHeader: or(rules.isAdmin, rules.isDeveloper, rules.isDirector),
    deleteMenuHeader: or(rules.isAdmin, rules.isDeveloper, rules.isDirector),
    createMenuSelection: or(rules.isAdmin, rules.isDeveloper, rules.isDirector),
    deleteMenuSelection: or(rules.isAdmin, rules.isDeveloper, rules.isDirector),
  },
})

module.exports = { permissions }
