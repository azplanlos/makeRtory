import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: {
    [process.env.OKTOPART_API_URL || ""]: {
      headers: {
        'Authorization': 'Bearer ' + process.env.OKTOPART_API_KEY
      }
    }
  },
  generates: {
    './src/gql/': {
      preset: 'client',
      plugins: []
    }
  },
  ignoreNoDocuments: true,
  documents: ['src/**/*.{ts,tsx}']
}

export default config
