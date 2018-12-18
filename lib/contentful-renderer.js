const richtext = require('@contentful/rich-text-html-renderer')
  .documentToHtmlString

const contentType = elem => elem.sys.contentType

const contentTypeId = elem => contentType(elem).sys.id

const contentTypeExistsIn = (elem, ...types) =>
  types.indexOf(contentTypeId(elem)) >= 0

module.exports = {
  richtext,
  contentType,
  contentTypeId,
  contentTypeExistsIn
}
