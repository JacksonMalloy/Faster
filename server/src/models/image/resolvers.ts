import ImageRepository from './repo'
import { isAuthenticated, isAdmin, isDirector } from '../../utils'

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

export const ImageQueries = {
  imageById: async (parent: any, { imageId }: { imageId: number }, context: any, info: any) => {
    const imageRepo = new ImageRepository()
    const data = await imageRepo.getImageById(imageId)
    return data
  },
  imageByMenuItem: async (parent: any, { itemId }: { itemId: number }, context: any, info: any) => {
    const imageRepo = new ImageRepository()
    const data = await imageRepo.getImageByMenuItem(itemId)
    return data
  },
  imagesByTenant: async (parent: any, { tenantId }: { tenantId: number }, context: any, info: any) => {
    const imageRepo = new ImageRepository()
    const data = await imageRepo.getImagesByTenant(tenantId)
    return data
  },
  imageByMenu: async (parent: any, { menuId }: { menuId: number }, context: any, info: any) => {
    const imageRepo = new ImageRepository()
    const data = await imageRepo.getImagesByMenu(menuId)
    return data
  },
}

export const ImageMutations = {
  uploadImage: async (parent: any, args: UploadFileArgs, context: any, info: any) => {
    if (!isDirector(context)) return { code: 401, message: 'Not Authorized', success: false }
    const imageRepo = new ImageRepository()
    const data = await imageRepo.uploadFile(args)
    return data
  },
  deleteImage: async (parent: any, { imageId }: { imageId: number }, context: any, info: any) => {
    if (!isDirector(context)) return { code: 401, message: 'Not Authorized', success: false }
    const imageRepo = new ImageRepository()
    const data = await imageRepo.deleteFile(imageId)
    return data
  },
  connectImageToMenu: async (parent: any, args: ConnectImageWithMenu, context: any, info: any) => {
    if (!isDirector(context)) return { code: 401, message: 'Not Authorized', success: false }
    const imageRepo = new ImageRepository()
    const data = await imageRepo.connectingImageToMenu(args)
    return data
  },
  connectImageToMenuItem: async (parent: any, args: ConnectImageWithItem, context: any, info: any) => {
    if (!isDirector(context)) return { code: 401, message: 'Not Authorized', success: false }
    const imageRepo = new ImageRepository()
    const data = await imageRepo.connectingImageToMenuItem(args)
    return data
  },
}
