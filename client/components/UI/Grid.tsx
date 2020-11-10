import styled from 'styled-components'

const StyledGrid = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-gap: 1rem;
  padding-bottom: 10rem;
  padding-right: 4rem;
  width: 100%;
`

const Grid = ({ children }: any) => {
  return <StyledGrid>{children}</StyledGrid>
}

export default Grid
