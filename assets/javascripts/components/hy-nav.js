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

  class HyHeroNav extends HTMLElement {
    constructor (self) {
      self = super(self)
      return self
    }

    connectedCallback () {
      this.$ = $(this)
      this.window = $(window)
      this.toggleButton = $('hy-nav-toggle', this.$)
      this.nav = $('nav', this.$)
      this.buttonSvg = $('svg', this.toggleButton)
      this.microAnimToggle = $('micro-animation-toggle', this.toggleButton)
      this.scrolling = false
      this.toggledButtonColor = false

      this.toggleButton.on('click', () => {
        this.toggleButton.toggleClass('cross')
        this.buttonSvg.toggleClass('cross')
        this.toggleNavigation()
      })

      $('a', this.$).on('click', () => {
        this.closeNavigation()
      })

      this.window.scroll(this.handleToggleButtonColor.bind(this))
      this.window.on('page:scrolled', this.handleToggleButtonColor.bind(this))
      this.handleToggleButtonColor()
    }

    toggleNavigation () {
      this.$.attr('aria-expanded', !(this.$.attr('aria-expanded') === 'true'))
    }

    openNavigation () {
      this.$.attr('aria-expanded', true)
    }

    closeNavigation () {
      this.buttonSvg.toggleClass('cross')
      this.attr('aria-expanded', false)
    }

    handleToggleButtonColor () {
      if (this.scrolling) {
        return
      }
      this.scrolling = true

      requestAnimationFrame(() => {
        const domRect = this.buttonSvg[0].getBoundingClientRect()
        if (this.window.scrollTop() - domRect.y + 50 > this.window.height()) {
          this.toggleButton.addClass('over-content')
          // this.microAnimToggle.css('color', '#000')
        } else {
          this.toggleButton.removeClass('over-content')
          // this.microAnimToggle.css('color', '')
        }
        this.scrolling = false
      })
    }
  }

  customElements.define('hy-nav', HyHeroNav)
})()
