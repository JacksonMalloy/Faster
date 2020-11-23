import React, { useContext, Fragment } from 'react'
import styled from 'styled-components'
import UserContext from 'stores/UserContext'
import { addOrderSelection, removeOrderSelection } from 'stores/userActions'

const StyledSelectionGroup = styled.ul`
  margin: 0;

  @media (max-width: 500px) {
    padding-left: 0;
  }

  li {
    list-style: none;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    label {
      display: block;
      position: relative;
      cursor: pointer;
      font-size: 1.3rem;
      margin: 0.2rem;

      width: 100%;

      .checkmark {
        position: absolute;
        top: 15px;
        left: 10px;
        height: 25px;
        width: 25px;
        background-color: #eee;
        border-radius: 50%;
      }

      /* When the radio button is checked, add a blue background */
      .active {
        background-color: black;
      }

      /* Show the indicator (dot/circle) when checked */
      .checkmark:after {
        display: block;
      }
    }

    label:hover {
      /* On mouse-over, add a grey background color */
      /* input ~ .checkmark {
        background-color: black;
      } */
    }

    /* Create the indicator (the dot/circle - hidden when not checked) */
    .active:after {
      content: '';
      position: absolute;
      display: none;
    }

    .active:after {
      top: 9px;
      left: 9px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: white;
    }
  }

  .value-added {
    position: absolute;
    top: 15px;
    right: 30px;
    height: 25px;
  }
`

const StyledInputButton = styled.button`
  display: inline-block;
  border: none;
  margin: 0;
  text-decoration: none;
  background-color: white;
  width: 100%;
  height: 100%;
  padding: 1rem 1rem 1rem 3rem;
  cursor: pointer;
  text-align: left;

  &:active {
    outline: none;
    border: none;
  }
`

export const Selection = ({ choice }) => {
  const [state, dispatch] = useContext(UserContext)

  function handleOnClick(item, id) {
    const updateItem = { ...item, id }

    const isSelected = state.orderSelections.some((current) => {
      return current.menu_selection_id === updateItem.menu_selection_id && current.menu_choice_id === id
    })

    if (!isSelected) {
      console.log(`ADDED`)
      dispatch(addOrderSelection(item, id, choice))
    } else {
      console.log(`REMOVED`)
      dispatch(removeOrderSelection(item, id, choice))
    }
  }

  function isItemInSelection(item) {
    if (
      state.orderSelections.some((current) => {
        return current.menu_selection_id === item.menu_selection_id && current.menu_choice_id === item.menu_choice_id
      })
    ) {
      return true
    }
    return false
  }

  console.log(state)

  return (
    <StyledSelectionGroup>
      {choice &&
        choice.selections &&
        choice.selections.map((selection) => (
          <li key={selection.menu_selection_id}>
            <label>
              <StyledInputButton type="button" onClick={() => handleOnClick(selection, selection.menu_choice_id)}>
                {selection.name}
              </StyledInputButton>
              <>
                {isItemInSelection(selection) ? (
                  <span className="checkmark active"></span>
                ) : (
                  <span className="checkmark"></span>
                )}
              </>
              {selection && selection.value_add ? (
                <span className="value-added">+ ${selection.value_add}</span>
              ) : (
                <span className="value-added"></span>
              )}
            </label>
          </li>
        ))}
    </StyledSelectionGroup>
  )
}
