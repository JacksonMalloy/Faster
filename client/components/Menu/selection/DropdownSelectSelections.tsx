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

function DropdownSelectSelections({ title, items, label = 'This is a label', id }) {
  const { formSelections, organizationId } = useUI()

  const [open, setOpen] = useState(false)
  // const [selection, setSelection] = useState([])
  const toggle = () => setOpen(!open)

  const node = useRef()

  const [search, setSearch] = useState('')
  const [data, setData] = useState(null)

  // Initialize data state store for search
  useEffect(() => {
    setData(items)
  }, [])

  const excludeColumns = [
    '__typename',
    'selected',
    'organization_id',
    'menu_selection_id',
    'menu_item_id',
    'menu_choice_id',
  ]

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

  function handleOnClick(item, id) {
    const updateItem = { ...item, id }

    const isSelected = formSelections.some((current) => {
      return current.menu_selection_id === updateItem.menu_selection_id && current.id === id
    })

    //console.log(`IS SELECTED: `, isSelected)
    if (!isSelected) {
      console.log(`ADD SELECTION`)
      // dispatch(addSelection(item, id))
    } else {
      console.log(`REMOVE SELECTION`)

      // dispatch(removeSelection(updateItem, id))
    }
  }

  function isItemInSelection(item, id) {
    const updateItem = { ...item, id }
    if (
      formSelections.some((current) => {
        return current.menu_selection_id === updateItem.menu_selection_id && current.id === id
      })
    ) {
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

  const handleMenuSwitch = (event) => {
    event.preventDefault()
    // dispatch(updateFormPhase('menu-selection'))
  }

  return (
    <>
      <StyledTagContainer>
        {formSelections &&
          formSelections
            .filter((selection) => selection.id === id)
            .map((selection) => {
              return <StyledTag key={selection.menu_selection_id}>{selection.name}</StyledTag>
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
                {data.map((item) => (
                  <li className="dd-list-item" key={item.menu_selection_id}>
                    <button type="button" onClick={() => handleOnClick(item, id)}>
                      <span>{item.name}</span>
                      <span>{isItemInSelection(item, id) && 'Selected'}</span>
                    </button>
                  </li>
                ))}
                <Button className="headerButton" onClick={handleMenuSwitch}>
                  Create New Selection
                </Button>
              </ul>
            </>
          )}
        </StyledDropdown>
      </StyledDropdownContainer>
    </>
  )
}

export default DropdownSelectSelections
