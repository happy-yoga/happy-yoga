/* global customElements, HTMLElement, Swiper */

class PriceCategories extends HTMLElement {
  constructor (self) {
    self = super(self)
    return self
  }

  connectedCallback () {
    const _ = new Swiper(this, {
      // Optional parameters
      direction: 'horizontal',
      loop: true,
      autoHeight: true,
      slidesPerView: 1,
      keyboard: {
        enabled: true,
        onlyInViewport: false
      },

      // If we need pagination
      pagination: {
        el: '.swiper-pagination'
      },

      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },

      // And if we need scrollbar
      scrollbar: {
        el: '.swiper-scrollbar'
      }
    })

    return _
  }
}

customElements.define('price-categories', PriceCategories)
