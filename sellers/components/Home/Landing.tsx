import styled from 'styled-components'

const StyledSection = styled.section`
  h1 {
    font-size: 4rem;

    text-align: left;
    padding-left: 5%;
  }

  .subHeader {
    font-size: 3rem;
  }

  h2 {
    font-size: 2rem;
    text-transform: uppercase;
    text-align: left;
    padding-left: 5rem;
    font-weight: 900;
  }
`

export const Landing = () => {
  return (
    <StyledSection>
      <h1 className="subHeader">
        The fastest way <br />
        to sell online. <br />
      </h1>
    </StyledSection>
  )
}
