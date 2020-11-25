import MenuHeaderRepository from '../models/menuheader/repo'
import faker from 'faker'

const menuHeaderRepo = new MenuHeaderRepository()

export const createMenuHeaders = () =>
  describe('Create Menu Headers', () => {
    it(`Create Menu Headers`, async () => {
      for (let i = 0; i < 200; i++) {
        const variables = {
          menuId: faker.random.number({ max: 50, min: 1 }),
          name: faker.random.word(),
          description: faker.random.words(7),
        }

        const result = await menuHeaderRepo.createMenuHeader(variables)

        expect(result.menuHeader.menuId).not.toBeNull()
        expect(result.menuHeader.name).not.toBeNull()
      }
    })
  })

export const setUpMenuHeadersForTestAccount = () =>
  describe('Create Menu Headers For Test Account', () => {
    it(`Create Menu Headers`, async () => {
      for (let i = 0; i < 25; i++) {
        const variables = {
          menuId: faker.random.number({ max: 10, min: 1 }),
          name: faker.random.word(),
          description: faker.random.words(7),
        }

        const result = await menuHeaderRepo.createMenuHeader(variables)

        expect(result.menuHeader.menuId).not.toBeNull()
        expect(result.menuHeader.name).not.toBeNull()
      }
    })
  })
