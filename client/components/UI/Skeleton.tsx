import React from 'react'

import styled from 'styled-components'

const StyledSkeletonLoader = styled.div`
  /*
 * Card Skeleton for Loading
 */
  width: ${({ width }) => width};
  height: ${({ height }) => height};

  /* The loading Class */
  &.loading {
    position: relative;
    background-color: #f5f5f5;
  }

  /* The moving element */
  &.loading::after {
    display: block;
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    transform: translateX(-100%);
    background: -webkit-gradient(
      linear,
      left top,
      right top,
      from(transparent),
      color-stop(rgba(255, 255, 255, 0.2)),
      to(transparent)
    );

    background: linear-gradient(90deg, transparent, white, transparent);

    /* Adding animation */
    animation: loading 0.8s infinite;
  }

  /* Loading Animation */
  @keyframes loading {
    100% {
      transform: translateX(100%);
    }
  }
`

const Skeleton = ({ width, height }) => {
  return <StyledSkeletonLoader className="loading" width={width} height={height}></StyledSkeletonLoader>
}

export default Skeleton
