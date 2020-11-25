import TenantRepository from '../models/tenant/repo'
import pool from '../db/config'
import faker from 'faker'
import AdminRepository from '../models/admin/repo'
import CustomerRepository from '../models/customer/repo'
import 'jest'

const adminRepo = new AdminRepository()
const tenantRepo = new TenantRepository()
const customerRepo = new CustomerRepository()

export const registerTenants = () =>
  describe('Register Tenants', () => {
    it(`Register Tenants`, async () => {
      for (let i = 0; i < 11; i++) {
        const variables = {
          name: faker.company.companyName(),
          address: faker.address.streetAddress(),
          city: faker.address.city(),
          countryRegion: faker.address.country(),
          phone: faker.phone.phoneNumberFormat(),
          websiteUrl: faker.internet.domainName(),
          postalCode: faker.address.zipCode(),
          subAddress: faker.address.secondaryAddress(),
          province: faker.address.state(),
          pin: faker.random.number(4),
        }

        const result = await tenantRepo.registerTenant(variables)

        expect(result.tenant.name).not.toBeNull()
        expect(result.tenant.address).not.toBeNull()
        expect(result.tenant.city).not.toBeNull()
        expect(result.tenant.countryRegion).not.toBeNull()
        expect(result.tenant.phone).not.toBeNull()
        expect(result.tenant.postalCode).not.toBeNull()
        expect(result.tenant.province).not.toBeNull()
      }
    })
  })

export const setUpTestAccount = () =>
  describe('Setting up Tenant and Test Account', () => {
    it(`Register Test Director Account`, async () => {
      const orgVariables = {
        name: faker.company.companyName(),
        address: faker.address.streetAddress(),
        city: faker.address.city(),
        countryRegion: faker.address.country(),
        phone: faker.phone.phoneNumberFormat(),
        websiteUrl: faker.internet.domainName(),
        postalCode: faker.address.zipCode(),
        subAddress: faker.address.secondaryAddress(),
        province: faker.address.state(),
      }

      const orgResult = await tenantRepo.registerTenant(orgVariables)

      const adminVariables = {
        phone: `+16045059772`,
        email: `test@faster.com`,
        name: `Jackson Malloy`,
        password: '123456',
      }

      const adminResult = await adminRepo.registerDirector(adminVariables)

      expect(adminResult.admin.permissions).toEqual('DIRECTOR')
      expect(adminResult.admin.password).not.toEqual(adminVariables.password)

      const connectAdminId = await adminResult.admin.adminId
      const connectToken = await orgResult.tenant.authToken
      const connectOrgId = await orgResult.tenant.tenantId

      const connectVariables = {
        adminId: connectAdminId,
        tenantId: connectOrgId,
        authToken: connectToken,
      }

      const connectResult = await adminRepo.registerAdminToTenant(connectVariables)
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
        name: 'jackson',
      }

      const customerResult = await customerRepo.registerCustomer(customerVariables)
      console.log({ customerResult })

      expect(customerResult.customer.permissions).toEqual('CUSTOMER')

      // Grab 5 tenant ID's
      for (let i = 0; i < 4; i++) {
        const connectVariables = {
          customerId: customerResult.customer.customerId,
          tenantId: 1 + i,
        }

        const connectResult = await customerRepo.connectCustomerToTenant(connectVariables)
        console.log({ connectResult })
      }
    })
  })

export const getTenantById = () =>
  describe('Getting tenant By ID', () => {
    it('Gets an tenant by ID', async () => {
      const result = await tenantRepo.getTenantById(1)
      // console.log({ result })

      expect(result.tenantId).toEqual(1)
    })
  })

export const getAllTenants = () =>
  describe('Get all tenants', () => {
    it('Gets Tenants', async () => {
      const result = await tenantRepo.getAllTenants()

      expect(Array.isArray(result)).toEqual(true)
    })
  })
