class HyCourseBackground extends HTMLElement {
  constructor (self) {
    self = super(self)
    return self
  }

  connectedCallback () {
    this.$ = $(this)

    for (let i = 0; i < Math.random() * 15 + 15; i++) {
      this.createItem(i)
    }
  }

  createItem (count) {
    const item = $('<hy-course-background-item class="rellax" />')
    const itemDistribution = ['ball', 'ball', 'line', 'line', 'line']
    const type = itemDistribution[count % itemDistribution.length] // equal number of balls and lines

    item.addClass(type)
    item.attr('data-rellax-speed', -1 * Math.ceil(Math.random() * 5))
    item.css('margin-left', `${Math.ceil(Math.random() * 20) * Math.ceil(Math.random() * 5)}vw`)
    item.css('margin-top', `${Math.ceil(Math.random() * 10)}vh`)

    if (type === 'ball') {
      item.css('font-size', `${Math.floor(Math.random() * 2) + 0.5}rem`)
    } else {
      item.css('width', `${Math.ceil(Math.random() * 3) * 0.3}rem`)
      item.css('height', `${Math.ceil(Math.random() * 20) + 20}rem`)
    }

    this.$.append(item)
  }
}

customElements.define('hy-course-background', HyCourseBackground)
