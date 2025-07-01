import antfu from '@antfu/eslint-config'

export default antfu({
  vue: true,
  regexp: {
    overrides: {
      'regexp/no-unused-capturing-group': 'off',
    },
  },
})
