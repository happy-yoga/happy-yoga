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

  connectedCallback () {
    this.$ = $(this)
    this.priceCategories = $('price-category', this.$)

    this.priceCategories.on('click', e => {
      e.preventDefault()

      const priceCategory = $(e.currentTarget)
      const isActive = priceCategory.hasClass(activeClass)

      window.requestAnimationFrame(() => {
        this.priceCategories.removeClass(activeClass)
        window.requestAnimationFrame(() => {
          this.priceCategories.removeClass(openClass)

          window.requestAnimationFrame(() => {
            if (!isActive) {
              window.requestAnimationFrame(() => {
                priceCategory.addClass(openClass)
                window.requestAnimationFrame(() => {
                  priceCategory.addClass(activeClass)
                })
              })
            }
          })
        })
      })
    })
  }
}

customElements.define('price-categories', PriceCategories)
