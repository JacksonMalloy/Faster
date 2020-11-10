import { useState } from 'react'
import styled from 'styled-components'
import { Button } from './common/Button'

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

type QAtypes = {
  state?: any
}

export const QAtools = (state: QAtypes) => {
  const [isOpen, setIsOpen] = useState(false)

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
