import MenuRepository from '../models/menu/repo'
import pool from '../db/config'
import faker from 'faker'

const menuRepo = new MenuRepository()

export const createMenus = () =>
  describe('Create Menus', () => {
    it(`Create Menus`, async () => {
      for (let i = 0; i < 50; i++) {
        const variables = {
          tenant_id: faker.random.number({ max: 10, min: 1 }),
          title: faker.random.word(),
        }

        const result = await menuRepo.createMenu(variables)

        expect(result.menu.tenant_id).not.toBeNull()
        expect(result.menu.title).not.toBeNull()
      }
    })
  })

export const setUpTestMenusForTestAccount = () =>
  describe('Create Test Account Menus', () => {
    it(`Create Menus`, async () => {
      for (let i = 0; i < 10; i++) {
        const variables = {
          tenant_id: 12,
          title: faker.random.word(),
        }

        const result = await menuRepo.createMenu(variables)

        expect(result.menu.tenant_id).not.toBeNull()
        expect(result.menu.title).not.toBeNull()
      }
    })
  })
