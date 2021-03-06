/* global window, customElements, HTMLElement, $, _ */
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

  const indicator = $('<price-category-opening-indicator />')
  indicator.hide()

  const openClass = 'open'
  const activeClass = 'active'
  class PriceCategories extends HTMLElement {
    constructor (self) {
      self = super(self)
      return self
    }

    handleTapOnCategory (e) {
      this.interactionStartedCategory = e.currentTarget
      this.interactionStartedAt = this.$window.scrollTop()
    }

    toggleCategory (e) {
      if (e.cancelable) {
        e.stopPropagation()
        e.preventDefault()
      }

      if (e.currentTarget === this.interactionStartedCategory) {
        this.interactionEndedAt = this.$window.scrollTop()
        const distance = this.interactionStartedAt - this.interactionEndedAt
        if (distance > 50 || distance < -50) {
          return
        }
      }

      // this.interactionStartedCategory = null

      const priceCategory = $(e.currentTarget)

      this.priceCategories.removeClass(activeClass)
      this.priceCategories.removeClass(openClass)

      if (this.currentActive !== e.currentTarget) {
        this.currentActive = e.currentTarget

        priceCategory.addClass(openClass)

        if (!this.$.hasClass('opened-once')) {
          this.$.addClass('opened-once')
          this.removeCheckForViewPort()
        }

        requestAnimationFrame(() => {
          priceCategory.addClass(activeClass)
        })
      } else {
        this.currentActive = null
        this.$.removeClass('opened-once')
        $(window).on('scroll', this.throttledViewPortChecker)
      }
    }

    checkCategoryInViewPort () {
      const lineOfSight = 200
      const activitiyMaskOffset = 20
      const scrollTop = this.$window.scrollTop() + lineOfSight

      const offset = this.$.offset()

      if (scrollTop > offset.top && scrollTop < offset.top + this.$.height()) {
        this.priceCategories.each((i, c) => {
          const $c = $(c)
          const cOffset = $c.offset()
          if (
            scrollTop > cOffset.top + activitiyMaskOffset &&
            scrollTop < cOffset.top + $c.height() - activitiyMaskOffset
          ) {
            this.priceCategories
              .removeClass('price-category-in-line-of-sight')
              .removeClass('price-category-in-line-of-sight-and-active')

            $c.addClass('price-category-in-line-of-sight')
            requestAnimationFrame(() => {
              $c.addClass('price-category-in-line-of-sight-and-active')
            })
          }
        })
      }
    }

    removeCheckForViewPort () {
      $(window).off('scroll', this.throttledViewPortChecker)
      this.priceCategories
        .removeClass('price-category-in-line-of-sight')
        .removeClass('price-category-in-line-of-sight-and-active')
    }

    connectedCallback () {
      this.$ = $(this)
      this.$window = $(window)
      this.priceCategories = $('price-category', this.$)

      this.priceCategories.on('click touchend', this.toggleCategory.bind(this))

      this.throttledViewPortChecker = _.throttle(
        this.checkCategoryInViewPort.bind(this),
        200,
        { leading: true }
      )

      $(window).on('scroll', this.throttledViewPortChecker)
    }
  }

  customElements.define('price-categories', PriceCategories)
})()
