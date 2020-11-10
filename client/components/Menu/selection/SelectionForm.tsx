import styled from 'styled-components'

// Common Components
import { Button } from 'components/common/Button'
import Field from 'components/common/Field'
import { CurrencyField } from 'components/common/CurrencyField'

// Components
import useForm from 'components/common/hooks/useForm'
import { useUI } from 'components/Context'

const StyledCreateMenuForm = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 2rem;
  width: 550px;
`

const StyledButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 1rem;
`

const SelectionForm = ({ menu_id, toggle, selectionData }) => {
  // const [addMenuItem, { data }] = useMutation(addMenuItemMutation)

  const { formSelections } = useUI()

  const { values, errors, handleChange, handleBlur, handleSubmit } = useForm({
    onSubmit: async ({ errors, values }) => {
      console.log(values)
      // const header = event.currentTarget.elements.menuHeader.value
      // const subHeader = event.currentTarget.elements.menuSubHeader.value

      // addMenuHeader({
      //   variables: { name: header, sub_header: subHeader, menu_id: menu_id },
      //   update: (store, { data }) => {
      //     const menuHeaderData = store.readQuery({
      //       query: MENU_HEADERS_BY_MENU,
      //       variables: { menu_id: menu_id },
      //     })

      //     store.writeQuery({
      //       query: MENU_HEADERS_BY_MENU,
      //       variables: { menu_id: menu_id },
      //       data: {
      //         menuHeadersByMenu: [
      //           ...menuHeaderData.menuHeadersByMenu,
      //           data.addMenuHeader,
      //         ],
      //       },
      //     })
      //   },
      // })
    },
  })

  const cancel = (event) => {
    console.log(`clicked`)
    event.preventDefault()
    // dispatch(updateFormPhase('menu-item'))
  }

  return (
    <StyledCreateMenuForm onSubmit={handleSubmit}>
      <Field
        id="name"
        name="name"
        required
        label="Selection Name"
        placeholder=""
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.name}
        error={errors.name}
      />
      <CurrencyField
        placeholder="$0.00"
        type="text"
        label="Added Value"
        id="value"
        name="value"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.value}
        error={errors.value}
      />

      <StyledButtonContainer>
        <Button onClick={cancel} type="button">
          Cancel
        </Button>
        <Button>Save</Button>
      </StyledButtonContainer>
    </StyledCreateMenuForm>
  )
}

export default SelectionForm
