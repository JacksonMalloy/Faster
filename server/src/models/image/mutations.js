const { GraphQLID, GraphQLString, GraphQLBoolean, GraphQLNonNull } = require('graphql')

const { FileType } = require('../../typeDefs/file')
const { GraphQLUpload } = require('graphql-upload')
const { uploadFile, deleteFile, connectingImageToMenu, connectingImageToMenuItem } = require('./resolvers')

const uploadImage = {
  type: FileType,
  description: 'Upload an image',
  args: {
    file: {
      description: 'Image file.',
      type: GraphQLUpload,
    },
    menu_item_id: { type: GraphQLID },
    menu_id: { type: GraphQLID },
    organization_id: { type: new GraphQLNonNull(GraphQLID) },
    organization_name: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (obj, args, context, info) => uploadFile(args, context),
}

const deleteImage = {
  type: FileType,
  description: 'Delete an image',
  args: {
    image_id: { type: GraphQLID },
  },
  resolve: async (obj, args, context, info) => await deleteFile(args, context),
}

const connectImageToMenu = {
  type: FileType,
  description: 'Connect an image to a menu',
  args: {
    image_id: { type: GraphQLID },
    menu_id: { type: GraphQLID },
  },
  resolve: async (obj, args, context, info) => await connectingImageToMenu(args, context),
}

const connectImageToMenuItem = {
  type: FileType,
  description: 'Connect an image to a menu-item',
  args: {
    image_id: { type: GraphQLID },
    menu_item_id: { type: GraphQLID },
  },
  resolve: async (obj, args, context, info) => await connectingImageToMenuItem(args, context),
}

module.exports = { uploadImage, deleteImage, connectImageToMenu, connectImageToMenuItem }
