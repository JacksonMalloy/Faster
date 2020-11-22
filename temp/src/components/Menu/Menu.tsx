import React from 'react'
import styled from 'styled-components'
import { useQuery, gql } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import { Header } from '../common/Header'
import { Link, useParams } from 'react-router-dom'

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

const Menu = () => {
  const { accessCode, menuId } = useParams()

  const { loading, error, data } = useQuery(MENU, { variables: { menu_id: menuId } })
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return (
    <>
      <h2>{data.menu.title}</h2>

      {data.menu.menu_items.map((item) => {
        return (
          <StyledItemLink to={`/${accessCode}/menu/${menuId}/item/${item.menu_item_id}`}>
            <article>
              {item.image && item.image.image_id && (
                <header>
                  <div>Image Here</div>
                </header>
              )}

              <h2>{item.name}</h2>
              <p>{item.description}</p>
              <span>${item.base_price}</span>
            </article>
          </StyledItemLink>
        )
      })}
      {/* <pre style={{ fontSize: '0.8rem' }}>{JSON.stringify(data, null, 2)}</pre> */}
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
