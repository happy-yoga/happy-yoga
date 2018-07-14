const slug = require('../lib/slug.js')

const courses = {
  monday: [
    { title: 'Gentle Yoga', teacher: 'Claudia', hint: 'sanft', begin: '10:00', end: '11:30' },
    { title: 'Yoga Flow', teacher: 'Julia', hint: 'Level II', begin: '18:15', end: '19:30' },
    { title: 'Yoga Basics', teacher: 'Julia', hint: 'Level 0', begin: '20:00', end: '21:30' }
  ],
  tuesday: [
    { title: 'Happy Devis', teacher: 'Kerstin', hint: 'Schwangere', begin: '10:30', end: '12:00' },
    { title: 'Slow Flow', teacher: 'Julia', hint: 'Level I-II', begin: '18:15', end: '19:30' },
    { title: 'Happy Yoga Routine', teacher: 'Julia', hint: 'Level 0-I', begin: '20:00', end: '21:30' }
  ],
  wednesday: [
    { title: 'Yoga für Senioren', teacher: 'Claudia', begin: '16:30', end: '17:30' },
    { title: 'Starker Rücken', teacher: 'Julia', hint: 'Level I-II', begin: '18:15', end: '19:40' },
    { title: 'Luna Yoga', teacher: 'Claudia', hint: 'sanft', begin: '20:00', end: '21:30' }
  ],
  thursday: [
    { title: 'Morning Yoga auf Zollverein', teacher: 'Julia', begin: '09:00', end: '10:00' },
    { title: 'Happy Baby & Mom', teacher: 'Kerstin', hint: 'Postnatal', begin: '10:00', end: '11:00' },
    { title: 'Yoga Basics', teacher: 'Susi', hint: 'Level I', begin: '18:15', end: '19:30' },
    { title: 'Happy Devis', teacher: 'Kerstin', hint: 'Schwangere', begin: '20:00', end: '21:30' }
  ],
  friday: [
    { title: 'Yoga Flow', teacher: 'Julia', hint: 'Level I-II', begin: '09:00', end: '10:30' },
    { title: 'Yin & Faszienmassage', teacher: 'Tine', hint: 'alle Level', begin: '18:30', end: '20:00' }
  ],
  saturday: [],
  sunday: [{ title: 'Yoga Flow', teacher: 'Kirsten', hint: 'Level I-II', begin: '18:00', end: '19:30' }]
}

class CoursePlan {
  constructor (plan) {
    this.schedule = plan

    let idSequence = 0

    Object.keys(this.schedule).forEach(day => {
      this.schedule[day].forEach(course => {
        course['id'] = idSequence
        course['slug'] = slug(`${course.title} ${course.hint || ''}`)
        idSequence += 1
      })
    })
  }

  get courses () {
    return Object.keys(this.schedule).reduce((acc, curr) => acc.concat(this.schedule[curr]), [])
  }

  findBySlug (slug) {
    return this.courses.find(c => c.slug === slug)
  }
  findAllBySlug (slug) {
    return this.courses.filter(c => c.slug === slug)
  }
}

module.exports = new CoursePlan(courses)
