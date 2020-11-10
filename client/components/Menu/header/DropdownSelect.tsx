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
import Field from 'components/common/Field'

const DropDownSelect = ({
  title,
  items,
  multiSelect = false,
  label = 'This is a label',
  variant = 'HEADER', // HEADER, SELECTION, CHOICE
  mutation,
  UUID,
}) => {
  const [removeMenuHeader] = useMutation(REMOVE_MENU_HEADER)

  const {
    formHeader,
    formChoices,
    formSelections,
    setFormHeader,
    setSelectedHeader,
    setFormView,
    openToast,
    menuId,
  } = useUI()
  const [open, setOpen] = useState(false)
  const toggle = () => setOpen(!open)
  const node = useRef()

  const [search, setSearch] = useState('')
  const [data, setData] = useState(null)

  // Initialize data state store for search
  useEffect(() => {
    setData(items)
  }, [])

  const excludeColumns = [
    '__typename',
    'selected',
    'organization_id',
    'menu_selection_id',
    'menu_item_id',
    'menu_choice_id',
  ]

  // filter records by search text
  const filterData = (value) => {
    const lowercasedValue = value.toLowerCase().trim()
    if (lowercasedValue === '') setData(items)
    else {
      const filteredData = items.filter((item) => {
        return Object.keys(item).some((key) =>
          excludeColumns.includes(key) ? false : item[key].toString().toLowerCase().includes(lowercasedValue)
        )
      })
      setData(filteredData)
    }
  }

  const handleChange = (value) => {
    // handle change event of search input
    setSearch(value)
    filterData(value)
  }

  const handleOnClick = (item) => {
    // From selection
    // const updateItem = { ...item, id }

    // const isSelected = formSelections.some((current) => {
    //   return current.menu_selection_id === updateItem.menu_selection_id && current.id === id
    // })

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

    switch (variant) {
      case 'HEADER':
        if (formHeader && header.some((current) => current.menu_header_id === item.menu_header_id)) {
          return true
        }
        return false
      case 'SELECTION':
        if (
          formSelections &&
          formSelections.some((current) => {
            return current.menu_selection_id === updateItem.menu_selection_id && current.id === id
          })
        ) {
          return true
        }
        return false
      case 'CHOICE':
        if (formChoices && formChoices.some((current) => current.menu_choice_id === item.menu_choice_id)) {
          return true
        }
        return false
      default:
        break
    }
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

  const changeView = (event) => {
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

  const renderDropdownHead = () => {
    if (variant === 'HEADER') {
      return <>{formHeader && <span onClick={handleTabClick}>{formHeader.name}</span>}</>
    }

    if (variant === 'CHOICE') {
      return (
        <>
          {formChoices &&
            formChoices
              .filter((choice) => choice.UUID === UUID)
              .map((choice) => {
                return <span key={choice.menu_choice_id}>{choice.header}</span>
              })}
        </>
      )
    }

    if (variant === 'SELECTION') {
      return (
        <>
          {formSelections &&
            formSelections
              .filter((selection) => selection.UUID === UUID)
              .map((selection) => {
                return <span key={selection.menu_selection_id}>{selection.name}</span>
              })}
        </>
      )
    }
  }

  return (
    <Dropdown node={node} label={label}>
      <header> {renderDropdownHead()}</header>

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
              <button onClick={changeView}>
                <Plus />
              </button>
            </div>

            <Field
              id="search"
              name="search"
              type="search"
              required
              label="Search"
              placeholder=""
              value={search}
              onChange={(event) => handleChange(event.target.value)}
            />
            <ul className="dd-list">
              {data.map((item) => (
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

export default DropDownSelect
