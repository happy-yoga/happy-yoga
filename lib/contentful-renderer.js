const path = require('path')
const BLOCKS = require('@contentful/rich-text-types').BLOCKS
const richtextHtmlRenderer = require('@contentful/rich-text-html-renderer')
  .documentToHtmlString

const renderAsset = node => {
  try {
    const asset = node.data.target
    const file = asset.fields.file

    if (['.jpg', '.png', '.svg'].indexOf(path.extname(file.url)) >= 0) {
      if (asset.fields.description) {
        return `<figure>
          <img src="${file.url}" alt="${asset.fields.description}">
          <figcaption>${asset.fields.description}</figcaption>
        </figure>`
      } else {
        return `<img src="${file.url}" alt="">`
      }
    } else {
      throw new Error(`unsupported file type: ${path.extname(file.url)}`)
    }
  } catch (e) {
    return `<p style="color: red;">Asset cannot be displayed (${e.message})</p>`
  }
}

const renderParagraph = node => {
  if (node.content.length === 1 && node.content[0].value === '') {
    // remove empty paragraphs
    return ''
  }
  return `<p>${richtextHtmlRenderer(node)}</p>`
}

const richtextOptions = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: node =>
      `<contentful-embedded-asset>${renderAsset(
        node
      )}</contentful-embedded-asset>`,
    [BLOCKS.PARAGRAPH]: node => renderParagraph(node)
  }
}

const richtext = elem =>
  `<contentful-document>${richtextHtmlRenderer(
    elem,
    richtextOptions
  )}</contentful-document>`

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
