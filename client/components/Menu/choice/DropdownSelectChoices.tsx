import { useState, useEffect, useRef, useContext } from 'react'
import styled from 'styled-components'
import { Button } from 'components/common/Button'

import Field from 'components/common/Field'
import { useUI } from 'components/Context'

const StyledDropdown = styled.div`
  padding: 1rem 1rem 0 1rem;

  .dd-header {
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    width: 100%;
    padding: 0 1rem;
    border: 2px solid #f5f5f5;
    border-radius: 0.25rem;
  }

  .dd-list {
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
    padding: 0;
    margin: 0;
    width: 100%;
    margin-top: 1rem;

    li {
      list-style-type: none;

      &:first-of-type {
        > button {
          border-top: 1px solid #ccc;
          border-top-left-radius: 4px;
          border-top-right-radius: 4px;
        }
      }

      &:last-of-type > button {
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
      }

      button {
        display: flex;
        justify-content: space-between;
        background-color: white;
        font-size: 16px;
        padding: 15px 20px 15px 20px;
        border: 0;
        border-bottom: 1px solid #ccc;
        width: 100%;
        text-align: left;
        border-left: 1px solid #ccc;
        border-right: 1px solid #ccc;

        &:hover,
        &:focus {
          cursor: pointer;
          font-weight: bold;
          background-color: #ccc;
        }
      }
    }
  }
`

const StyledLabel = styled.label`
  position: absolute;
  top: -0.1rem;
  left: 1.3rem;
  width: 100%;
  color: #cccccc;
  font-size: 0.8rem;
`

const StyledDropdownContainer = styled.div`
  position: relative;
  margin-top: 0.5rem;
`

const StyledTag = styled.span`
  border-radius: 1rem;
  background-color: red;
  color: white;
  padding: 0.51rem;
  margin: 0.3rem;
  text-align: center;
  font-size: 0.6rem;
`

const StyledTagContainer = styled.div`
  display: grid;
  padding: 1rem 0;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`

function DropdownSelectChoices({ title, items, multiSelect = false, label = 'This is a label', id }) {
  const { organizationId, formChoices } = useUI()
  const node = useRef()

  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [data, setData] = useState(null)

  // Toggle Opening of drawer
  const toggle = () => setOpen(!open)

  // Initialize data state store for search
  useEffect(() => {
    setData(items)
  }, [])

  const excludeColumns = ['__typename', 'selections', 'organization_id', 'menu_item_id', 'menu_choice_id']

  // filter records by search text
  const filterData = (value) => {
    const lowercasedValue = value.toLowerCase().trim()
    if (lowercasedValue === '') setData(items)
    else {
      const filteredData = items.filter((item) => {
        return Object.keys(item).some((key) =>
          excludeColumns.includes(key) ? false : item[key].toString().toLowerCase().includes(lowercasedValue)
        )
      })
      setData(filteredData)
    }
  }

  const handleChange = (value) => {
    // handle change event of search input
    setSearch(value)
    filterData(value)
  }

  function handleOnClick(item) {
    const isSelected = formChoices.some((current) => current.menu_choice_id === item.menu_choice_id)

    if (!isSelected) {
      console.log(`ADDING CHOICE`)
      // dispatch(addChoice(item, id))
    } else {
      console.log(`REMOVING CHOICE`)
      // dispatch(removeChoice(item))
    }
  }

  function isItemInSelection(item) {
    if (formChoices.some((current) => current.menu_choice_id === item.menu_choice_id)) {
      return true
    }
    return false
  }

  const handleClickOutside = (e) => {
    if (node.current.contains(e.target)) {
      return
    }

    setOpen(false)
  }

  useEffect(() => {
    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open])

  const handleModal = (event) => {
    event.preventDefault()
    // dispatch(updateFormPhase('menu-choice'))
  }

  return (
    <>
      <StyledTagContainer>
        {formChoices &&
          formChoices
            .filter((choice) => choice.id === id)
            .map((choice) => {
              return <StyledTag key={choice.menu_choice_id}>{choice.header}</StyledTag>
            })}
      </StyledTagContainer>
      <StyledDropdownContainer ref={node}>
        <StyledLabel>{label}</StyledLabel>
        <StyledDropdown>
          <div
            tabIndex={0}
            className="dd-header"
            role="button"
            onKeyPress={() => toggle(!open)}
            onClick={() => toggle(!open)}
          >
            <div className="dd-header__title">
              <p className="dd-header__title--bold">{title}</p>
            </div>
            <div className="dd-header__action">
              <p>{open ? 'Close' : 'Open'}</p>
            </div>
          </div>
          {open && (
            <>
              <Field
                id="search"
                name="search"
                type="search"
                required
                label="Search"
                placeholder=""
                value={search}
                onChange={(event) => handleChange(event.target.value)}
              />
              <ul className="dd-list">
                {/* Display Choices */}

                {data.map((item) => (
                  <li className="dd-list-item" key={item.menu_choice_id}>
                    <button type="button" onClick={() => handleOnClick(item)}>
                      <span>{item.header}</span>
                      <span>{isItemInSelection(item) && 'Selected'}</span>
                    </button>
                  </li>
                ))}
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Button onClick={handleModal}>Create New Menu Choice</Button>
                </div>
              </ul>
            </>
          )}
        </StyledDropdown>
      </StyledDropdownContainer>
    </>
  )
}

export default DropdownSelectChoices
