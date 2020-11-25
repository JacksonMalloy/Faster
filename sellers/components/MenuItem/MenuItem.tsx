import { useState } from 'react'

import styled from 'styled-components'

import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import { ModalLayout } from 'components/common/layout/ModalLayout'

import { MENU_ITEM } from 'graphql/queries/menu-item/menuItem'

const StyledContainer = styled.section`
  padding-left: calc(300px + 1rem);
  padding-top: 1rem;
  padding-right: 1rem;
  padding-bottom: 1rem;
  position: absolute;
  top: 0;
  /* display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-template-rows: auto;
  grid-gap: 1rem; */
  background-color: white;
  min-height: 100%;
  width: 100%;

  a {
    text-transform: none;
    text-decoration: none;
    color: black;
  }

  h1 {
    text-align: center;
    padding: 5rem;
  }
`

const StyledButton = styled.button`
  cursor: pointer;
  padding: 0.35rem 1.2rem;
  border: 0.1rem solid #ffffff;
  border-radius: 0.12rem;
  box-sizing: border-box;
  text-decoration: none;
  font-weight: 300;
  color: #000000;
  text-align: center;
  transition: all 0.2s;
  border-radius: 0.4rem;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 12;

  &:hover {
    color: #000000;
    background-color: #ffffff;
    border: 0.1rem solid #000000;
  }
`

const StyledMenuItemCard = styled.section`
  display: flex;
  flex-direction: column;
  margin: 5rem;
  background-color: #f5f5f5;

  img {
    width: 100%;
    height: 10rem;
  }

  h1 {
    padding: 1rem;
  }
`

const MenuItem = () => {
  const router = useRouter()
  const { id } = router.query
  const { data, loading, error } = useQuery(MENU_ITEM, {
    variables: { itemId: id },
    skip: Number.isNaN(id),
  })

  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(!isOpen)

  return (
    <>
      <StyledContainer>
        {data && data.menuItem ? (
          <>
            {data.menuItem.menuHeader && (
              <div className="header">
                <h1>Menu Header: {data.menuItem.menuHeader.name}</h1>
                <h2>Menu SubHeader: {data.menuItem.menuHeader.description}</h2>
              </div>
            )}
            {/* <StyledMenuItemCard>
              <img src={data.menuItem.image.imageUrl} />

              <h1>{data.menuItem.name}</h1>
              <h3>{data.menuItem.description}</h3>
              <p>{data.menuItem.basePrice}</p>
              {data.menuItem.menuChoices &&
                data.menuItem.menuChoices.map((choice) => {
                  return (
                    <div key={choice.choiceId}>
                      <div>{choice.header}</div>
                      {choice.selections &&
                        choice.selections.map((selection) => {
                          return (
                            <div key={selection.selectionId}>
                              <div style={{ paddingLeft: '1rem' }}>
                                - {selection.name}
                              </div>
                            </div>
                          )
                        })}
                    </div>
                  )
                })}
            </StyledMenuItemCard> */}
          </>
        ) : null}
      </StyledContainer>
      <StyledButton onClick={toggle}>Click Me</StyledButton>
      {isOpen ? (
        <ModalLayout>
          {/* <MenuSelectionForm
            menuId={id}
            toggle={toggle}
            menuHeader={data.menuItem.menuHeader}
          /> */}
        </ModalLayout>
      ) : null}
    </>
  )
}

export default MenuItem
