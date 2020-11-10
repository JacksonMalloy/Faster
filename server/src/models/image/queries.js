const { getImagesByOrganization, getImagesByMenu, getImageById, getImageByMenuItem } = require('./resolvers')
const { FileType } = require('../../typeDefs/file')

const { GraphQLList, GraphQLID } = require('graphql')

const imagesByOrganization = {
  type: new GraphQLList(FileType),
  description: 'Get images by organization',
  args: { organization_id: { type: GraphQLID } },
  resolve: async (obj, args, context, info) => await getImagesByOrganization(args, context),
}

const imagesByMenu = {
  type: new GraphQLList(FileType),
  description: 'Get images in a menu',
  args: { menu_id: { type: GraphQLID } },
  resolve: async (obj, args, context, info) => await getImagesByMenu(args, context),
}

const imageById = {
  type: FileType,
  description: 'Get an image by ID',
  args: { image_id: { type: GraphQLID } },
  resolve: async (obj, args, context, info) => await getImageById(args, context),
}

const imageByMenuItem = {
  type: FileType,
  description: 'Get an image of a menu-item',
  args: { menu_item_id: { type: GraphQLID } },
  resolve: async (obj, args, context, info) => await getImageByMenuItem(args, context),
}

module.exports = { imagesByOrganization, imagesByMenu, imageById, imageByMenuItem }
