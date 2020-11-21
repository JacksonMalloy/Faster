import React from 'react'
import styled from 'styled-components'

const StyledDropdown = styled.div`
  position: relative;
  margin-top: 1rem;
  display: flex;
  padding: 0.2rem 1rem 0.2rem 1rem;
  flex-direction: column !important;
  margin: 0.4rem;

  main {
    position: relative;

    .dd-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      width: 100%;
      padding: 0.7rem 0.8rem;
      border: 2px solid black;
      border-radius: 0.25rem;
      margin-top: 1rem;

      p {
        margin: 0;
      }

      svg {
        top: 6px;
      }
    }

    .dd-header__title--bold {
      padding: 0 1rem;
    }

    /* **** */
    /* List */
    /* **** */
    .dd-list {
      padding: 1rem;
      margin: 0;
      width: 500px;
      overflow-y: scroll;
      margin-top: 1rem;
      position: fixed;
      top: 70px;
      right: 25px;
      background-color: white;
      height: 100%;
      z-index: 9;

      .selected {
        background-color: red;
      }

      .dd-list-item {
        display: flex;
        position: relative;

        .action {
          position: absolute;
          right: 0;
          bottom: 0;
          width: 15px;
          cursor: pointer;
        }

        .delete-action {
          right: 5px;
        }

        .edit-action {
          right: 35px;
        }

        &:first-of-type {
          > button,
          input {
            border-top: 1px solid #ccc;
          }
        }

        input {
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
        }

        input:focus {
          outline: none;
        }

        .search-btn {
          position: absolute;
          right: 10px;
          top: 5px;
          color: #ccc;
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
            padding: 0.2rem;
            padding-right: 2rem;
          }

          &:hover,
          &:focus {
            cursor: pointer;
            background-color: #f9f9f9;
            outline: none;

            span {
              background-color: #f9f9f9;
            }
          }
        }
      }
    }
  }

  /* **** */
  /* Tags */
  /* **** */

  header {
    display: flex;
    justify-content: space-around;
    padding: 0rem !important;
    min-height: 40px;
    position: relative;
    flex-wrap: wrap;

    svg {
      position: absolute;
      right: 10px;
      top: 20px;
    }

    span {
      border-radius: 0px;
      background-color: black;
      color: white;
      border-radius: 0.2rem;
      padding: 0.51rem 0.8rem;
      margin: 0.2rem;
      font-size: 0.8rem;
      cursor: pointer;
    }
  }

  .rows {
    display: flex;
    flex-direction: column;
    text-align: left;

    .sub {
      color: #ccc;
      font-size: 0.7rem;
      text-align: left;
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
