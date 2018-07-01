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
  connectedCallback () {
    this.$ = $(this)
    this.toggleButton = $('hy-nav-toggle', this.$)
    this.nav = $('nav', this.$)
    this.buttonSvg = $('svg', this.toggleButton)
    this.microAnimToggle = $('micro-animation-toggle', this.toggleButton)
    this.scrolling = false
    this.toggledButtonColor = false
    this.window = $('main')

    this.toggleButton.on('click', () => {
      this.buttonSvg.toggleClass('cross')
      this.toggleNavigation()
    })

    $('a', this.$).on('click', () => {
      this.closeNavigation()
    })

    this.window.scroll(this.handleToggleButtonColor.bind(this))
    this.window.on('page:scrolled', this.handleToggleButtonColor.bind(this))
  }

  toggleNavigation () {
    this.nav.attr('aria-expanded', !(this.nav.attr('aria-expanded') === 'true'))
  }

  openNavigation () {
    this.nav.attr('aria-expanded', true)
  }

  closeNavigation () {
    this.buttonSvg.toggleClass('cross')
    this.nav.attr('aria-expanded', false)
  }

  handleToggleButtonColor () {
    if (this.scrolling) {
      return
    }
    this.scrolling = true

    requestAnimationFrame(() => {
      const domRect = this.buttonSvg[0].getBoundingClientRect()
      if (this.window.scrollTop() - domRect.y > this.window.height()) {
        this.microAnimToggle.css('color', '#000')
      } else {
        this.microAnimToggle.css('color', '')
      }
      this.scrolling = false
    })
  }
}

customElements.define('hy-nav', HyHeroNav)

// $(window).scroll( function(){
//
//           //get scroll position
//           var topWindow = $(window).scrollTop();
//           //multipl by 1.5 so the arrow will become transparent half-way up the page
//           //- var topWindow = topWindow;
//
//           //get height of window
//           var windowHeight = $(window).height();
//
//           //set position as percentage of how far the user has scrolled
//           var position = topWindow / windowHeight;
//           //invert the percentage
//           position = 1 - position;
//
//           //define arrow opacity as based on how far up the page the user has scrolled
//           //no scrolling = 1, half-way up the page = 0
//           $('.scroll-indicator').css('opacity', Math.max(0, position));
//           $('.scroll-menu').css('opacity', Math.min(1, 1 - position));
//
//         });
//
//         $('.map-link').on('click', function(e) {
//           e.preventDefault();
//
//           if ((navigator.platform.indexOf("iPhone") != -1)
//             || (navigator.platform.indexOf("iPod") != -1)
//             || (navigator.platform.indexOf("iPad") != -1)
//             || (navigator.platform.indexOf("MacIntel") != -1)) {
//            window.open("maps://maps.google.com/maps?daddr=Planckstra%C3%9Fe+115,+45147+Essen&amp;ll=");
//          } else {
//            window.open("http://maps.google.com/maps?daddr=Planckstra%C3%9Fe+115,+45147+Essen&amp;ll=");
//          }
//         });
