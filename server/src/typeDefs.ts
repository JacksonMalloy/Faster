import { gql } from 'apollo-server'

export const typeDefs = gql`
  scalar Upload

  type Subscription {
    orderCreated(tenantId: ID!): Order
    # orderArchived(orderId: ID!): Order
  }

  type Query {
    admin(adminId: ID!): Admin
    adminsByTenant(tenantId: ID!): [Admin]
    customer(customerId: ID!): Customer
    customersByTenant(tenantId: ID!): [Customer]
    tenant(tenantId: ID!): Tenant
    tenantByAccessCode(accessCode: String!): Tenant
    tenants: [Tenant]
    menu(menuId: ID!): Menu
    menusByTenant(tenantId: ID!): [Menu]

    # TODO
    searchMenus(tenantId: ID!, searchQuery: String): [Menu]

    menuItem(itemId: ID!): MenuItem
    menuItemsByTenant(tenantId: ID!): [MenuItem]
    menuItemsByMenu(menuId: ID!): [MenuItem]
    menuChoice(choiceId: ID!): MenuChoice
    menuChoicesByTenant(tenantId: ID!): [MenuChoice]
    menuSelection(selectionId: ID!): MenuSelection
    menuSelectionsByMenuItem(itemId: ID!): [MenuSelection]
    menuSelectionsByTenant(tenantId: ID!): [MenuSelection]
    menuSelectionsByMenuChoice(choiceId: ID!): [MenuSelection]
    menuHeader(headerId: ID!): MenuHeader
    menuHeadersByMenu(menuId: ID!): [MenuHeader]
    activeUserAdmin: Admin
    activeUserCustomer: Customer
    imagesByTenant(tenantId: ID!): [File]
    imageByMenu(menuId: ID!): File
    imageById(imageId: ID!): File
    imageByMenuItem(itemId: ID!): File
  }

  interface MutationResponse {
    code: String!
    success: Boolean!
    message: String!
  }

  type Mutation {
    createStripeAccount(email: String!): Stripe
    connectStripeAccount(accountId: ID!, accountType: String!): Stripe

    sendMessage(phone: String!, customerId: ID!): Twilio

    resetPassword(email: String!): AdminMutationResponse

    registerAdmin(phone: String!, email: String!, name: String!, password: String!): AdminMutationResponse
    registerDirector(phone: String!, email: String!, name: String!, password: String!): AdminMutationResponse
    registerCustomer(phone: String, email: String, name: String!): CustomerMutationResponse
    loginAdmin(email: String!, password: String!): AdminMutationResponse
    loginCustomer(email: String, phone: String, pin: String!): CustomerMutationResponse

    # CREATE
    createTenant(
      name: String
      address: String
      city: String
      countryRegion: String
      phone: String
      websiteUrl: String
      postalCode: String
      subAddress: String
      province: String
    ): TenantMutationResponse
    createMenu(tenantId: ID!, title: String!): MenuMutationResponse
    createMenuItem(
      menuId: ID!
      headerId: ID
      basePrice: String!
      description: String
      name: String!
    ): MenuItemMutationResponse
    createMenuHeader(menuId: ID!, name: String!, description: String): MenuHeaderMutationResponse
    createMenuChoice(tenantId: ID!, header: String!, description: String): MenuChoiceMutationResponse
    # May remove itemId, check first
    createMenuSelection(tenantId: ID!, itemId: ID, name: String!, valueAdd: String): MenuSelectionMutationResponse

    uploadImage(file: Upload!, itemId: ID, menuId: ID, tenantId: ID!, tenantName: String!): File

    createOrder(adminId: ID, customerId: ID, total: Int, charge: String, tenantId: ID!): OrderMutationResponse

    # EDIT
    updateTenant(
      tenantId: ID!
      name: String
      address: String
      city: String
      countryRegion: String
      phone: String
      websiteUrl: String
      postalCode: String
      subAddress: String
      province: String
    ): TenantMutationResponse
    updateMenu(menuId: ID!, title: String, published: Boolean): MenuMutationResponse
    updateMenuItem(
      itemId: ID!
      menuId: ID
      headerId: ID
      basePrice: String
      description: String
      name: String
    ): MenuItemMutationResponse
    updateMenuHeader(headerId: ID!, menuId: ID, name: String, description: String): MenuHeaderMutationResponse
    updateMenuChoice(choiceId: ID!, header: String, description: String): MenuChoiceMutationResponse
    updateMenuSelection(selectionId: ID!, name: String, valueAdd: String): MenuSelectionMutationResponse

    # DELETE
    deleteTenant(tenantId: ID!): TenantMutationResponse
    deleteAdmin(adminId: ID!): AdminMutationResponse
    deleteCustomer(customerId: ID!): CustomerMutationResponse
    deleteMenu(menuId: ID!): MenuMutationResponse
    deleteMenuItem(itemId: ID!): MenuItemMutationResponse
    deleteMenuHeader(headerId: ID!): MenuHeaderMutationResponse
    deleteMenuChoice(choiceId: ID!): MenuChoiceMutationResponse
    deleteMenuSelection(selectionId: ID!): MenuSelectionMutationResponse
    deleteImage(imageId: ID!): FileMutationResponse

    # CONNECT
    joinAdminToTenant(adminId: ID!, tenantId: ID!, authToken: String!): AdminToTenantConnectionResponse
    connectCustomerToTenant(customerId: ID!, tenantId: ID!): CustomerToTenantConnectionResponse

    connectMenuChoicesToMenuItem(choiceIds: [ID], itemId: ID!): MenuChoicesToMenuItemConnectionResponse
    removeMenuChoicesMenuItemsConnection(choiceIds: [ID], itemId: ID!): MenuChoicesToMenuItemConnectionResponse

    connectMenuSelectionsToMenuChoice(selectionIds: [ID], choiceId: ID!): MenuSelectionsToMenuChoicesConnectionResponse
    removeMenuSelectionsMenuChoicesConnection(
      selectionIds: [ID]
      choiceId: ID!
    ): MenuSelectionsToMenuChoicesConnectionResponse

    # TODO
    connectImageToMenu(imageId: ID!, menuId: ID!): ImageMenuConnectionResponse
    connectImageToMenuItem(imageId: ID!, itemId: ID!): ImageMenuItemConnectionResponse
  }

  # CONNECTIONS

  type ImageMenuItem {
    itemId: ID!
    imageId: ID!
  }

  type ImageMenuItemConnection {
    connect: [ImageMenuItem]
  }

  type ImageMenuItemConnectionResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    connection: ImageMenuItemConnection
  }

  type ImageMenu {
    menuId: ID!
    imageId: ID!
  }

  type ImageMenuConnection {
    connect: [ImageMenu]
  }

  type ImageMenuConnectionResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    connection: ImageMenuConnection
  }

  type MenuChoicesToMenuItem {
    choiceId: ID!
    itemId: ID!
  }

  type MenuChoicesToMenuItemConnection {
    connect: [MenuChoicesToMenuItem]
  }

  type MenuChoicesToMenuItemConnectionResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    connection: MenuChoicesToMenuItemConnection
  }

  type MenuSelectionsToMenuChoices {
    choiceId: ID!
    selectionId: ID!
  }

  type MenuSelectionsToMenuChoicesConnection {
    connect: [MenuSelectionsToMenuChoices]
  }

  type MenuSelectionsToMenuChoicesConnectionResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    connection: MenuSelectionsToMenuChoicesConnection
  }

  type AdminToTenant {
    adminId: ID!
    tenantId: ID!
  }

  type AdminToTenantConnection {
    connect: [AdminToTenant]
  }

  type AdminToTenantConnectionResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    connection: AdminToTenantConnection
  }

  type CustomerToTenant {
    customerId: ID!
    tenantId: ID!
  }

  type CustomerToTenantConnection {
    connect: [CustomerToTenant]
  }

  type CustomerToTenantConnectionResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    connection: CustomerToTenantConnection
  }

  #######################################
  # CONNECTIONS ABOVE ^^^^^^^^^^^^^^^^^^
  #######################################

  type Twilio {
    body: String
    phone: String
  }

  type Stripe {
    accountId: ID
  }

  type Tenant {
    tenantId: ID
    name: String
    address: String
    city: String
    accessCode: String
    countryRegion: String
    phone: String
    websiteUrl: String
    postalCode: String
    subAddress: String
    province: String
    authToken: String
    admins: [Admin]
    directors: [Admin]
    menus: [Menu]
  }

  type TenantMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    tenant: Tenant
  }

  type Admin {
    adminId: ID
    tenantId: ID
    phone: String
    email: String
    name: String
    permissions: String
    createdAt: String
    token: String
    tenant: Tenant
  }

  type AdminMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    type: String
    admin: Admin
  }

  type Customer {
    customerId: ID
    phone: String
    email: String
    name: String
    permissions: String
    createdAt: String
    token: String
    tenants: [Tenant]
  }

  type CustomerMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    customer: Customer
  }

  type File {
    imageId: ID
    tenantId: ID!
    updatedAt: String
    uploadedAt: String
    imageUrl: String
    itemId: ID
    menuId: ID
  }

  type FileMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    file: File
  }

  type Menu {
    menuId: ID
    tenantId: ID!
    title: String
    createdAt: String
    updatedAt: String
    published: Boolean
    menuItems: [MenuItem]
    image: File
  }

  type MenuMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    menu: Menu
  }

  type MenuChoice {
    choiceId: ID
    tenantId: ID!
    itemId: ID
    header: String
    description: String
    selections: [MenuSelection]
  }

  type MenuChoiceMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    menuChoice: MenuChoice
  }

  type MenuHeader {
    tenantId: ID
    headerId: ID
    menuId: ID
    name: String
    description: String
    menuItems: [MenuItem]
  }

  type MenuHeaderMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    menuHeader: MenuHeader
  }

  type MenuItem {
    tenantId: ID
    itemId: ID!
    headerId: ID
    menuId: ID
    basePrice: String
    description: String
    name: String
    menuHeader: MenuHeader
    image: File
    menuChoices: [MenuChoice]
  }

  type MenuItemMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    menuItem: MenuItem
  }

  type MenuSelection {
    selectionId: ID
    tenantId: ID!
    choiceId: ID
    itemId: ID
    name: String
    valueAdd: String
    selected: Boolean
  }

  type MenuSelectionMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    menuSelection: MenuSelection
  }

  type Order {
    orderId: ID
    total: Int
    adminId: ID
    customerId: ID
    charge: String
    createdAt: String
    updatedAt: String
    tenantId: ID!
  }

  type OrderMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    order: Order
  }
`
