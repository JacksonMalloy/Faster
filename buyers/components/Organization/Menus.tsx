import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'

const StyledMenuLink = styled(Link)`
  display: flex;
  justify-content: center;
  margin: 0.5rem 1.3rem;

  article {
    padding: 1rem;
    border: 1px black solid;
    width: 100%;
    border-radius: 0.3rem;
    position: relative;

    header {
      width: 100%;
      height: 15rem;
      display: flex;

      div {
        height: 15rem;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          object-fit: scale-down;
          width: 100%;
          max-height: 15rem;
          position: absolute;
          top: 0;
        }
      }
    }
  }

  h2 {
    font-size: 1rem;
    margin: 0;
  }
`

export const Menus = ({ menus, accessCode }) => {
  const listPublishedMenus = () => {
    return (
      <section>
        {menus.map(({ title, menu_id, image }) => {
          console.log({ image })
          return (
            <StyledMenuLink key={menu_id} href={`/${accessCode}/menu/${menu_id}`}>
              <article>
                {image && image.image_url && (
                  <header>
                    <div>
                      <img src={image.image_url} />
                    </div>
                  </header>
                )}

                <h2>{title}</h2>
              </article>
            </StyledMenuLink>
          )
        })}
      </section>
    )
  }

  return <div>{listPublishedMenus()}</div>
}
