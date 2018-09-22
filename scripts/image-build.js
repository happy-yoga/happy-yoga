const path = require('path')
const imagemin = require('imagemin')
const imageminMozjpeg = require('imagemin-mozjpeg')
const imageminPngquant = require('imagemin-pngquant')
const imageminSvgo = require('imagemin-svgo')

const sharp = require('sharp')

const breakpoints = [375, 768, 1366, 1800]

imagemin(['assets/images/*.{jpg,png}'], 'dist/images', {
  plugins: production() ? [imageminMozjpeg(), imageminPngquant({ quality: '65-80' })] : []
})
  .then(images => {
    images.forEach(original => {
      sharp(original.data)
        .metadata()
        .then(metadata => {
          createCroppings(original, metadata)
        })
        .catch(error => {
          console.log(error)
        })
    })

    //= > [{data: <Buffer 89 50 4e …>, path: 'build/images/foo.jpg'}, …]
  })
  .catch(error => {
    console.log(error)
  })

imagemin(['assets/images/*.svg'], 'dist/images', {
  plugins: production() ? [imageminSvgo()] : []
})
  .then(images => {
    images.forEach(original => {
      sharp(original.data)
        .png()
        .toFile(
          original.path
            .split(path.extname(original.path))
            .concat('.png')
            .join('')
        )
    })
  })
  .catch(error => {
    console.log(error)
  })

function createCroppings (image, metadata) {
  const original = sharp(image.data)

  const calculations = breakpoints.map(breakpoint => {
    if (metadata.width >= breakpoint) {
      return original
        .clone()
        .resize(breakpoint)
        .toFile(imageCroppingPath(image.path, breakpoint))
    }
  })

  Promise.all(calculations)
    .then(() => {
      console.log('optimized and resized')
    })
    .catch(error => {
      console.log(error)
    })
}

function imageCroppingPath (originalImagePath, cropping) {
  const ext = path.extname(originalImagePath)

  return originalImagePath.split(ext).join(`.${cropping}${ext}`)
}

function production () {
  return process.env.NODE_ENV === 'production'
}
