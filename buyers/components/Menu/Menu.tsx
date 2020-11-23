import styled from 'styled-components'
import { useQuery, gql } from '@apollo/client'
import Link from 'next/link'

const StyledItemLink = styled(Link)`
  display: flex;
  justify-content: center;
  margin: 0rem;

  article {
    padding: 1rem;
    border-top: 1px #f5f5f5 solid;
    width: 100%;
    position: relative;

    header {
      width: 100%;
      height: 15rem;

      div {
        height: 15rem;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }

  h2 {
    font-size: 1rem;
    margin: 0;
  }

  p {
    margin: 0;
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

              <h2>{item.name}</h2>
              <p>{item.description}</p>
              <span>{item.base_price}</span>
            </article>
          </StyledItemLink>
        )
      })

    const headerSet = () => {
      return (
        <section>
          <h1>{header.name}</h1>
          <p>{header.sub_header}</p>
          <small>{header.menu_header_id}</small>
          {itemSet}
        </section>
      )
    }

    jsx.push(headerSet())
  }

  return (
    <>
      <h2>{data.menu.title}</h2>
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
