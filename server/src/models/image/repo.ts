import db from '../../db/config'
import { update } from '../../helpers'

const cloudinary = require('cloudinary').v2

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

type UploadFileArgs = {
  file: any
  item_id: number
  menu_id: number
  tenant_id: number
  tenant_name: string
}

type ConnectImageWithMenu = {
  image_id: number
  menu_id: number
}

type ConnectImageWithItem = {
  image_id: number
  item_id: number
}

export default class ImageRepository {
  async uploadFile({ file, item_id, menu_id, tenant_id, tenant_name }: UploadFileArgs) {
    const insertIntoDB = async ({
      public_id: cloudinary_id,
      secure_url: image_url,
    }: {
      public_id: string
      secure_url: string
    }) => {
      const query = `INSERT INTO "fm"."images" (cloudinary_id, image_url, item_id, menu_id, tenant_id) VALUES ($1, $2, $3, $4, $5) RETURNING *`
      const params = [cloudinary_id, image_url, item_id, menu_id, tenant_id]

      try {
        const result = await db.query(query, params)
        return result.rows[0]
      } catch (error) {
        //console.log(error)
        throw error
      }
    }

    const cloudinaryUpload = async (
      stream: { pipe: (arg0: any) => void },
      tenant_id: number,
      tenant_name: string
    ) => {
      console.log('Cloudinary Upload')

      return new Promise((resolve, reject) => {
        const streamLoad = cloudinary.uploader.upload_stream(
          {
            tags: tenant_id,
            folder: tenant_name,
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
      const result: any = await cloudinaryUpload(stream, tenant_id, tenant_name)

      const data = await insertIntoDB(result)

      return data
    } catch (error) {
      console.log(error)
    }
  }

  async deleteFile(image_id: number) {
    const query = `DELETE FROM "fm"."images" WHERE image_id = $1 RETURNING *`
    const params = [image_id]

    const deleteFromCloudinary = (id: any) => {
      cloudinary.uploader.destroy(id)
      //console.log(`DELETING IMAGE WITH ID ${id}`)
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
      //console.log(error)
      throw error
    }
  }

  async connectingImageToMenu({ image_id, menu_id }: ConnectImageWithMenu) {
    const resetImageId = async (menu_id: any) => {
      const query = `UPDATE "fm"."images" SET menu_id = null WHERE menu_id = $1 RETURNING *`
      const params = [menu_id]

      try {
        const result = await db.query(query, params)

        //console.log(result.rows)
        return result.rows
      } catch (error) {
        //console.log(error)
        throw error
      }
    }

    const query = `UPDATE "fm"."images" SET menu_id = $1 WHERE image_id = $2 RETURNING *`
    const params = [menu_id, image_id]

    try {
      await resetImageId(menu_id)
      const result = await db.query(query, params)
      // console.log(`IMAGE TEST`, result.rows)

      return {
        code: 200,
        success: true,
        message: 'Connected Image To Menu',
        connection: {
          connect: result.rows,
        },
      }
    } catch (error) {
      //console.log(error)
      return {
        code: 503,
        message: `Sorry we're having issues processing your request. Please try again later!`,
        success: false,
        connection: {
          connect: {},
        },
      }
    }
  }

  async connectingImageToMenuItem({ image_id, item_id }: ConnectImageWithItem) {
    const resetImageId = async (item_id: any) => {
      const query = `UPDATE "fm"."images" SET item_id = null WHERE item_id = $1 RETURNING *`
      const params = [item_id]

      try {
        const result = await db.query(query, params)

        //console.log(result.rows)
        return result.rows
      } catch (error) {
        //console.log(error)
        throw error
      }
    }
    const query = `UPDATE "fm"."images" SET item_id = $1 WHERE image_id = $2 RETURNING *`
    const params = [item_id, image_id]

    try {
      await resetImageId(item_id)
      const result = await db.query(query, params)
      //console.log(result)

      return result.rows[0]
    } catch (error) {
      //console.log(error)
      throw error
    }
  }

  ////////////////////////////////////////
  /////////// QUERIES ////////////////////
  ////////////////////////////////////////

  async getImagesByTenant(tenant_id: number) {
    const query = `SELECT * FROM "fm"."images" WHERE tenant_id = $1`
    const params = [tenant_id]

    try {
      const result = await db.query(query, params)
      return result.rows
    } catch (error) {
      //console.log(error)
      throw error
    }
  }

  async getImagesByMenu(menu_id: number) {
    const query = `SELECT * FROM "fm"."images" WHERE menu_id = $1`
    const params = [menu_id]

    try {
      const result = await db.query(query, params)
      return result.rows
    } catch (error) {
      //console.log(error)
      throw error
    }
  }

  async getImageById(image_id: number) {
    const query = `SELECT * FROM "fm"."images" WHERE image_id = $1`
    const params = [image_id]

    try {
      const result = await db.query(query, params)
      return result.rows[0]
    } catch (error) {
      //console.log(error)
      throw error
    }
  }

  async getImageByMenuItem(item_id: number) {
    const query = `SELECT * FROM "fm"."images" WHERE item_id = $1`
    const params = [item_id]

    try {
      const result = await db.query(query, params)
      return result.rows[0]
    } catch (error) {
      //console.log(error)
      throw error
    }
  }
}
