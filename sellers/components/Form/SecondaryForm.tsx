import { useUI } from 'components/Context'
import { useEffect } from 'react'

import { CreateMenu } from './CreateMenu'
import { EditMenu } from './EditMenu'
import { CreateItem } from './CreateItem'
import { EditItem } from './EditItem'
import { CreateChoice } from './CreateChoice'
import { EditChoice } from './EditChoice'
import { CreateHeader } from './CreateHeader'
import { EditHeader } from './EditHeader'
import { CreateSelection } from './CreateSelection'
import { EditSelection } from './EditSelection'

type FormProps = {
  menu?: {
    menuId: any
    image?: any
    published?: boolean
    title?: string
    tenantId?: number
  }
}

const SecondaryForm = ({ menu }: FormProps) => {
  const { secondaryFormView, setSelectedMenu } = useUI()

  useEffect(() => {
    setSelectedMenu(menu)
    //eslint-disable-next-line
  },[])

  const renderFormView = () => {
    switch (secondaryFormView) {
      case 'CREATE_CHOICE_VIEW':
        return <CreateChoice />
      case 'EDIT_CHOICE_VIEW':
        return <EditChoice />
      case 'CREATE_HEADER_VIEW':
        return <CreateHeader />
      case 'EDIT_HEADER_VIEW':
        return <EditHeader />
      case 'CREATE_SELECTION_VIEW':
        return <CreateSelection />
      case 'EDIT_SELECTION_VIEW':
        return <EditSelection />
      default:
        return null
    }
  }

  return renderFormView()
}

export default SecondaryForm
