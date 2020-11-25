import { Alert } from 'components/common/Alert'
import styled from 'styled-components'

const StyledContainer = styled.section`
  padding-left: calc(300px + 1rem);
  padding-top: 1rem;
  padding-right: 1rem;
  padding-bottom: 1rem;
  position: absolute;
  top: 0;
  /* display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-template-rows: auto;
  grid-gap: 1rem; */
  background-color: white;
  min-height: 100%;
  width: 100%;

  a {
    text-transform: none;
    text-decoration: none;
    color: black;
  }

  h1 {
    text-align: center;
  }

  .page-title {
    font-size: 4rem;
    font-weight: 900;
  }
`

const StyledButton = styled.button`
  cursor: pointer;
  padding: 0.35rem 1.2rem;
  border: 0.1rem solid #ffffff;
  border-radius: 0.12rem;
  box-sizing: border-box;
  text-decoration: none;
  font-weight: 300;
  color: #000000;
  text-align: center;
  transition: all 0.2s;
  border-radius: 0.4rem;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 12;

  &:hover {
    color: #000000;
    background-color: #ffffff;
    border: 0.1rem solid #000000;
  }
`

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-template-rows: auto;
  grid-gap: 1rem;
`

const Orders = () => {
  return (
    <>
      <Alert />
      <StyledContainer>
        <h1 className="page-title">Orders</h1>
        <StyledGrid>
          {/* {data.menusByTenant
            ? data.menusByTenant.map((menu) => (
                <Menu menu={menu} key={menu.menuId} image={menu.image} />
              ))
            : null} */}
        </StyledGrid>
      </StyledContainer>
    </>
  )
}

export default Orders
