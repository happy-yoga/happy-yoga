/* global window, customElements, HTMLElement, $ */

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

  toggleOpenCategory (e) {
    if (e.cancelable) {
      e.stopPropagation()
      e.preventDefault()
    }

    if (e.currentTarget === this.interactionStartedCategory) {
      this.interactionEndedAt = this.$window.scrollTop()
      const distance = this.interactionStartedAt - this.interactionEndedAt
      if (distance > 20 || distance < -20) {
        return
      }
    }

    // this.interactionStartedCategory = null

    const priceCategory = $(e.currentTarget)
    const isActive = priceCategory.hasClass(activeClass)

    this.priceCategories.removeClass(activeClass)
    this.priceCategories.removeClass(openClass)

    if (!isActive) {
      priceCategory.addClass(openClass)
      window.requestAnimationFrame(() => {
        priceCategory.addClass(activeClass)
      })
    }
  }

  connectedCallback () {
    this.$ = $(this)
    this.$window = $(window)
    this.priceCategories = $('price-category', this.$)

    // this.priceCategories.on('touchstart', this.handleTapOnCategory.bind(this))

    this.priceCategories.on(
      'click touchend',
      { cancelable: true },
      this.toggleOpenCategory.bind(this)
    )
  }
}

customElements.define('price-categories', PriceCategories)
