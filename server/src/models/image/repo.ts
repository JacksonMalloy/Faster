import db from '../../db/config'
import { update } from '../../helpers'
import { keysToCamel } from '../../utils'

const cloudinary = require('cloudinary').v2

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

type UploadFileArgs = {
  file: any
  itemId: number
  menuId: number
  tenantId: number
  tenantName: string
}

type ConnectImageWithMenu = {
  imageId: number
  menuId: number
}

type ConnectImageWithItem = {
  imageId: number
  itemId: number
}

export default class ImageRepository {
  async uploadFile({ file, itemId, menuId, tenantId, tenantName }: UploadFileArgs) {
    const insertIntoDB = async ({
      public_id: cloudinary_id,
      secure_url: imageUrl,
    }: {
      public_id: string
      secure_url: string
    }) => {
      const query = `INSERT INTO "fm"."images" (cloudinary_id, image_url, item_id, menu_id, tenant_id) VALUES ($1, $2, $3, $4, $5) RETURNING *`
      const params = [cloudinary_id, imageUrl, itemId, menuId, tenantId]

      try {
        const result = await db.query(query, params)
        return keysToCamel(result.rows[0])
      } catch (error) {
        throw error
      }
    }

    const cloudinaryUpload = async (stream: { pipe: (arg0: any) => void }, tenantId: number, tenantName: string) => {
      return new Promise((resolve, reject) => {
        const streamLoad = cloudinary.uploader.upload_stream(
          {
            tags: tenantId,
            folder: tenantName,
          },
          (error: any, result: unknown) => {
            if (result) {
              resolve(result)
            } else {
              reject(error)
            }
          }
        )

        stream.pipe(streamLoad)
      })
    }

    try {
      const { createReadStream } = await file

      const stream = await createReadStream()
      const result: any = await cloudinaryUpload(stream, tenantId, tenantName)

      const data = await insertIntoDB(result)

      return keysToCamel(data)
    } catch (error) {
      console.info(error)
    }
  }

  async deleteFile(imageId: number) {
    const query = `DELETE FROM "fm"."images" WHERE image_id = $1 RETURNING *`
    const params = [imageId]

    const deleteFromCloudinary = (id: any) => {
      cloudinary.uploader.destroy(id)
    }

    try {
      const result = await db.query(query, params)

      if (!result.rowCount) {
        throw new Error('An Image with that ID does not exist!')
      } else {
        const cloudinary_id = result.rows[0].cloudinary_id
        deleteFromCloudinary(cloudinary_id)
      }
    } catch (error) {
      throw error
    }
  }

  async connectingImageToMenu({ imageId, menuId }: ConnectImageWithMenu) {
    const resetImageId = async (menuId: any) => {
      const query = `UPDATE "fm"."images" SET menu_id = null WHERE menu_id = $1 RETURNING *`
      const params = [menuId]

      try {
        const result = await db.query(query, params)
        return keysToCamel(result.rows)
      } catch (error) {
        throw error
      }
    }

    const query = `UPDATE "fm"."images" SET menu_id = $1 WHERE image_id = $2 RETURNING *`
    const params = [menuId, imageId]

    try {
      await resetImageId(menuId)
      const result = await db.query(query, params)

      return {
        code: 200,
        success: true,
        message: 'Connected Image To Menu',
        connection: {
          connect: keysToCamel(result.rows),
        },
      }
    } catch (error) {
      return {
        code: 503,
        message: error,
        success: false,
      }
    }
  }

  async connectingImageToMenuItem({ imageId, itemId }: ConnectImageWithItem) {
    const resetImageId = async (itemId: any) => {
      const query = `UPDATE "fm"."images" SET item_id = null WHERE item_id = $1 RETURNING *`
      const params = [itemId]

      try {
        const result = await db.query(query, params)
        return keysToCamel(result.rows)
      } catch (error) {
        throw error
      }
    }
    const query = `UPDATE "fm"."images" SET item_id = $1 WHERE image_id = $2 RETURNING *`
    const params = [itemId, imageId]

    try {
      await resetImageId(itemId)
      const result = await db.query(query, params)
      return keysToCamel(result.rows[0])
    } catch (error) {
      throw error
    }
  }

  ////////////////////////////////////////
  /////////// QUERIES ////////////////////
  ////////////////////////////////////////

  async getImagesByTenant(tenantId: number) {
    const query = `SELECT * FROM "fm"."images" WHERE tenant_id = $1`
    const params = [tenantId]

    try {
      const result = await db.query(query, params)
      return keysToCamel(result.rows)
    } catch (error) {
      throw error
    }
  }

  async getImagesByMenu(menuId: number) {
    const query = `SELECT * FROM "fm"."images" WHERE menu_id = $1`
    const params = [menuId]

    try {
      const result = await db.query(query, params)
      return keysToCamel(result.rows)
    } catch (error) {
      throw error
    }
  }

  async getImageById(imageId: number) {
    const query = `SELECT * FROM "fm"."images" WHERE image_id = $1`
    const params = [imageId]

    try {
      const result = await db.query(query, params)
      return keysToCamel(result.rows[0])
    } catch (error) {
      throw error
    }
  }

  async getImageByMenuItem(itemId: number) {
    const query = `SELECT * FROM "fm"."images" WHERE image_id = $1`
    const params = [itemId]

    try {
      const result = await db.query(query, params)
      return keysToCamel(result.rows[0])
    } catch (error) {
      throw error
    }
  }
}
