import MenuSelectionRepository from '../models/menuselection/repo'
import faker from 'faker'

const menuSelectionRepo = new MenuSelectionRepository()

export const createMenuSelections = () =>
  describe('Create Menu Selections', () => {
    it(`Create Menu Selections`, async () => {
      for (let i = 0; i < 1000; i++) {
        const variables = {
          tenant_id: faker.random.number({ max: 10, min: 1 }),
          item_id: faker.random.number({ max: 500, min: 1 }),
          name: faker.random.word(),
          value_add: faker.commerce.price(5, 1),
        }

        const result = await menuSelectionRepo.createMenuSelection(variables)

        expect(result.menu_selection.tenant_id).not.toBeNull()
        expect(result.menu_selection.header).not.toBeNull()
      }
    })
  })

export const createMenuSelectionsForTestAccount = () =>
  describe('Create Menu Selections For Test Account', () => {
    it(`Create Menu Selections`, async () => {
      for (let i = 0; i < 100; i++) {
        const variables = {
          tenant_id: 12,
          item_id: faker.random.number({ max: 40, min: 1 }),
          name: faker.random.word(),
          value_add: faker.commerce.price(5, 1),
        }

        const result = await menuSelectionRepo.createMenuSelection(variables)

        expect(result.menu_selection.tenant_id).not.toBeNull()
        expect(result.menu_selection.header).not.toBeNull()
      }
    })
  })
