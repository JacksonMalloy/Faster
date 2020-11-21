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
  const { loading, error, data } = useQuery(MENU, { variables: { menu_id: menuId } })
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  const items = data.menu.menu_items.slice()
  const result = []
  const map = new Map()

  // Set up array of unique Menu Headers
  for (const item of items) {
    if (!map.has(item.menu_header.menu_header_id)) {
      map.set(item.menu_header.menu_header_id, true) // set any value to Map
      result.push({
        menu_header_id: item.menu_header.menu_header_id,
        name: item.menu_header.name,
        sub_header: item.menu_header.sub_header,
      })
    }
  }

  const jsx = []

  // Create array of Item Sets beneath Headers
  for (const header of result) {
    const itemSet = items
      .filter((item) => item.menu_header.menu_header_id === header.menu_header_id)
      .map((item, i) => {
        return (
          <StyledItemLink
            href={`/${accessCode}/menu/${menuId}/item/${item.menu_item_id}`}
            key={`${i}-${accessCode}-${menuId}`}
          >
            <article>
              {item.image && item.image.image_id && (
                <header>
                  <div>Image Here</div>
                </header>
              )}

              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <span>{item.base_price}</span>
            </article>
          </StyledItemLink>
        )
      })

    const headerSet = () => {
      return (
        <StyledContainer>
          <header>
            <h2>{header.name}</h2>
            <p>{header.sub_header}</p>
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
  query($menu_id: ID!) {
    menu(menu_id: $menu_id) {
      menu_id
      organization_id
      updated_at
      title
      __typename
      image {
        image_id
        image_url
        __typename
      }
      menu_items {
        menu_item_id
        base_price
        description
        name
        image {
          image_id
          image_url
        }
        menu_header {
          menu_header_id
          name
          sub_header
        }
      }
    }
  }
`
