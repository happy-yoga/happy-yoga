class HyHeroNav extends HTMLElement {
  connectedCallback () {
    this.$ = $(this)
    this.toggleButton = $('hy-nav-toggle', this.$)
    this.nav = $('nav', this.$)
    this.buttonSvg = $('svg', this.toggleButton)

    this.toggleButton.on('click', () => {
      this.buttonSvg.toggleClass('cross')
      this.toggleNavigation()
    })

    $('a', this.$).on('click', () => {
      this.closeNavigation()
    })
  }

  toggleNavigation () {
    this.nav.attr('aria-expanded', !(this.nav.attr('aria-expanded') === 'true'))
  }

  openNavigation () {
    this.nav.attr('aria-expanded', true)
  }

  closeNavigation () {
    this.nav.attr('aria-expanded', false)
  }

  scrollToLink () {}
}

customElements.define('hy-nav', HyHeroNav)
