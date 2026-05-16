import antfu from '@antfu/eslint-config'

export default antfu(
  {
    vue: true,
    unocss: true,
    formatters: true,
    ignores: [
      '.nuxt/**',
      '.output/**',
      'node_modules/**',
      'design-extract-output/**',
    ],
  },
)
