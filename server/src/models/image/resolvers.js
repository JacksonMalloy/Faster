const cloudinary = require('cloudinary').v2

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const uploadFile = async ({ file, menu_item_id, menu_id, organization_id, organization_name }, context) => {
  const insertIntoDB = async ({ public_id: cloudinary_id, secure_url: image_url }) => {
    const query = `INSERT INTO "fm"."images" (cloudinary_id, image_url, menu_item_id, menu_id, organization_id) VALUES ($1, $2, $3, $4, $5) RETURNING *`
    const params = [cloudinary_id, image_url, menu_item_id, menu_id, organization_id]

    try {
      const result = await context.pool.query(query, params)
      return result.rows[0]
    } catch (error) {
      //console.log(error)
      throw error
    }
  }

  const cloudinaryUpload = async (stream, organization_id, organization_name) => {
    return new Promise((resolve, reject) => {
      const streamLoad = cloudinary.uploader.upload_stream(
        {
          tags: organization_id,
          folder: organization_name,
        },
        (error, result) => {
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

  const { filename, mimetype, createReadStream } = await file
  const stream = await createReadStream()
  const result = await cloudinaryUpload(stream, organization_id, organization_name)
  const data = await insertIntoDB(result)

  return data
}

const deleteFile = async ({ image_id }, context) => {
  const query = `DELETE FROM "fm"."images" WHERE image_id = $1 RETURNING *`
  const params = [image_id]

  const deleteFromCloudinary = (id) => {
    cloudinary.uploader.destroy(id)
    //console.log(`DELETING IMAGE WITH ID ${id}`)
  }

  try {
    const result = await context.pool.query(query, params)

    if (!result.rowCount) {
      throw new Error('An Image with that ID does not exist!')
    } else {
      const cloudinary_id = result.rows[0].cloudinary_id
      //console.log(`Cloudinary ID: `, result.rows[0].cloudinary_id)
      deleteFromCloudinary(cloudinary_id, (error, result) => {
        //console.log(result)
      })
    }
  } catch (error) {
    //console.log(error)
    throw error
  }
}

const connectingImageToMenu = async ({ image_id, menu_id }, context) => {
  const resetImageId = async (menu_id) => {
    const query = `UPDATE "fm"."images" SET menu_id = null WHERE menu_id = $1 RETURNING *`
    const params = [menu_id]

    try {
      const result = await context.pool.query(query, params)

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
    const result = await context.pool.query(query, params)
    //console.log(result)

    return result.rows[0]
  } catch (error) {
    //console.log(error)
    throw error
  }
}

const connectingImageToMenuItem = async ({ image_id, menu_item_id }, context) => {
  const resetImageId = async (menu_item_id) => {
    const query = `UPDATE "fm"."images" SET menu_item_id = null WHERE menu_item_id = $1 RETURNING *`
    const params = [menu_item_id]

    try {
      const result = await context.pool.query(query, params)

      //console.log(result.rows)
      return result.rows
    } catch (error) {
      //console.log(error)
      throw error
    }
  }
  const query = `UPDATE "fm"."images" SET menu_item_id = $1 WHERE image_id = $2 RETURNING *`
  const params = [menu_item_id, image_id]

  try {
    await resetImageId(menu_item_id)
    const result = await context.pool.query(query, params)
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

const getImagesByOrganization = async ({ organization_id }, context) => {
  const query = `SELECT * FROM "fm"."images" WHERE organization_id = $1`
  const params = [organization_id]

  try {
    const result = await context.pool.query(query, params)
    return result.rows
  } catch (error) {
    //console.log(error)
    throw error
  }
}

const getImagesByMenu = async ({ menu_id }, context) => {
  const query = `SELECT * FROM "fm"."images" WHERE menu_id = $1`
  const params = [menu_id]

  try {
    const result = await context.pool.query(query, params)
    return result.rows
  } catch (error) {
    //console.log(error)
    throw error
  }
}

const getImageById = async ({ image_id }, context) => {
  const query = `SELECT * FROM "fm"."images" WHERE image_id = $1`
  const params = [image_id]

  try {
    const result = await context.pool.query(query, params)
    return result.rows[0]
  } catch (error) {
    //console.log(error)
    throw error
  }
}

const getImageByMenuItem = async ({ menu_item_id }, context) => {
  const query = `SELECT * FROM "fm"."images" WHERE menu_item_id = $1`
  const params = [menu_item_id]

  try {
    const result = await context.pool.query(query, params)
    return result.rows[0]
  } catch (error) {
    //console.log(error)
    throw error
  }
}

module.exports = {
  uploadFile,
  deleteFile,
  getImagesByOrganization,
  getImagesByMenu,
  getImageById,
  getImageByMenuItem,
  connectingImageToMenu,
  connectingImageToMenuItem,
}
