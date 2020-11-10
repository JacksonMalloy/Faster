import styled from 'styled-components'

// Common Components
import { Button } from 'components/common/Button'
import Field from 'components/common/Field'
import useForm from 'components/common/hooks/useForm'

// GraphQL
import { useMutation } from '@apollo/client'
import { ADD_MENU_CHOICE } from 'graphql/mutations/menu-choice/addMenuChoice'

// Components
import DropdownSubheaderChoices from './DropdownSubheaderChoices'
import { useUI } from 'components/Context'

const StyledCreateMenuForm = styled.form`
  display: flex;
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

const choiceTypes = [
  {
    id: 0,
    title: 'Choose two',
    selected: false,
  },
  {
    id: 1,
    title: 'Choose three',
    selected: false,
  },
  {
    id: 2,
    title: 'Choose four',
    selected: false,
  },
  {
    id: 3,
    title: 'Choose up to two',
    selected: false,
  },
  {
    id: 4,
    title: 'Choose up to three',
    selected: false,
  },
  {
    id: 5,
    title: 'Choose up to four',
    selected: false,
  },
  {
    id: 6,
    title: 'Choose one',
    selected: false,
  },
  {
    id: 7,
    title: 'Choose exactly two',
    selected: false,
  },
  {
    id: 8,
    title: 'Choose exactly three',
    selected: false,
  },
  {
    id: 9,
    title: 'Choose exactly four',
    selected: false,
  },
  {
    id: 10,
    title: 'Choose exactly five',
    selected: false,
  },
  {
    id: 11,
    title: 'Choose as many as you would like',
    selected: false,
  },
  {
    id: 12,
    title: 'Choose at least two',
    selected: false,
  },
  {
    id: 13,
    title: 'Choose at least three',
    selected: false,
  },
  {
    id: 14,
    title: 'Choose at least four',
    selected: false,
  },
]

const ChoiceForm = ({ menu_id }) => {
  const [addMenuChoice, { data }] = useMutation(ADD_MENU_CHOICE)

  const { organizationId, formChoices } = useUI()

  const { values, errors, handleChange, handleBlur, handleSubmit } = useForm({
    onSubmit: async ({ errors, values }) => {
      //console.log(values)
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

  const handleCancel = (event) => {
    event.preventDefault()
  }

  return (
    <StyledCreateMenuForm onSubmit={handleSubmit}>
      <Field
        id="title"
        name="title"
        required
        label="Choice Header"
        placeholder={'Ex. Drink Menu'}
        value={values.title}
        error={errors.title}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <DropdownSubheaderChoices title="Choice Type" items={choiceTypes} label="Type of Choice" />
      <StyledButtonContainer>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button>Create</Button>
      </StyledButtonContainer>
    </StyledCreateMenuForm>
  )
}

export default ChoiceForm
