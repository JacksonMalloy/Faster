import { addChoiceGroup, removeChoiceGroup } from './userActions'

// CHOICES
export const choiceGroupDeleted = () => {
  return removeChoiceGroup({
    type: 'CHOICE_DELETED',
    message: `Choice Deleted`,
  })
}

export const choiceGroupCreated = () => {
  return addChoiceGroup({
    type: 'CHOICE_CREATED',
    message: `Choice Created`,
  })
}
