import styled from 'styled-components'

const StyledCreateMenuForm = styled.form`
  z-index: 10;

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

const Form = ({ children, onSubmit }: any) => {
  return <StyledCreateMenuForm onSubmit={onSubmit}>{children}</StyledCreateMenuForm>
}

export default Form
