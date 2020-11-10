import styled from 'styled-components'

// Common Components
import { Button } from 'components/common/Button'

// Components
import DropdownSelectChoices from 'components/Menu/choice/DropdownSelectChoices'
import DropdownSelectSelections from 'components/Menu/selection/DropdownSelectSelections'

// GraphQL
import { useQuery } from '@apollo/client'
import { MENU_CHOICES_BY_ORGANIZATION } from 'graphql/queries/menu-choice/menuChoiceByOrganization'
import { useUI } from 'components/Context'

const StyledChoice = styled.div`
  display: flex;
  justify-content: right;
  flex-direction: column;
  position: relative;
  margin: 1rem;
  padding: 1rem 0;
  border-radius: 0.5rem;
  border: 2px #f5f5f5 solid;
`

export const ChoiceGroup = ({ selectionData }) => {
  const { organizationId, formAddOns } = useUI()

  const { data: choicesData, loading, error } = useQuery(MENU_CHOICES_BY_ORGANIZATION, {
    variables: { organization_id: organizationId },
    fetchPolicy: 'cache-first',
  })

  const handleClick = (choice, id) => {
    console.log('click')
    // dispatch(removeChoiceGroup(choice))
    // dispatch(bulkRemoveChoices(id))
    // dispatch(bulkRemoveSelections(id))
  }

  return (
    <>
      {formAddOns &&
        formAddOns.map((choice) => {
          return (
            <StyledChoice key={choice.id}>
              <span>
                <Button onClick={() => handleClick(choice, choice.id)}>&times;</Button>
              </span>
              {choicesData && choicesData.menuChoicesByOrganization && (
                <DropdownSelectChoices
                  items={choicesData.menuChoicesByOrganization}
                  title="Select one"
                  label={'Choices'}
                  multiSelect={false}
                  id={choice.id}
                />
              )}

              {selectionData && selectionData.menuSelectionsByOrganization && (
                <DropdownSelectSelections
                  items={selectionData.menuSelectionsByOrganization}
                  title="You can select more than one"
                  label={'Selections'}
                  multiSelect={true}
                  id={choice.id}
                />
              )}
            </StyledChoice>
          )
        })}
    </>
  )
}
