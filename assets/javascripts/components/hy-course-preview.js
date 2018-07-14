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
        const clone = $('<div />').html(this.content)
        const closeButton = $('<button type="button"></button>').text(this.$.attr('close-text'))

        closeButton.on('click', event => {
          event.stopImmediatePropagation()

          requestAnimationFrame(() => {
            clone.toggleClass('visible')

            setTimeout(() => {
              clone.remove()
            }, 300)
          })
        })

        clone.addClass('course-preview-clone')
        clone.append(closeButton)

        requestAnimationFrame(() => {
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
