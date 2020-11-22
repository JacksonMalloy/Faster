import ImageRepository from './repo'
import { isAuthenticated, isAdmin, isDirector } from '../../utils'

type UploadFileArgs = {
  file: any
  menu_item_id: number
  menu_id: number
  organization_id: number
  organization_name: string
}

type ConnectImageWithMenu = {
  image_id: number
  menu_id: number
}

type ConnectImageWithItem = {
  image_id: number
  menu_item_id: number
}

export const ImageQueries = {
  imageById: async (parent: any, { image_id }: { image_id: number }, context: any, info: any) => {
    const imageRepo = new ImageRepository()
    const data = await imageRepo.getImageById(image_id)
    return data
  },
  imageByMenuItem: async (parent: any, { menu_item_id }: { menu_item_id: number }, context: any, info: any) => {
    const imageRepo = new ImageRepository()
    const data = await imageRepo.getImageByMenuItem(menu_item_id)
    return data
  },
  imagesByOrganization: async (
    parent: any,
    { organization_id }: { organization_id: number },
    context: any,
    info: any
  ) => {
    const imageRepo = new ImageRepository()
    const data = await imageRepo.getImagesByOrganization(organization_id)
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
