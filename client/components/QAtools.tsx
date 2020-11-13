import { useState } from 'react'
import styled from 'styled-components'
import { Button } from './common/Button'
import { useUI } from './Context'

const StyledQA = styled.div`
  position: fixed;
  bottom: 30px;
  left: 30px;
  z-index: 10;

  pre {
    z-index: 15;
    width: 100%;
    background-color: black;
    color: white;
    padding: 5rem;
    position: fixed;
    bottom: 0;
    left: 300px;
  }

  button {
    z-index: 16;
  }
`

export const QAtools = () => {
  const [isOpen, setIsOpen] = useState(false)
  const state = useUI()

  const renderQATools = () => {
    if (isOpen) {
      return <pre>{JSON.stringify(state, null, 2)}</pre>
    }

    return null
  }

  return (
    <StyledQA>
      <Button value="qa" onClick={() => setIsOpen(!isOpen)}>
        Show QA Tools
      </Button>
      {renderQATools()}
    </StyledQA>
  )
}
