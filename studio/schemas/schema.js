// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'
import blogPostImage from './blogPostImage'
import clients from './clients'
import demotext from './demotext'
import events from './events'
import menu from './menu'
import pages from './pages'
import podcast from './podcast'
import podCastPlayer from './podcastPlayer'
import portableTextDemo from './portableTextDemo'
import person from './person'
import posts from "./posts"
import quotes from './quotes'
import work from './work'
import blogInternalLinkBox from './blogInternalLinkBox'
import youTubeLink from './youTubeLink'
// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    /* Your types here! */
    blogPostImage,
    podCastPlayer,
    posts,
    clients,
    demotext,
    events,
    menu,
    pages,
    person,
    podcast,
    portableTextDemo,
    quotes,
    work,
    blogInternalLinkBox,
    youTubeLink
  ]),
})
