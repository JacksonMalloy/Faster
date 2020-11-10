import { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'

// Global State
import UserContext from 'stores/UserContext'
import { choiceGroupCreated } from 'stores/choiceActions'
import { addHeader, reset, addChoice, addSelection } from 'stores/userActions'

// Common Components
import UploadFile from 'components/UploadFile'
import Field from 'components/common/Field'
import { Button } from 'components/common/Button'
import { CurrencyField } from 'components/common/CurrencyField'

// Components
import DropdownSelectHeader from 'components/Menu/header/DropdownSelectHeaders'
import { ChoiceGroup } from 'components/Menu/choice/ChoiceGroup'

type ItemFormProps = {
  handleBlur: any
  handleChange: any
  handleSubmit: any
  values: any
  errors: any
  headerData: any
  selectionData: any
  item: any
  setIsOpen: (b: boolean) => void
  organization_id: number
}

export const ItemForm = ({
  handleBlur,
  handleChange,
  handleSubmit,
  values,
  errors,
  headerData,
  selectionData,

  // Determines EDIT / CREATE
  item,

  setIsOpen,
  organization_id,
}: ItemFormProps) => {
  const [state, dispatch] = useContext(UserContext)
  const [hasTriggered, setHasTriggered] = useState(false)

  const handleChoice = () => {
    dispatch(choiceGroupCreated())
  }

  const handleCancel = () => {
    setIsOpen(false)
    dispatch(reset())
  }

  useEffect(() => {
    // Populate Header Data
    if (item && item.menu_header) {
      // console.log('dispatching header to state')
      dispatch(addHeader(item.menu_header))
    }

    if (item && item.menu_choices) {
      let i = 1

      let placeholderDataArray = [...item.menu_choices]

      // console.log({ placeholderDataArray })

      for (let key of item.menu_choices) {
        dispatch(choiceGroupCreated())
        placeholderDataArray.pop()

        console.info(`CREATE ${i++} CHOICE GROUP(s)`)

        if (placeholderDataArray.length === 0) {
          // console.log('BREAK!')
          setHasTriggered(true)
          break
        }
      }
    }
  }, [])

  useEffect(() => {
    if (item && item.menu_choices) {
      const { choiceGroups } = state
      const { menu_choices } = item

      // console.log({ choiceGroups })
      // console.log({ menu_choices })
      // console.log({ state })

      const isArrayEqualLength = menu_choices.length === choiceGroups.length

      // console.log({ isArrayEqualLength })

      let mergedArray = []

      // Merge group ID with choice
      if (isArrayEqualLength) {
        for (let index = 0; index < choiceGroups.length; index++) {
          mergedArray.push({
            ...choiceGroups[index],
            ...menu_choices[index],
          })
        }

        // Populate Choices and Selections in assigned group
        for (let choice of mergedArray) {
          dispatch(addChoice(choice, choice.id))

          const { selections } = choice

          selections.forEach((selection: any) => {
            const { id } = choice
            const newKey = { ...selection, id }
            dispatch(addSelection(newKey, id))
          })
        }
      }
    }
  }, [dispatch, hasTriggered, item, state])

  // useEffect(() => {
  //   console.log({ state })
  // })

  return (
    <>
      {/* EDIT */}
      {item ? (
        <StyledCreateMenuForm onSubmit={handleSubmit}>
          <section>
            <Field
              id="title"
              name="title"
              type="name"
              required
              label="Item Title"
              placeholder=""
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.title}
              error={errors.title}
            />
            <Field
              id="description"
              name="description"
              type="textarea"
              label="Item Description"
              placeholder=""
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.description}
              error={errors.description}
            />

            <CurrencyField
              placeholder="$0.00"
              type="text"
              label="Item Price"
              id="price"
              name="price"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.price}
              error={errors.price}
            />
            <StyledMenuImage>
              <StyledLabel>Item Image (Optional)</StyledLabel>
              <UploadFile image={item.image} />
            </StyledMenuImage>
          </section>
          <section className="ptop">
            {headerData && headerData.menuHeadersByMenu && (
              <DropdownSelectHeader
                items={headerData.menuHeadersByMenu}
                title="Select a value"
                label={'Choose the header for the item'}
                multiSelect={false}
              />
            )}

            <ChoiceGroup selectionData={selectionData} />

            <Button onClick={handleChoice} type="button" value="add">
              Add A Choice
            </Button>

            <StyledButtonContainer>
              <Button onClick={handleCancel} value="cancel">
                Cancel
              </Button>
              <Button value="save">Save</Button>
            </StyledButtonContainer>
          </section>
        </StyledCreateMenuForm>
      ) : (
        // CREATE
        <StyledCreateMenuForm onSubmit={handleSubmit}>
          <section>
            <Field
              id="title"
              name="title"
              type="name"
              required
              label="Item Title"
              placeholder=""
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.title}
              error={errors.title}
            />
            <Field
              id="description"
              name="description"
              type="textarea"
              label="Item Description"
              placeholder=""
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.description}
              error={errors.description}
            />

            <CurrencyField
              placeholder="$0.00"
              type="text"
              label="Item Price"
              id="price"
              name="price"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.price}
              error={errors.price}
            />
            <StyledMenuImage>
              <StyledLabel>Item Image (Optional)</StyledLabel>
              <UploadFile />
            </StyledMenuImage>
            <StyledButtonContainer>
              <Button value="create">Create</Button>
            </StyledButtonContainer>
          </section>
          <section className="ptop">
            {headerData && headerData.menuHeadersByMenu && (
              <DropdownSelectHeader
                items={headerData.menuHeadersByMenu}
                title="Select a value"
                label={'Header'}
                multiSelect={false}
              />
            )}

            <ChoiceGroup selectionData={selectionData} organization_id={organizationId} />
            <StyledButtonContainer>
              <Button onClick={handleChoice} type="button" value="choice">
                Add A Choice
              </Button>
            </StyledButtonContainer>
          </section>
        </StyledCreateMenuForm>
      )}
    </>
  )
}
