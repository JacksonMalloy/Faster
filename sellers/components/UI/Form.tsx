import styled from 'styled-components'

const StyledCreateMenuForm = styled.form`
  z-index: 10;
  box-shadow: 2px 2px 2px 2px #f4f4f4;
  position: fixed;
  overflow-y: auto;
  overflow-x: hidden;
  top: 100px;
  left: ${({ secondary }) => (secondary ? '60%' : '300px')};
  right: ${({ secondary }) => (secondary ? '0' : '40%')};
  height: calc(100vh - 100px);
  margin: 0.5rem;
  background-color: white;

  .form-img {
    width: 100%;
    height: 300px;
    padding: 1rem 1rem 0rem 1rem;
    display: flex;
    flex-direction: column;
    position: relative;

    span {
      background-color: #f6f6f6;
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }

    img {
      width: 90%;
      max-height: 90%;
      object-fit: cover;
    }
  }

  .form-btns {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 1rem;
  }

  label {
    position: absolute;
    top: -0.1rem;
    left: 1.3rem;
    width: 100%;
    color: black;
    font-size: 0.8rem;
  }
`

const Form = ({ children, onSubmit, secondary }: any) => {
  return (
    <StyledCreateMenuForm onSubmit={onSubmit} secondary={secondary}>
      {children}
    </StyledCreateMenuForm>
  )
}

export default Form
