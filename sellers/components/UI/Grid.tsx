import styled from 'styled-components'

const StyledGrid = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-gap: 1rem;
  padding: 1rem;
  width: 100%;
`

const Grid = ({ children }: any) => {
  return <StyledGrid>{children}</StyledGrid>
}

export default Grid
