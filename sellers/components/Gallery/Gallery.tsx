import React, { Fragment, useState, useEffect } from 'react'
import { useQuery, gql } from '@apollo/client'
import styled from 'styled-components'
import { IMAGES_BY_TENANT } from 'graphql/queries/image/imagesByTenant'

const StyledGallery = styled.section`
  padding-left: 300px;

  top: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 300px);
  grid-gap: 15px;

  .gallery_image {
    width: 100%;
    height: 300px;
    object-fit: cover;
    z-index: 5;
  }
`

const StyledImage = styled.div`
  height: 300px;
  position: relative;
`

const StyledBorder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 3;
  border: 10px black solid;
`

const Gallery = ({ tenantId }) => {
  const { data, loading, error } = useQuery(IMAGES_BY_TENANT, {
    variables: { tenantId: tenantId },
  })

  // if (loading) return <p>loading</p>
  // if (error) return <p>ERROR</p>
  // if (!data) return <p>Not found</p>

  const [selected, setSelected] = useState([])

  const handleClick = (image) => () => {
    // Check if item is wihtin selected array
    const isSelected = selected.filter((item) => item !== image.imageId)

    // iSet state according to if lengths of arrays match
    if (isSelected.length === selected.length) {
      setSelected([...selected, image.imageId])
    } else {
      setSelected(isSelected)
    }
  }

  const isActivelySelected = (image) => selected.includes(image.imageId)

  // useEffect(() => {
  //   //console.log(selected)
  // }, [selected])

  return (
    <StyledGallery>
      {data &&
        data.imagesByTenant &&
        data.imagesByTenant.map((image) => (
          <StyledImage key={image.imageId} onClick={handleClick(image)}>
            <img src={image.imageUrl} className="gallery_image" />
            {isActivelySelected(image) ? <StyledBorder /> : null}
          </StyledImage>
        ))}
    </StyledGallery>
  )
}

export default Gallery
