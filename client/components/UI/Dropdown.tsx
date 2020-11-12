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

      p {
        margin: 0;
      }
    }

    .dd-list {
      padding: 0;
      margin: 0;
      width: 93%;
      max-height: 200px;
      overflow-y: scroll;
      margin-top: 1rem;
      position: absolute;
      top: 70px;
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

  header {
    display: grid;
    padding: 1rem 1rem 0rem 1rem;
    grid-template-columns: 1fr 1fr 1fr 1fr;

    span {
      border-radius: 1rem;
      background-color: black;
      color: white;
      padding: 0.51rem;
      text-align: center;
      font-size: 0.6rem;
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
