import styled from 'styled-components'

const StyledSection = styled.section`
  display: flex;
  justify-content: center;
  flex-direction: column;

  ul {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
`

export const Info = () => {
  return (
    <StyledSection>
      <p>The menu platform builder.</p>
      <span>Offer convenient solutions to socially distant problems.</span>
      <ul>
        <li>We offer Convenience</li>
        <li>We offer Data</li>
        <li>We offer an Owned Audience</li>
      </ul>
    </StyledSection>
  )
}
