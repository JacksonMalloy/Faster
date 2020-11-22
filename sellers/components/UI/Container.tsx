import styled from 'styled-components'

const StyledContainer = styled.section`
  padding-left: calc(300px + 1rem);

  @media (max-width: 900px) {
    padding-left: calc(6rem + 1rem);
  }

  padding-top: 7rem;
  padding-right: ${({ paddingRight }) => (paddingRight ? paddingRight : '460px')};
  padding-bottom: 1rem;
  background-color: white;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow-x: hidden;
`

const Container = ({ children, paddingRight }: any) => {
  return <StyledContainer paddingRight={paddingRight}>{children}</StyledContainer>
}

export default Container
