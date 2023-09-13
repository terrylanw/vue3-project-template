import type { UserConfig } from '@commitlint/types'

const configuration: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'perf',
        'style',
        'docs',
        'test',
        'refactor',
        'chore',
        'revert',
        'types',
        'sync',
        'release',
        'build',
      ],
    ],
  },
}

export default configuration
