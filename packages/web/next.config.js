const withImages = require('next-images')

module.exports = withImages({
  esModule: true,
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
})
