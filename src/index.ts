import { createSupergraphSchema } from './create-supergraph-schema.js'
import { startProductServer } from './subgraphs/product/index.js'
import { startReviewServer } from './subgraphs/review/index.js'
import { startGateway } from './gateway/index.js'

console.info('Starting subgraphs...')
await Promise.all([
  startProductServer(),
  startReviewServer(),
])

console.info('Generating file: supergraph.graphql')
await createSupergraphSchema()

console.info('Starting gateway')
await startGateway()