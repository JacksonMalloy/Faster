import styled from 'styled-components'

const StyledCard = styled.article`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  box-shadow: 0px 0px 20px 0px #f6f6f6;
  position: relative;
  width: 100%;

  .actions {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }

  aside {
    display: flex;
    flex: 1;
    justify-content: flex-end;
    align-items: center;
    padding: 1rem;
    overflow: hidden;

    img {
      object-fit: cover;
      padding: 1rem 1rem 1rem 0;
      width: 100%;
      flex: 3;
    }

    .placeholder {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 1rem;
      flex: 3;
      background-color: #f7f7f7;
      border-radius: 50%;
      height: 150px;
      max-width: 150px;
    }
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    height: 100%;

    h2 {
      padding: 1.5rem;
      padding-bottom: 0rem;
      margin: 0;
      text-transform: uppercase;
    }

    svg {
      margin: 0 1.5rem;
      height: 1.5rem;
      width: 1.5rem;
    }

    .published {
      fill: limegreen;
    }
  }
`

const Card = ({ children }) => {
  return <StyledCard>{children}</StyledCard>
}

export default Card
