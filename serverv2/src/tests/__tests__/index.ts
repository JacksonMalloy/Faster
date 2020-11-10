// import 'jest';
import { registerOrganizations, getOrganizationById, getAllOrganizations, setUpTestAccount, setUpTestCustomerAccount } from '../0_organization'
import { registerAdmins, getAdministrators } from '../1_admin'
import { registerCustomers } from '../1_customer'
import { createMenus, setUpTestMenusForTestAccount } from '../2_menu'
import { createMenuHeaders, setUpMenuHeadersForTestAccount } from '../3_menuheader'
import { createMenuItems, createMenuItemsForTestAccount } from '../4_menuitem'
import { createMenuChoices, createMenuChoicesForTestAccount } from '../5_menuchoice'
import { createMenuSelections, createMenuSelectionsForTestAccount } from '../6_menuselection'

describe('sequentially run tests', () => {
  // Organization Tests
  registerOrganizations()
  getOrganizationById()
  getAllOrganizations()

  // Setup Test Accounts
  setUpTestAccount()
  setUpTestCustomerAccount()
  setUpTestMenusForTestAccount()
  setUpMenuHeadersForTestAccount()
  createMenuItemsForTestAccount()
  createMenuChoicesForTestAccount()
  createMenuSelectionsForTestAccount()

  // Administrator Tests
  registerAdmins()
  getAdministrators()

  // // Customer Tests
  registerCustomers()

  // Menu Tests
  createMenus()

  // MenuHeader Tests
  createMenuHeaders()

  // MenuItem Tests
  createMenuItems()

  // MenuChoice Tests
  createMenuChoices()

  // MenuSelection Tests
  createMenuSelections()
})
