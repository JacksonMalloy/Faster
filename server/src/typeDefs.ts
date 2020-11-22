import { gql } from 'apollo-server'

export const typeDefs = gql`
  scalar Upload

  type Subscription {
    orderCreated(organization_id: ID!): Order
    # orderArchived(order_id: ID!): Order
  }

  type Query {
    admin(admin_id: ID!): Admin
    adminsByOrganization(organization_id: ID!): [Admin]
    customer(customer_id: ID!): Customer
    customersByOrganization(organization_id: ID!): [Customer]
    organization(organization_id: ID!): Organization
    organizationByAccessCode(access_code: String!): Organization
    organizations: [Organization]
    menu(menu_id: ID!): Menu
    menusByOrganization(organization_id: ID!): [Menu]

    # TODO
    searchMenus(organization_id: ID!, search_query: String): [Menu]

    menuItem(menu_item_id: ID!): MenuItem
    menuItemsByOrganization(organization_id: ID!): [MenuItem]
    menuItemsByMenu(menu_id: ID!): [MenuItem]
    menuChoice(menu_choice_id: ID!): MenuChoice
    menuChoicesByOrganization(organization_id: ID!): [MenuChoice]
    menuSelection(menu_selection_id: ID!): MenuSelection
    menuSelectionsByMenuItem(menu_item_id: ID!): [MenuSelection]
    menuSelectionsByOrganization(organization_id: ID!): [MenuSelection]
    menuSelectionsByMenuChoice(menu_choice_id: ID!): [MenuSelection]
    menuHeader(menu_header_id: ID!): MenuHeader
    menuHeadersByMenu(menu_id: ID!): [MenuHeader]
    activeUserAdmin: Admin
    activeUserCustomer: Customer
    imagesByOrganization(organization_id: ID!): [File]
    imageByMenu(menu_id: ID!): File
    imageById(image_id: ID!): File
    imageByMenuItem(menu_item_id: ID!): File
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
    createOrganization(
      name: String
      address: String
      city: String
      country_region: String
      phone: String
      website_url: String
      postal_code: String
      sub_address: String
      province: String
    ): OrganizationMutationResponse
    addMenu(organization_id: ID!, title: String!): MenuMutationResponse
    addMenuItem(
      menu_id: ID!
      menu_header_id: ID
      base_price: String!
      description: String
      name: String!
    ): MenuItemMutationResponse
    addMenuHeader(menu_id: ID!, name: String!, sub_header: String): MenuHeaderMutationResponse
    addMenuChoice(organization_id: ID!, header: String!, sub_header: String): MenuChoiceMutationResponse
    # May remove menu_item_id, check first
    addMenuSelection(
      organization_id: ID!
      menu_item_id: ID
      name: String!
      value_add: String
    ): MenuSelectionMutationResponse

    uploadImage(file: Upload!, menu_item_id: ID, menu_id: ID, organization_id: ID!, organization_name: String!): File

    createOrder(admin_id: ID, customer_id: ID, total: Int, charge: String, organization_id: ID!): OrderMutationResponse

    # EDIT
    editOrganization(
      organization_id: ID!
      name: String
      address: String
      city: String
      country_region: String
      phone: String
      website_url: String
      postal_code: String
      sub_address: String
      province: String
    ): OrganizationMutationResponse
    editMenu(menu_id: ID!, title: String, published: Boolean): MenuMutationResponse
    editMenuItem(
      menu_item_id: ID!
      menu_id: ID
      menu_header_id: ID
      base_price: String
      description: String
      name: String
    ): MenuItemMutationResponse
    editMenuHeader(menu_header_id: ID!, menu_id: ID, name: String, sub_header: String): MenuHeaderMutationResponse
    editMenuChoice(menu_choice_id: ID!, header: String, sub_header: String): MenuChoiceMutationResponse
    editMenuSelection(menu_selection_id: ID!, name: String, value_add: String): MenuSelectionMutationResponse

    # DELETE
    removeOrganization(organization_id: ID!): OrganizationMutationResponse
    removeAdmin(admin_id: ID!): AdminMutationResponse
    removeCustomer(customer_id: ID!): CustomerMutationResponse
    removeMenu(menu_id: ID!): MenuMutationResponse
    removeMenuItem(menu_item_id: ID!): MenuItemMutationResponse
    removeMenuHeader(menu_header_id: ID!): MenuHeaderMutationResponse
    removeMenuChoice(menu_choice_id: ID!): MenuChoiceMutationResponse
    removeMenuSelection(menu_selection_id: ID!): MenuSelectionMutationResponse
    deleteImage(image_id: ID!): FileMutationResponse

    # CONNECT
    joinAdminToOrganization(
      admin_id: ID!
      organization_id: ID!
      auth_token: String!
    ): AdminToOrganizationConnectionResponse
    joinCustomerToOrganization(customer_id: ID!, organization_id: ID!): CustomerToOrganizationConnectionResponse

    connectMenuChoicesToMenuItem(menu_choice_ids: [ID], menu_item_id: ID!): MenuChoicesToMenuItemConnectionResponse
    removeMenuChoicesMenuItemsConnection(
      menu_choice_ids: [ID]
      menu_item_id: ID!
    ): MenuChoicesToMenuItemConnectionResponse

    connectMenuSelectionsToMenuChoice(
      menu_selection_ids: [ID]
      menu_choice_id: ID!
    ): MenuSelectionsToMenuChoicesConnectionResponse
    removeMenuSelectionsMenuChoicesConnection(
      menu_selection_ids: [ID]
      menu_choice_id: ID!
    ): MenuSelectionsToMenuChoicesConnectionResponse

    # TODO
    connectImageToMenu(image_id: ID!, menu_id: ID!): ImageMenuConnectionResponse
    connectImageToMenuItem(image_id: ID!, menu_item_id: ID!): ImageMenuItemConnectionResponse
  }

  # CONNECTIONS

  type ImageMenuItem {
    menu_item_id: ID!
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
    menu_choice_id: ID!
    menu_item_id: ID!
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
    menu_choice_id: ID!
    menu_selection_id: ID!
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

  type AdminToOrganization {
    admin_id: ID!
    organization_id: ID!
  }

  type AdminToOrganizationConnection {
    connect: [AdminToOrganization]
  }

  type AdminToOrganizationConnectionResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    connection: AdminToOrganizationConnection
  }

  type CustomerToOrganization {
    customer_id: ID!
    organization_id: ID!
  }

  type CustomerToOrganizationConnection {
    connect: [CustomerToOrganization]
  }

  type CustomerToOrganizationConnectionResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    connection: CustomerToOrganizationConnection
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

  type Organization {
    organization_id: ID
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

  type OrganizationMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    organization: Organization
  }

  type Admin {
    admin_id: ID
    organization_id: ID
    phone: String
    email: String
    name: String
    permissions: String
    created_at: String
    token: String
    organization: Organization
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
    organizations: [Organization]

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
    organization_id: ID!
    updated_at: String
    uploaded_at: String
    image_url: String
    menu_item_id: ID
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
    organization_id: ID!
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
    menu_choice_id: ID
    organization_id: ID!
    menu_item_id: ID
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
    organization_id: ID
    menu_header_id: ID
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
    organization_id: ID
    menu_item_id: ID!
    menu_header_id: ID
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
    menu_selection_id: ID
    organization_id: ID!
    menu_choice_id: ID
    menu_item_id: ID
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
    organization_id: ID!
  }

  type OrderMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    order: Order
  }
`
