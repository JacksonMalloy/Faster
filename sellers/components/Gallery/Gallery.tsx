import React, { Fragment, useState, useEffect } from 'react'
import { useQuery, gql } from '@apollo/client'
import styled from 'styled-components'
import { IMAGES_BY_ORGANIZATION } from 'graphql/queries/image/imagesByOrganization'

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

const Gallery = ({ organization_id }) => {
  const { data, loading, error } = useQuery(IMAGES_BY_ORGANIZATION, {
    variables: { organization_id: organization_id },
  })

  // if (loading) return <p>loading</p>
  // if (error) return <p>ERROR</p>
  // if (!data) return <p>Not found</p>

  const [selected, setSelected] = useState([])

  const handleClick = (image) => () => {
    // Check if item is wihtin selected array
    const isSelected = selected.filter((item) => item !== image.image_id)

    // iSet state according to if lengths of arrays match
    if (isSelected.length === selected.length) {
      setSelected([...selected, image.image_id])
    } else {
      setSelected(isSelected)
    }
  }

  const isActivelySelected = (image) => selected.includes(image.image_id)

  // useEffect(() => {
  //   //console.log(selected)
  // }, [selected])

  return (
    <StyledGallery>
      {data &&
        data.imagesByOrganization &&
        data.imagesByOrganization.map((image) => (
          <StyledImage key={image.image_id} onClick={handleClick(image)}>
            <img src={image.image_url} className="gallery_image" />
            {isActivelySelected(image) ? <StyledBorder /> : null}
          </StyledImage>
        ))}
    </StyledGallery>
  )
}

export default Gallery
