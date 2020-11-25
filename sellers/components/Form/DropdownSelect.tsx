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
import { REMOVE_MENU_SELECTION } from 'graphql/mutations/menu-selection/removeMenuSelection'
import { REMOVE_MENU_CHOICE } from 'graphql/mutations/menu-choice/removeMenuChoice'
import { handleDeleteChoice } from 'components/Services/Choice'
import { handleDeleteSelection } from 'components/Services/Selection'

const DropDownSelect = ({
  title,
  items,
  multiSelect = false,
  label = 'This is a label',
  variant = 'HEADER', // HEADER, SELECTION, CHOICE
  UUID,
}) => {
  const [removeMenuHeader] = useMutation(REMOVE_MENU_HEADER)
  const [removeMenuSelection] = useMutation(REMOVE_MENU_SELECTION)
  const [removeMenuChoice] = useMutation(REMOVE_MENU_CHOICE)

  const {
    formHeader,
    setFormChoices,
    formChoices,
    removeFormChoice,
    setFormSelections,
    removeFormSelection,
    formSelections,
    setFormHeader,
    setSelectedHeader,
    setSelectedSelection,
    setSelectedChoice,
    setFormView,
    openToast,
    menuId,
  } = useUI()

  const [open, setOpen] = useState(false)
  const toggle = () => setOpen(!open)
  const node = useRef()
  const dropdown = useRef(null)

  const executeScroll = () =>
    dropdown.current.scrollTo({
      top: -100,
      behavior: 'smooth',
    })

  const [search, setSearch] = useState('')
  const [searchView, setSearchView] = useState(false)
  const [data, setData] = useState(null)

  // Initialize data state store for search
  useEffect(() => {
    setData(items)
  }, [])

  // useEffect(() => {
  //   console.log({ formSelections })
  // }, [formSelections])

  const excludeColumns = ['__typename', 'selected', 'tenantId', 'selectionId', 'itemId', 'choiceId']

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
    executeScroll()

    switch (variant) {
      case 'HEADER':
        if (!formHeader) {
          setFormHeader(item)
        }

        let header = [item]

        if (
          formHeader &&
          !header.some((current) => {
            return current.headerId === formHeader.headerId
          })
        ) {
          setFormHeader(item)
        }
        break
      case 'SELECTION':
        const stampedSelection = { ...item, UUID }
        const isSelected = formSelections.some((current) => {
          return current.selectionId === stampedSelection.selectionId && current.UUID === UUID
        })

        if (!isSelected) {
          console.log(`ADD SELECTION`)
          setFormSelections(stampedSelection)
        } else {
          console.log(`REMOVE SELECTION`)
          removeFormSelection(stampedSelection.selectionId, UUID)
        }
        break

      case 'CHOICE':
        const stampedChoice = { ...item, UUID }
        const isChoiceSelected = formChoices.some(
          (current) => current.choiceId === item.choiceId && current.UUID === UUID
        )

        if (!isChoiceSelected) {
          console.log(`ADDING CHOICE`)
          setFormChoices(stampedChoice)
        } else {
          console.log(`REMOVING CHOICE`)
          removeFormChoice(stampedChoice.choiceId, UUID)
        }
        break
      default:
        break
    }
  }

  const isItemInSelection = (item) => {
    const header = [formHeader]

    switch (variant) {
      case 'HEADER':
        if (formHeader && header.some((current) => current.headerId === item.headerId)) {
          return true
        }
        return false
      case 'SELECTION':
        if (
          formSelections &&
          formSelections.some((current) => {
            return current.selectionId === item.selectionId && current.UUID === UUID
          })
        ) {
          return true
        }
        return false
      case 'CHOICE':
        if (
          formChoices &&
          formChoices.some((current) => current.choiceId === item.choiceId && current.UUID === UUID)
        ) {
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

    switch (variant) {
      case 'HEADER':
        setFormView('CREATE_HEADER_VIEW')
        break
      case 'CHOICE':
        setFormView('CREATE_CHOICE_VIEW')
        break
      case 'SELECTION':
        setFormView('CREATE_SELECTION_VIEW')
        break
      default:
        break
    }
  }

  const handleSearch = (event) => {
    event.preventDefault()
    setSearchView(!searchView)
  }

  const handleDelete = async (item) => {
    let variables
    let args

    switch (variant) {
      case 'HEADER':
        variables = { headerId: item.headerId }
        args = { variables, menuId }
        await handleDeleteHeader(removeMenuHeader, args).then(() => {
          openToast('Header was successfully deleted', 'SUCCESS')
        })
        break

      case 'SELECTION':
        variables = { selectionId: item.selectionId }
        args = { variables, menuId }
        await handleDeleteSelection(removeMenuSelection, args).then(() => {
          openToast('Selection was successfully deleted', 'SUCCESS')
        })
        break

      case 'CHOICE':
        variables = { choiceId: item.choiceId }
        args = { variables, menuId }
        await handleDeleteChoice(removeMenuChoice, args).then(() => {
          openToast('Choice was successfully deleted', 'SUCCESS')
        })
        break

      default:
        break
    }
  }

  const handleEdit = (item) => {
    switch (variant) {
      case 'CHOICE':
        setSelectedChoice(item)
        setFormView('EDIT_CHOICE_VIEW')
        break

      case 'SELECTION':
        setSelectedSelection(item)
        setFormView('EDIT_SELECTION_VIEW')
        break

      case 'HEADER':
        setSelectedHeader(item)
        setFormView('EDIT_HEADER_VIEW')
        break

      default:
        break
    }
  }

  const renderTags = () => {
    switch (variant) {
      case 'HEADER':
        return formHeader ? (
          <span>{formHeader.name}</span>
        ) : (
          <div className="dd-header__title">
            <p className="dd-header__title--bold">{title}</p>
          </div>
        )

      case 'SELECTION':
        return formSelections && formSelections.length ? (
          formSelections
            .filter((selection) => selection.UUID === UUID)
            .map((selection) => {
              return <span key={selection.selectionId}>{selection.name}</span>
            })
        ) : (
          <div className="dd-header__title">
            <p className="dd-header__title--bold">{title}</p>
          </div>
        )
      case 'CHOICE':
        return formChoices && formChoices.length ? (
          formChoices
            .filter((choice) => choice.UUID === UUID)
            .map((choice) => {
              return <span key={choice.choiceId}>{choice.header}</span>
            })
        ) : (
          <div className="dd-header__title">
            <p className="dd-header__title--bold">{title}</p>
          </div>
        )

      default:
        break
    }
  }

  return (
    <Dropdown node={node} label={label}>
      <main>
        <header tabIndex={0} className="dd-header" onKeyPress={() => toggle(!open)} onClick={() => toggle(!open)}>
          {renderTags()}
          <Plus onClick={changeView} />
        </header>

        {open && (
          <ul className="dd-list">
            <h1>Select {variant.toLowerCase()}</h1>
            <header tabIndex={0} className="dd-header" onKeyPress={() => toggle(!open)} onClick={() => toggle(!open)}>
              {renderTags()}
              <Plus onClick={changeView} />
            </header>
            <li className="dd-list-item">
              <input
                id="search"
                name="search"
                type="search"
                placeholder="Search..."
                value={search}
                onChange={(event) => handleChange(event.target.value)}
                ref={dropdown}
              />
              <Search onClick={handleSearch} className="search-btn" />
            </li>

            {data.map((item, i) => (
              <li className="dd-list-item" key={`${i}-${item.headerId}`}>
                <button type="button" onClick={() => handleOnClick(item)}>
                  <div className="rows">
                    <span>{variant === 'CHOICE' ? item.header : item.name}</span>
                    <span className="sub">
                      {variant === 'CHOICE'
                        ? item.description
                        : variant === 'SELECTION'
                        ? item.valueAdd
                        : variant === 'HEADER'
                        ? item.description
                        : null}{' '}
                    </span>
                  </div>
                  <span>{isItemInSelection(item) && 'Selected'}</span>
                </button>
                <Trash className="action delete-action" onClick={() => handleDelete(item)} />
                <Tools className="action edit-action" onClick={() => handleEdit(item)} />
              </li>
            ))}
          </ul>
        )}
      </main>
    </Dropdown>
  )
}

export default DropDownSelect
