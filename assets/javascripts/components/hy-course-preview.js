/* global $, HTMLElement, customElements */

;(() => {
  const requestAnimationFrame = (function () {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60)
      }
    )
  })()

  const closeButtonElement = (closeText, clone) => {
    const closeButton = $('<button type="button"></button>').text(closeText)

    closeButton.on('click', event => {
      event.stopImmediatePropagation()

      requestAnimationFrame(() => {
        clone.toggleClass('visible')

        setTimeout(() => {
          clone.remove()
        }, 300)
      })
    })

    return closeButton
  }

  const cloneContentElement = () =>
    $('<div class="course-preview-clone-content" />')

  class HyCoursePreview extends HTMLElement {
    constructor (self) {
      self = super(self)
      return self
    }

    connectedCallback () {
      this.$ = $(this)
      this.a = $('a', this.$)

      this.addEventListener('click', event => {
        event.preventDefault()
        $('course-preview-clone').remove() // kill all the clones

        this.content = this.a.html()
        const clone = $('<course-preview-clone />')
        const cloneContent = cloneContentElement()

        clone.addClass('course-preview-clone')
        clone.append(cloneContent)
        cloneContent.html(this.content)

        cloneContent.append(
          closeButtonElement(this.$.attr('close-text'), clone)
        )

        requestAnimationFrame(() => {
          clone.on('click', e => {
            e.preventDefault()
            e.stopPropagation()
          })

          this.$.append(clone)

          requestAnimationFrame(() => {
            clone.toggleClass('visible')
          })
        })
      })
    }

    disconnectedCallback () {
      // this.$ = $(this)
      this.removeEventListener('click')
    }
  }

  customElements.define('hy-course-preview', HyCoursePreview)
})()
