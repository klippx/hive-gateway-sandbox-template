import { createServer } from 'node:http'
import { createYoga } from 'graphql-yoga'
import { buildSchema } from './build-schema.js'

export const startReviewServer = () => { 
  console.info('Starting Review subgraph....')
  const port = 4001
  const schema = buildSchema()
  const yoga = createYoga({ schema })
  const server = createServer(yoga)
  server.listen(port, () => {
    console.info(`Review subgraph is running on http://localhost:${port}/graphql`)
  })
}