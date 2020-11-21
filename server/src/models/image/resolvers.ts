import ImageRepository from './repo'
import { isAuthenticated, isAdmin, isDirector } from '../../utils'

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

export const ImageQueries = {
  imageById: async (parent: any, { image_id }: { image_id: number }, context: any, info: any) => {
    const imageRepo = new ImageRepository()
    const data = await imageRepo.getImageById(image_id)
    return data
  },
  imageByMenuItem: async (parent: any, { item_id }: { item_id: number }, context: any, info: any) => {
    const imageRepo = new ImageRepository()
    const data = await imageRepo.getImageByMenuItem(item_id)
    return data
  },
  imagesByTenant: async (
    parent: any,
    { tenant_id }: { tenant_id: number },
    context: any,
    info: any
  ) => {
    const imageRepo = new ImageRepository()
    const data = await imageRepo.getImagesByTenant(tenant_id)
    return data
  },
  imageByMenu: async (parent: any, { menu_id }: { menu_id: number }, context: any, info: any) => {
    const imageRepo = new ImageRepository()
    const data = await imageRepo.getImagesByMenu(menu_id)
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
  deleteImage: async (parent: any, { image_id }: { image_id: number }, context: any, info: any) => {
    if (!isDirector(context)) return { code: 401, message: 'Not Authorized', success: false }
    const imageRepo = new ImageRepository()
    const data = await imageRepo.deleteFile(image_id)
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
