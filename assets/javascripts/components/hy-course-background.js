class HyCourseBackground extends HTMLElement {
  constructor (self) {
    self = super(self)
    return self
  }

  connectedCallback () {
    this.$ = $(this)

    for (let i = 0; i < Math.random() * 20 + 20; i++) {
      this.createItem(i)
    }
  }

  createItem (count) {
    const item = $('<hy-course-background-item class="rellax" />')
    const type = ['ball', 'line'][count % 2] // equal number of balls and lines

    item.addClass(type)
    item.attr('data-rellax-speed', -1 * Math.ceil(Math.random() * 5))
    item.css('margin-left', `${Math.ceil(Math.random() * 59)}vw`)
    item.css('margin-top', `${Math.ceil(Math.random() * 10)}vh`)

    if (type === 'ball') {
      item.css('font-size', `${Math.floor(Math.random() * 2) + 1}rem`)
    }

    this.$.append(item)
  }
}

customElements.define('hy-course-background', HyCourseBackground)

// mixin bg-item()
//   - const type = ['ball', 'line'][Math.floor(Math.random() * 2)]
//   - const speed = -1 * Math.ceil(Math.random()*5)
//   - const styles = [ `margin-left: ${Math.ceil(Math.random() * 99)}vw`, `margin-top: ${Math.ceil(Math.random() * 20)}vh` ]
//   hy-course-background-item(class=`${type} rellax` data-rellax-speed=speed style=styles.join(';'))
//
//
// mixin course-overview(courses)
//   hy-course-overview
//     hy-course-background
//       - let n = 0;
//       while n < Math.ceil(Math.random() * 20)
//         - n += 1
//         - console.log(n)
//         +bg-item()
