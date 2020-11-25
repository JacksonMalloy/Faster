import MenuChoiceRepository from '../models/menuchoice/repo'
import faker from 'faker'

const menuChoiceRepo = new MenuChoiceRepository()

export const createMenuChoices = () =>
  describe('Create Menu Choices', () => {
    it(`Create Menu Choices`, async () => {
      for (let i = 0; i < 300; i++) {
        const variables = {
          tenantId: faker.random.number({ max: 10, min: 1 }),
          header: faker.random.word(),
          description: faker.random.words(6),
        }

        const result = await menuChoiceRepo.createMenuChoice(variables)

        expect(result.menuChoice.tenantId).not.toBeNull()
        expect(result.menuChoice.header).not.toBeNull()
      }
    })
  })

export const createMenuChoicesForTestAccount = () =>
  describe('Create Menu Choices For Test Account', () => {
    it(`Create Menu Choices`, async () => {
      for (let i = 0; i < 40; i++) {
        const variables = {
          tenantId: 12,
          header: faker.random.word(),
          description: faker.random.words(6),
        }

        const result = await menuChoiceRepo.createMenuChoice(variables)

        expect(result.menuChoice.tenantId).not.toBeNull()
        expect(result.menuChoice.header).not.toBeNull()
      }
    })
  })
