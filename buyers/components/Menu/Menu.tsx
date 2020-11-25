import styled from 'styled-components'
import { useQuery, gql } from '@apollo/client'
import Link from 'next/link'

const StyledItemLink = styled(Link)`
  cursor: pointer;
`

const StyledContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  header {
    max-width: 320px;
    text-align: center;
    background-color: #ccc;
    width: 100%;
  }

  article {
    width: 100%;
    max-width: 320px;
    cursor: pointer;
    padding: 1rem;

    &:hover {
      background-color: #f2f2f2;
    }
  }
`

const Menu = ({ accessCode, menuId }) => {
  const { loading, error, data } = useQuery(MENU, { variables: { menuId: menuId } })
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  const items = data.menu.menuItems.slice()
  const result = []
  const map = new Map()

  // Set up array of unique Menu Headers
  for (const item of items) {
    if (!map.has(item.menuHeader.headerId)) {
      map.set(item.menuHeader.headerId, true) // set any value to Map
      result.push({
        headerId: item.menuHeader.headerId,
        name: item.menuHeader.name,
        description: item.menuHeader.description,
      })
    }
  }

  const jsx = []

  // Create array of Item Sets beneath Headers
  for (const header of result) {
    const itemSet = items
      .filter((item) => item.menuHeader.headerId === header.headerId)
      .map((item, i) => {
        return (
          <StyledItemLink
            href={`/${accessCode}/menu/${menuId}/item/${item.itemId}`}
            key={`${i}-${accessCode}-${menuId}`}
          >
            <article>
              {item.image && item.image.imageId && (
                <header>
                  <div>Image Here</div>
                </header>
              )}

              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <span>{item.basePrice}</span>
            </article>
          </StyledItemLink>
        )
      })

    const headerSet = () => {
      return (
        <StyledContainer>
          <header>
            <h2>{header.name}</h2>
            <p>{header.description}</p>
          </header>
          {itemSet}
        </StyledContainer>
      )
    }

    jsx.push(headerSet())
  }

  return (
    <>
      <h1>{data.menu.title}</h1>

      {jsx}
      <pre style={{ fontSize: '0.8rem' }}>{JSON.stringify(data, null, 2)}</pre>
    </>
  )
}

export default Menu

const MENU = gql`
  query($menuId: ID!) {
    menu(menuId: $menuId) {
      menuId
      tenantId
      updatedAt
      title
      __typename
      image {
        imageId
        imageUrl
        __typename
      }
      menuItems {
        itemId
        basePrice
        description
        name
        image {
          imageId
          imageUrl
        }
        menuHeader {
          headerId
          name
          description
        }
      }
    }
  }
`
