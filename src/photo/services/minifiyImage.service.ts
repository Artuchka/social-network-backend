import { Injectable } from '@nestjs/common'

import { dynamicImport } from 'tsimportlib'

// import immin from

let imagemin = null
// let webpmin = null
// let pngquant = null
// let jpegtran = null
// let optipng = null
// let svgo = null
// let jpegrecompress = null
async function main() {
  imagemin = (await dynamicImport('imagemin', module)).default
  // jpegtran = (await dynamicImport('imagemin-jpegtran', module)).default
  // webpmin = (await dynamicImport('imagemin-webp', module)).default
  // pngquant = (await dynamicImport('imagemin-pngquant', module)).default
  // optipng = (await dynamicImport('imagemin-optipng', module)).default
  // svgo = (await dynamicImport('imagemin-svgo', module)).default
  // jpegrecompress = (await dynamicImport('imagemin-jpeg-recompress', module))
  //   .default
  // console.log({ jpegtran })
}
main()

@Injectable()
export class MinifyImageService {
  constructor() {}

  async minifyImage(image: Express.Multer.File) {
    const imageminOption = { plugins: [] }

    const buffer = image?.buffer
    const ext = image?.mimetype.split('/')[1]

    if (!buffer || !ext) {
      return null
    }

    // if (['jpg', 'jpeg'].indexOf(ext) !== -1) {
    //   imageminOption.plugins.push(jpegtran({ progressive: true }))
    // }

    // if (ext === 'png') {
    //   imageminOption.plugins.push(optipng({ optimizationLevel: 5 }))
    // }

    // if (ext === 'svg') {
    //   imageminOption.plugins.push(svgo({ multipass: true }))
    // }

    // if (ext === 'webp') {
    //   imageminOption.plugins.push(webpmin({ quality: 50 }))
    // }

    // if (ext === 'png') {
    //   // Lossy compression.
    //   imageminOption.plugins.push(pngquant())
    // }

    // if (['jpg', 'jpeg'].indexOf(ext) !== -1) {
    //   imageminOption.plugins.push(jpegrecompress({ quality: 'medium' }))
    // }

    const minifiedBuffer = await imagemin.buffer(buffer, imageminOption)

    const saved = (
      ((buffer.length - minifiedBuffer.length) / buffer.length) *
      100
    ).toFixed(2)

    const bytesSaved = buffer.length - minifiedBuffer.length
    console.log(`initial = ${buffer.length}`)
    console.log(`minified =  ${minifiedBuffer.length}`)
    console.log(`saved = ${saved}`)

    return { minifiedBuffer, bytesSaved }
  }
}
