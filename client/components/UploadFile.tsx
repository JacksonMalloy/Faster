import { useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { useMutation } from '@apollo/client'
import { UPLOAD_IMAGE } from 'graphql/mutations/image/uploadImage'
import { useUI } from './Context'

type UploadFileProps = {
  image?: any
}

export default function UploadFile({ image }: UploadFileProps) {
  const [uploadImage, { data }] = useMutation(UPLOAD_IMAGE)
  const { setFormImage, formImage, organizationId } = useUI()

  const onDrop = useCallback(
    ([file]) => {
      uploadImage({
        variables: {
          file,
          organization_id: organizationId,
          organization_name: 'Testing',
        },
        update: (store, { data }) => {
          console.log({ data })
        },
      })
    },

    [organizationId, uploadImage]
  )

  useEffect(() => {
    if (data && data.uploadImage) {
      setFormImage(data)
    }
  }, [data, setFormImage])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <>
      {image ? (
        <span {...getRootProps()}>
          {formImage && formImage.uploadImage ? (
            <>
              <input {...getInputProps()} />
              <img src={formImage.uploadImage.image_url} alt="hello" />
            </>
          ) : (
            <>
              <input {...getInputProps()} />
              <img src={image.image_url} alt="hello" />
            </>
          )}
        </span>
      ) : (
        <span {...getRootProps()}>
          <input {...getInputProps()} />
          {formImage && formImage.uploadImage ? (
            <img src={formImage.uploadImage.image_url} alt="hello" />
          ) : (
            <p>Drag + Drop Image Here</p>
          )}
        </span>
      )}
    </>
  )
}
