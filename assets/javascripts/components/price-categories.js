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

  toggleOpenCategory (e) {
    e.stopPropagation()
    e.preventDefault()

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
    this.priceCategories = $('price-category', this.$)

    this.priceCategories.on(
      'click touchstart',
      this.toggleOpenCategory.bind(this)
    )
  }
}

customElements.define('price-categories', PriceCategories)
