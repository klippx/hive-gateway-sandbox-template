import { createServer } from 'node:http'
import { createYoga } from 'graphql-yoga'
import { buildSchema } from './build-schema.js'

export const startProductServer = () => { 
  console.info('Starting Product subgraph....')
  const port = 4000
  const schema = buildSchema()
  const yoga = createYoga({ schema })
  const server = createServer(yoga)
  server.listen(port, () => {
    console.info(`Product subgraph is running on http://localhost:${port}/graphql`)
  })
}