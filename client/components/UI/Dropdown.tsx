import React from 'react'
import styled from 'styled-components'

const StyledDropdown = styled.div`
  position: relative;
  margin-top: 1rem;
  display: flex;
  flex-direction: column !important;

  label {
    position: absolute;
    top: 0.8rem;
    left: 1.3rem;
    width: 100%;
    color: black;
    font-size: 0.8rem;
  }

  main {
    padding: 1rem 1rem 0 1rem;

    .dd-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      width: 100%;
      padding: 0.7rem 0.8rem;
      border: 2px solid black;
      border-radius: 0.25rem;

      p {
        margin: 0;
      }
    }

    .dd-list {
      padding: 0;
      margin: 0;
      width: 100%;
      max-height: 200px;
      overflow-y: scroll;

      .dd-list-item {
        display: flex;

        .action {
          flex: 1;
        }

        &:first-of-type {
          > button {
            border-top: 1px solid #ccc;
          }
        }

        button {
          display: flex;
          justify-content: space-between;
          background-color: white;
          font-size: 1rem;
          padding: 0.4rem;
          border: 0;
          border-bottom: 1px solid #ccc;
          width: 100%;
          border-left: 1px solid #ccc;
          border-right: 1px solid #ccc;

          span {
            background-color: white;
          }

          &:hover,
          &:focus {
            cursor: pointer;
            font-weight: bold;
            box-shadow: inset 0 0 2px #000;
          }
        }
      }
    }
  }

  header {
    display: grid;
    padding: 1rem 1rem 0rem 1rem;
    grid-template-columns: 1fr 1fr 1fr 1fr;

    span {
      border-radius: 1rem;
      background-color: black;
      color: white;
      padding: 0.51rem;
      margin: 0.3rem;
      text-align: center;
      font-size: 0.6rem;
      cursor: pointer;
    }
  }

  .selection-btns {
    display: flex;
    align-items: center;
    z-index: 9;
    padding-top: 1rem;

    p {
      padding: 0 1rem;
    }

    button {
      border-radius: 50%;
      cursor: pointer;
      height: 30px;
      width: 30px;
      text-decoration: none;
      font-weight: 300;
      position: relative;
      text-align: center;
      transition: all 0.2s;
      border: none;
      margin: 0 0.4rem;
      z-index: 9999999;

      &:hover {
        color: #000000;
        background-color: #ffffff;

        border: 0.1rem solid #000000;
      }

      svg {
        height: 15px;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 7px;
        z-index: 9;
      }
    }
  }
`

const Dropdown = ({ children, node, label }) => {
  return (
    <StyledDropdown ref={node}>
      <label>{label}</label>
      {children}
    </StyledDropdown>
  )
}

export default Dropdown
