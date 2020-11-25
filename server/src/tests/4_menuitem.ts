import MenuItemRepository from '../models/menuitem/repo'
import faker from 'faker'

const menuItemRepo = new MenuItemRepository()

export const createMenuItems = () =>
  describe('Create Menu Items', () => {
    it(`Create Menu Items`, async () => {
      for (let i = 0; i < 500; i++) {
        const variables = {
          menuId: faker.random.number({ max: 50, min: 1 }),
          headerId: null,
          basePrice: faker.finance.amount(1, 12),
          description: faker.random.words(),
          name: faker.random.word(),
        }

        const result = await menuItemRepo.createMenuItem(variables)

        expect(result.menuItem.menuId).not.toBeNull()
        expect(result.menuItem.name).not.toBeNull()
      }
    })
  })

export const createMenuItemsForTestAccount = () =>
  describe('Create Menu Items For Test Account', () => {
    it(`Create Menu Items`, async () => {
      for (let i = 0; i < 200; i++) {
        const variables = {
          menuId: faker.random.number({ max: 10, min: 1 }),
          headerId: null,
          basePrice: faker.finance.amount(1, 12),
          description: faker.random.words(),
          name: faker.random.word(),
        }

        const result = await menuItemRepo.createMenuItem(variables)

        expect(result.menuItem.menuId).not.toBeNull()
        expect(result.menuItem.name).not.toBeNull()
      }
    })
  })
