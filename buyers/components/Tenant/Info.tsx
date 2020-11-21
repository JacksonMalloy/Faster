import React from 'react'
import styled from 'styled-components'

const StyledInformation = styled.header`
  display: flex;
  flex-direction: column;
  padding: 1.3rem;

  h2 {
    font-size: 1.5rem;
    margin: 0;
  }

  p {
    margin: 0;
  }
`

export const Info = ({ data }) => {
  return (
    <StyledInformation>
      <h2>{data.name}</h2>
      <small>
        {data.address}, {data.city}
      </small>
      <p>{data.phone}</p>
      <strong>MENUS</strong>
    </StyledInformation>
  )
}
