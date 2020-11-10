import { useState, useEffect, useRef } from 'react'
import Plus from 'assets/plus.svg'
import Search from 'assets/search.svg'
import Trash from 'assets/trash.svg'
import Tools from 'assets/tools.svg'
import { useUI } from 'components/Context'
import Dropdown from 'components/UI/Dropdown'
import { handleDeleteHeader } from 'components/Services/Header'
import { useMutation } from '@apollo/client'
import { REMOVE_MENU_HEADER } from 'graphql/mutations/menu-header/removeMenuHeader'

function DropdownSelectHeader({ title, items, label = 'This is a label' }) {
  const [removeMenuHeader] = useMutation(REMOVE_MENU_HEADER)

  const { formHeader, setFormHeader, setSelectedHeader, setFormView, openToast, menuId } = useUI()
  const [open, setOpen] = useState(false)
  const toggle = () => setOpen(!open)
  const node = useRef()

  const handleOnClick = (item) => {
    if (!formHeader) {
      setFormHeader(item)
    }

    let header = [item]

    if (
      formHeader &&
      !header.some((current) => {
        return current.menu_header_id === formHeader.menu_header_id
      })
    ) {
      setFormHeader(item)
    }
  }

  const isItemInSelection = (item) => {
    const header = [formHeader]

    if (formHeader && header.some((current) => current.menu_header_id === item.menu_header_id)) {
      return true
    }
    return false
  }

  const handleClickOutside = (e) => {
    if (node?.current.contains(e.target)) {
      // inside click
      return
    }
    // outside click
    setOpen(false)
  }

  useEffect(() => {
    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open])

  const handleCreateHeader = (event) => {
    event.preventDefault()
    setFormView('CREATE_HEADER_VIEW')
  }

  const handleTabClick = () => {
    setFormHeader(null)
  }

  const handleSearch = (event) => {
    event.preventDefault()

    console.log('seraching...')
  }

  const handleDelete = async (event, item) => {
    event.preventDefault()

    console.log('delete')
    console.log({ item })

    const variables = { menu_header_id: item.menu_header_id }
    const args = { variables, menuId }
    const data = await handleDeleteHeader(removeMenuHeader, args).then(() => {
      openToast('Header was successfully deleted', 'SUCCESS')
    })
  }

  const handleEdit = (event, item) => {
    event.preventDefault()
    setSelectedHeader(item)
    setFormView('EDIT_HEADER_VIEW')
  }

  return (
    <Dropdown node={node} label={label}>
      {/* Will need to change for selections & choices */}
      {formHeader && (
        <header key={formHeader.menu_header_id}>
          <span onClick={handleTabClick}>{formHeader.name}</span>
        </header>
      )}

      <main>
        <div tabIndex={0} className="dd-header" onKeyPress={() => toggle(!open)} onClick={() => toggle(!open)}>
          <div className="dd-header__title">
            <p className="dd-header__title--bold">{title}</p>
          </div>
          <div className="dd-header__action">{open ? <p>Open</p> : <p>Close</p>}</div>
        </div>

        {open && (
          <>
            <div className="selection-btns">
              <button onClick={handleSearch}>
                <Search />
              </button>
              <button onClick={handleCreateHeader}>
                <Plus />
              </button>
            </div>
            <ul className="dd-list">
              {items.map((item) => (
                <li className="dd-list-item" key={item.menu_header_id}>
                  <button type="button" onClick={() => handleOnClick(item)}>
                    <span>{item.name}</span>
                    <span>{isItemInSelection(item) && 'Selected'}</span>
                  </button>
                  <button className="action" onClick={(event) => handleDelete(event, item)}>
                    <Trash />
                  </button>
                  <button className="action" onClick={(event) => handleEdit(event, item)}>
                    <Tools />
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </main>
    </Dropdown>
  )
}

export default DropdownSelectHeader
