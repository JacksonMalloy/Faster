import React, { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { Button } from '../common/Button'

import { Selection } from 'components/Dashboard/Selection'

const StyledMenu = styled.div`
  display: flex;
  justify-content: stretch;
  align-items: space-between;
  flex-direction: column;
  background-color: #f5f5f5;
  border-radius: 0.5rem;
  position: relative;
  overflow: none;

  h1 {
    padding: 0rem !important;
  }

  img {
    width: 100%;
    height: 10rem;
    object-fit: cover;
    border-top-right-radius: 0.5rem;
    border-top-left-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
  }
`

export const MenuItemCard = ({ item }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleClick = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <>
      <StyledMenu onClick={handleClick}>
        <h1>{item.name}</h1>
        <p>${item.base_price}</p>
      </StyledMenu>
      {isExpanded ? (
        <>
          {item &&
            item.menu_choices &&
            item.menu_choices.map((choice) => (
              <div key={choice.choice_id}>
                <h3>{choice.header}</h3>
                <h2>{choice.sub_header}</h2>
                <Selection choice={choice} />
              </div>
            ))}

          <Button>Order</Button>
        </>
      ) : null}
    </>
  )
}
