const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLBoolean, GraphQLID } = require('graphql')
// const { TagType } = require('./menuitem');

const FileType = new GraphQLObjectType({
  name: 'File',
  fields: {
    uploaded_at: { type: GraphQLString },
    image_id: { type: GraphQLID },
    image_url: { type: GraphQLString },
    menu_item_id: { type: GraphQLID },
    menu_id: { type: GraphQLID },
    organization_id: { type: GraphQLString },
  },
})

module.exports = { FileType }
