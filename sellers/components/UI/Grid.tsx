import styled from 'styled-components'

const StyledGrid = styled.div`
  /* display: grid;
  justify-content: center;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-gap: 1rem; */
  padding: 1rem;

  position: absolute;
  right: 0;
  left: 60%;
  top: 100px;
`

const Grid = ({ children }: any) => {
  return <StyledGrid>{children}</StyledGrid>
}

export default Grid
