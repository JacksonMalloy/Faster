import styled from 'styled-components'

// Common Components
import { Button } from 'components/common/Button'

// GraphQL
import { useQuery } from '@apollo/client'
import { MENU_CHOICES_BY_ORGANIZATION } from 'graphql/queries/menu-choice/menuChoiceByOrganization'
import { useUI } from 'components/Context'
import DropDownSelect from './DropdownSelect'

const StyledAddOn = styled.div`
  display: flex;
  justify-content: right;
  flex-direction: column;
  position: relative;
  margin: 1rem;
  padding: 1rem 0;
  border-radius: 0.5rem;
  border: 2px #f5f5f5 solid;

  span {
    display: flex;
    padding: 0rem 1rem;
  }
`

export const AddOn = ({ selectionData }) => {
  const { organizationId, formAddOns, removeFormAddOn, bulkRemoveFormChoices, bulkRemoveFormSelections } = useUI()

  const { data: choicesData, loading, error } = useQuery(MENU_CHOICES_BY_ORGANIZATION, {
    variables: { organization_id: organizationId },
    fetchPolicy: 'cache-first',
  })

  const handleClick = (choice) => {
    const { UUID } = choice
    bulkRemoveFormChoices(UUID)
    removeFormAddOn(UUID)
    bulkRemoveFormSelections(UUID)
  }

  return (
    formAddOns &&
    formAddOns.map((choice) => {
      return (
        <StyledAddOn key={choice.UUID}>
          <span>
            <Button onClick={() => handleClick(choice)} type="button" value="close">
              &times;
            </Button>
          </span>
          {choicesData && choicesData.menuChoicesByOrganization && (
            <DropDownSelect
              items={choicesData.menuChoicesByOrganization}
              title="Select one"
              label={'Choices'}
              UUID={choice.UUID}
              variant="CHOICE"
            />
          )}

          {selectionData && selectionData.menuSelectionsByOrganization && (
            <DropDownSelect
              items={selectionData.menuSelectionsByOrganization}
              title="You can select more than one"
              label={'Selections'}
              multiSelect
              UUID={choice.UUID}
              variant="SELECTION"
            />
          )}
        </StyledAddOn>
      )
    })
  )
}
