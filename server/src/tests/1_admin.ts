import AdminRepository from '../models/admin/repo'
import pool from '../db/config'
import faker from 'faker'

const adminRepo = new AdminRepository()

export const registerAdmins = () =>
  describe('Register Administrators', () => {
    it(`Register Director Account`, async () => {
      const variables = {
        phone: faker.phone.phoneNumberFormat(),
        email: faker.internet.email(),
        name: faker.name.findName(),
        password: '123456',
      }
      const result = await adminRepo.registerDirector(variables)

      expect(result.admin.permissions).toEqual('DIRECTOR')
      expect(result.admin.password).not.toEqual(variables.password)
    })

    it(`Register Administrator Accounts`, async () => {
      for (let i = 0; i < 10; i++) {
        const variables = {
          phone: faker.phone.phoneNumberFormat(),
          email: faker.internet.email(),
          name: faker.name.findName(),
          password: '123456',
        }

        const result = await adminRepo.registerAdmin(variables)

        expect(result.admin.permissions).toEqual('ADMIN')
        expect(result.admin.password).not.toEqual(variables.password)
      }
    })
  })

export const getAdministrators = () =>
  describe('Getting Administrators', () => {
    it('Gets an administrator', async () => {
      const result = await adminRepo.getAdminById(5)

      expect(result.adminId).toEqual(5)
      expect(result.permissions).toEqual('ADMIN')
    })
  })
