import ReactDOM from 'react-dom'
import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

const StyledTooltip = styled.div`
  position: fixed;
  background: #2b2d33;
  box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  padding: 8px 8px;
  color: #ffffff;

  /*
  ${({ left, top }) => styled.css`
    left: ${left}px;
    top: ${top}px;
  `};

  ${({ show }) => !show && 'visibility: hidden;'}; */

  &:after {
    content: '';
    position: absolute;
    left: calc(50% - 2px);
    top: -4px;
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;

    border-bottom: 4px solid black;
  }
`

export const Tooltip = (props) => {
  const { children, ...pos } = props
  const [innerPos, setPos] = useState(pos)
  const ref = useRef(null)

  useEffect(() => {
    const current = ref.current
    if (current) {
      setPos({ top: pos.top, left: pos.left - current.offsetWidth / 2, show: true })
    }
  }, [ref])

  return (
    <StyledTooltip {...innerPos} ref={ref}>
      {children}
    </StyledTooltip>
  )
}

export const useTooltip = (message) => {
  const ref = useRef(null)
  const state = { setIsShow: null }
  const shift = 4
  let container = null

  const hoverHandler = (current, flag) => {
    console.log('hovered')

    if (flag) {
      container = document.createElement('div')
      document.body.append(container)
      const { top, left } = current.getBoundingClientRect()
      const pos = { top: top + current.offsetHeight + shift, left: left + current.offsetWidth / 2 }

      if (typeof window !== 'undefined') ReactDOM.render(<Tooltip {...pos}>{message}</Tooltip>, container)
    } else {
      if (container) {
        container.remove()
      }
    }
  }

  useEffect(() => {
    const current = ref.current
    if (current) {
      current.addEventListener('mouseover', () => hoverHandler(current, true))
      current.addEventListener('mouseout', () => hoverHandler(current, false))
    }
    return () => {
      if (container) {
        container.remove()
      }
    }
  }, [])

  return ref
}
