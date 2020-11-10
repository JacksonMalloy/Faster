import { useState, useEffect, useRef, useContext } from 'react'
import styled from 'styled-components'
import { Button } from 'components/common/Button'
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

function DropdownSubheaderSelections({ title, items, multiSelect = true, label = 'This is a label' }) {
  const [open, setOpen] = useState(false)
  const [selection, setSelection] = useState([])
  const toggle = () => setOpen(!open)

  const { organizationId, formSelections } = useUI()

  const node = useRef()

  function handleOnClick(item) {
    if (!selection.some((current) => current.menu_selection_id === item.menu_selection_id)) {
      if (!multiSelect) {
        setSelection([item])
      } else if (multiSelect) {
        setSelection([...selection, item])
      }
    } else {
      let selectionAfterRemoval = selection
      selectionAfterRemoval = selectionAfterRemoval.filter(
        (current) => current.menu_selection_id !== item.menu_selection_id
      )
      setSelection([...selectionAfterRemoval])
    }
  }

  function isItemInSelection(item) {
    if (selection.some((current) => current.menu_selection_id === item.menu_selection_id)) {
      return true
    }
    return false
  }

  const handleClickOutside = (e) => {
    if (node.current.contains(e.target)) {
      // inside click
      return
    }
    // outside click
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

    // dispatch(updateFormPhase('menu-selection'))
  }

  return (
    <>
      <StyledTagContainer>
        {selection &&
          selection.map((selection) => {
            return <StyledTag>{selection.name}</StyledTag>
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
            <ul className="dd-list">
              {items.map((item) => (
                <li className="dd-list-item" key={item.menu_selection_id}>
                  <button type="button" onClick={() => handleOnClick(item)}>
                    <span>{item.name}</span>
                    <span>{isItemInSelection(item) && 'Selected'}</span>
                  </button>
                </li>
              ))}
              <Button className="headerButton" onClick={handleModal}>
                Create New Selection
              </Button>
            </ul>
          )}
        </StyledDropdown>
      </StyledDropdownContainer>
    </>
  )
}

export default DropdownSubheaderSelections
