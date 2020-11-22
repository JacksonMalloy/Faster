import OrganizationRepository from '../models/organization/repo'
import pool from '../db/config'
import faker from 'faker'
import AdminRepository from '../models/admin/repo'
import CustomerRepository from '../models/customer/repo'
import 'jest';

const adminRepo = new AdminRepository()
const organizationRepo = new OrganizationRepository()
const customerRepo = new CustomerRepository()

export const registerOrganizations = () =>
  describe('Register Organizations', () => {
    it(`Register Organizations`, async () => {
      for (let i = 0; i < 11; i++) {
        const variables = {
          name: faker.company.companyName(),
          address: faker.address.streetAddress(),
          city: faker.address.city(),
          country_region: faker.address.country(),
          phone: faker.phone.phoneNumberFormat(),
          website_url: faker.internet.domainName(),
          postal_code: faker.address.zipCode(),
          sub_address: faker.address.secondaryAddress(),
          province: faker.address.state(),
          pin: faker.random.number(4),
        }

        const result = await organizationRepo.registerOrganization(variables)

        expect(result.organization.name).not.toBeNull()
        expect(result.organization.address).not.toBeNull()
        expect(result.organization.city).not.toBeNull()
        expect(result.organization.country_region).not.toBeNull()
        expect(result.organization.phone).not.toBeNull()
        expect(result.organization.postal_code).not.toBeNull()
        expect(result.organization.province).not.toBeNull()
      }
    })
  })

export const setUpTestAccount = () =>
  describe('Setting up Organization and Test Account', () => {
    it(`Register Test Director Account`, async () => {
      const orgVariables = {
        name: faker.company.companyName(),
        address: faker.address.streetAddress(),
        city: faker.address.city(),
        country_region: faker.address.country(),
        phone: faker.phone.phoneNumberFormat(),
        website_url: faker.internet.domainName(),
        postal_code: faker.address.zipCode(),
        sub_address: faker.address.secondaryAddress(),
        province: faker.address.state(),
      }

      const orgResult = await organizationRepo.registerOrganization(orgVariables)

      const adminVariables = {
        phone: `+16045059772`,
        email: `test@faster.com`,
        name: `Jackson Malloy`,
        password: '123456',
      }

      const adminResult = await adminRepo.registerDirector(adminVariables)

      expect(adminResult.admin.permissions).toEqual('DIRECTOR')
      expect(adminResult.admin.password).not.toEqual(adminVariables.password)

      const connectAdminId = await adminResult.admin.admin_id
      const connectToken = await orgResult.organization.auth_token
      const connectOrgId = await orgResult.organization.organization_id

      const connectVariables = {
        admin_id: connectAdminId,
        organization_id: connectOrgId,
        auth_token: connectToken,
      }

      const connectResult = await adminRepo.registerAdminToOrganization(connectVariables)
      console.log({ connectResult })
    })
  })

export const setUpTestCustomerAccount = () =>
  describe('Setting up Test Customer Account', () => {
    it(`Register Test Director Account`, async () => {
      const customerVariables = {
        phone: '+16045059772',
        pin: '1Q2W',
        email: 'test@faster.com',
        name: 'jackson'
      }

      const customerResult = await customerRepo.registerCustomer(customerVariables)
      console.log({ customerResult })

      expect(customerResult.customer.permissions).toEqual('CUSTOMER')

      // Grab 5 organization ID's
      for (let i = 0; i < 4; i++) {
        const connectVariables = {
          customer_id: customerResult.customer.customer_id,
          organization_id: 1 + i,
        }

        const connectResult = await customerRepo.connectCustomerToOrganization(connectVariables)
        console.log({ connectResult })
      }
    })
  })

export const getOrganizationById = () =>
  describe('Getting organization By ID', () => {
    it('Gets an organization by ID', async () => {
      const result = await organizationRepo.getOrganizationById(1)
      // console.log({ result })

      expect(result.organization_id).toEqual(1)
    })
  })

export const getAllOrganizations = () =>
  describe('Get all organizations', () => {
    it('Gets Organizations', async () => {
      const result = await organizationRepo.getAllOrganizations()

      expect(Array.isArray(result)).toEqual(true)
    })
  })
