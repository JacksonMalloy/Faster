import { gql } from 'apollo-server'

export const typeDefs = gql`
  scalar Upload

  type Subscription {
    orderCreated(tenant_id: ID!): Order
    # orderArchived(order_id: ID!): Order
  }

  type Query {
    admin(admin_id: ID!): Admin
    adminsByTenant(tenant_id: ID!): [Admin]
    customer(customer_id: ID!): Customer
    customersByTenant(tenant_id: ID!): [Customer]
    tenant(tenant_id: ID!): Tenant
    tenantByAccessCode(access_code: String!): Tenant
    tenants: [Tenant]
    menu(menu_id: ID!): Menu
    menusByTenant(tenant_id: ID!): [Menu]

    # TODO
    searchMenus(tenant_id: ID!, search_query: String): [Menu]

    menuItem(item_id: ID!): MenuItem
    menuItemsByTenant(tenant_id: ID!): [MenuItem]
    menuItemsByMenu(menu_id: ID!): [MenuItem]
    menuChoice(choice_id: ID!): MenuChoice
    menuChoicesByTenant(tenant_id: ID!): [MenuChoice]
    menuSelection(selection_id: ID!): MenuSelection
    menuSelectionsByMenuItem(item_id: ID!): [MenuSelection]
    menuSelectionsByTenant(tenant_id: ID!): [MenuSelection]
    menuSelectionsByMenuChoice(choice_id: ID!): [MenuSelection]
    menuHeader(header_id: ID!): MenuHeader
    menuHeadersByMenu(menu_id: ID!): [MenuHeader]
    activeUserAdmin: Admin
    activeUserCustomer: Customer
    imagesByTenant(tenant_id: ID!): [File]
    imageByMenu(menu_id: ID!): File
    imageById(image_id: ID!): File
    imageByMenuItem(item_id: ID!): File
  }

  interface MutationResponse {
    code: String!
    success: Boolean!
    message: String!
  }

  type Mutation {
    createStripeAccount(email: String!): Stripe
    connectStripeAccount(account_id: ID!, account_type: String!): Stripe

    sendMessage(phone: String!, customer_id: ID!): Twilio

    resetPassword(email: String!): AdminMutationResponse

    signupAdmin(phone: String!, email: String!, name: String!, password: String!): AdminMutationResponse
    signupDirector(phone: String!, email: String!, name: String!, password: String!): AdminMutationResponse
    signupCustomer(phone: String, email: String, name: String!): CustomerMutationResponse
    signinAdmin(email: String!, password: String!): AdminMutationResponse
    signinCustomer(email: String, phone: String, pin: String!): CustomerMutationResponse

    # CREATE
    createTenant(
      name: String
      address: String
      city: String
      country_region: String
      phone: String
      website_url: String
      postal_code: String
      sub_address: String
      province: String
    ): TenantMutationResponse
    addMenu(tenant_id: ID!, title: String!): MenuMutationResponse
    addMenuItem(
      menu_id: ID!
      header_id: ID
      base_price: String!
      description: String
      name: String!
    ): MenuItemMutationResponse
    addMenuHeader(menu_id: ID!, name: String!, sub_header: String): MenuHeaderMutationResponse
    addMenuChoice(tenant_id: ID!, header: String!, sub_header: String): MenuChoiceMutationResponse
    # May remove item_id, check first
    addMenuSelection(tenant_id: ID!, item_id: ID, name: String!, value_add: String): MenuSelectionMutationResponse

    uploadImage(file: Upload!, item_id: ID, menu_id: ID, tenant_id: ID!, tenant_name: String!): File

    createOrder(admin_id: ID, customer_id: ID, total: Int, charge: String, tenant_id: ID!): OrderMutationResponse

    # EDIT
    editTenant(
      tenant_id: ID!
      name: String
      address: String
      city: String
      country_region: String
      phone: String
      website_url: String
      postal_code: String
      sub_address: String
      province: String
    ): TenantMutationResponse
    editMenu(menu_id: ID!, title: String, published: Boolean): MenuMutationResponse
    editMenuItem(
      item_id: ID!
      menu_id: ID
      header_id: ID
      base_price: String
      description: String
      name: String
    ): MenuItemMutationResponse
    editMenuHeader(header_id: ID!, menu_id: ID, name: String, sub_header: String): MenuHeaderMutationResponse
    editMenuChoice(choice_id: ID!, header: String, sub_header: String): MenuChoiceMutationResponse
    editMenuSelection(selection_id: ID!, name: String, value_add: String): MenuSelectionMutationResponse

    # DELETE
    removeTenant(tenant_id: ID!): TenantMutationResponse
    removeAdmin(admin_id: ID!): AdminMutationResponse
    removeCustomer(customer_id: ID!): CustomerMutationResponse
    removeMenu(menu_id: ID!): MenuMutationResponse
    removeMenuItem(item_id: ID!): MenuItemMutationResponse
    removeMenuHeader(header_id: ID!): MenuHeaderMutationResponse
    removeMenuChoice(choice_id: ID!): MenuChoiceMutationResponse
    removeMenuSelection(selection_id: ID!): MenuSelectionMutationResponse
    deleteImage(image_id: ID!): FileMutationResponse

    # CONNECT
    joinAdminToTenant(admin_id: ID!, tenant_id: ID!, auth_token: String!): AdminToTenantConnectionResponse
    joinCustomerToTenant(customer_id: ID!, tenant_id: ID!): CustomerToTenantConnectionResponse

    connectMenuChoicesToMenuItem(choice_ids: [ID], item_id: ID!): MenuChoicesToMenuItemConnectionResponse
    removeMenuChoicesMenuItemsConnection(choice_ids: [ID], item_id: ID!): MenuChoicesToMenuItemConnectionResponse

    connectMenuSelectionsToMenuChoice(
      selection_ids: [ID]
      choice_id: ID!
    ): MenuSelectionsToMenuChoicesConnectionResponse
    removeMenuSelectionsMenuChoicesConnection(
      selection_ids: [ID]
      choice_id: ID!
    ): MenuSelectionsToMenuChoicesConnectionResponse

    # TODO
    connectImageToMenu(image_id: ID!, menu_id: ID!): ImageMenuConnectionResponse
    connectImageToMenuItem(image_id: ID!, item_id: ID!): ImageMenuItemConnectionResponse
  }

  # CONNECTIONS

  type ImageMenuItem {
    item_id: ID!
    image_id: ID!
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
    menu_id: ID!
    image_id: ID!
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
    choice_id: ID!
    item_id: ID!
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
    choice_id: ID!
    selection_id: ID!
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
    admin_id: ID!
    tenant_id: ID!
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
    customer_id: ID!
    tenant_id: ID!
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
    account_id: ID
  }

  type Tenant {
    tenant_id: ID
    name: String
    address: String
    city: String
    access_code: String
    country_region: String
    phone: String
    website_url: String
    postal_code: String
    sub_address: String
    province: String
    auth_token: String
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
    admin_id: ID
    tenant_id: ID
    phone: String
    email: String
    name: String
    permissions: String
    created_at: String
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
    customer_id: ID
    phone: String
    email: String
    name: String
    permissions: String
    created_at: String
    token: String
    tenants: [Tenant]

    # TODO
    table_id: String
  }

  type CustomerMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    customer: Customer
  }

  type File {
    image_id: ID
    tenant_id: ID!
    updated_at: String
    uploaded_at: String
    image_url: String
    item_id: ID
    menu_id: ID
  }

  type FileMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    file: File
  }

  type Menu {
    menu_id: ID
    tenant_id: ID!
    title: String
    created_at: String
    updated_at: String
    published: Boolean
    menu_items: [MenuItem]
    image: File
  }

  type MenuMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    menu: Menu
  }

  type MenuChoice {
    choice_id: ID
    tenant_id: ID!
    item_id: ID
    header: String
    sub_header: String
    selections: [MenuSelection]
  }

  type MenuChoiceMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    menu_choice: MenuChoice
  }

  type MenuHeader {
    tenant_id: ID
    header_id: ID
    menu_id: ID
    name: String
    sub_header: String
    menu_items: [MenuItem]
  }

  type MenuHeaderMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    menu_header: MenuHeader
  }

  type MenuItem {
    tenant_id: ID
    item_id: ID!
    header_id: ID
    menu_id: ID
    base_price: String
    description: String
    name: String
    menu_header: MenuHeader
    image: File
    menu_choices: [MenuChoice]
  }

  type MenuItemMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    menu_item: MenuItem
  }

  type MenuSelection {
    selection_id: ID
    tenant_id: ID!
    choice_id: ID
    item_id: ID
    name: String
    value_add: String
    selected: Boolean
  }

  type MenuSelectionMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    menu_selection: MenuSelection
  }

  type Order {
    order_id: ID
    total: Int
    admin_id: ID
    customer_id: ID
    charge: String
    created_at: String
    updated_at: String
    tenant_id: ID!
  }

  type OrderMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    order: Order
  }
`
