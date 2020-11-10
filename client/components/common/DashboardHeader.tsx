import { useContext, useState } from 'react'
import styled from 'styled-components'
import { useUI } from '../Context'
import { Button } from './Button'
import Field from './Field'

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  background-color: white;
  color: black;
  z-index: 2;
  width: 100%;
  padding-left: 300px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 900px) {
    padding-left: 6rem;
  }

  h1 {
    padding: 1rem;
    margin: 0rem;
  }

  div {
    padding: 1rem;
    width: 100%;
  }

  button {
    padding: 1rem;
  }

  h2 {
    color: white;
  }
`

type DashboardHeaderType = {
  search: string
  setSearch: (s: string) => void
}

const DashboardHeader = ({ search, setSearch }: DashboardHeaderType) => {
  const [searchView, setSearchView] = useState(false)

  const { selectedMenuName } = useUI()

  const renderMenuTitle = () => {
    if (selectedMenuName) {
      return <h1>{selectedMenuName}</h1>
    }

    return <h1>Menus</h1>
  }

  const renderSearchView = () => {
    if (searchView) {
      return (
        <Field
          id="search"
          name="search"
          type="search"
          required
          label=""
          placeholder="Search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      )
    }

    return renderMenuTitle()
  }

  return (
    <StyledHeader>
      {/* <form>
        <label>Active</label>
        <input type="radio" id="male" name="gender" value="male" />
        <label>Inactive</label>
        <input type="radio" id="male" name="gender" value="male" />
      </form> */}
      {renderSearchView()}
      <Button value="search" onClick={() => setSearchView(!searchView)}>
        Search
      </Button>
    </StyledHeader>
  )
}

export default DashboardHeader
