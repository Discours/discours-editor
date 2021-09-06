import faunadb from 'faunadb'
import type { VercelRequest, VercelResponse } from '@vercel/node'

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
  domain: 'db.eu.fauna.com'
  // TODO: move to config/env
})

interface MyStory {
  note: string
  url: string
  from?: string
}

export default async (request: VercelRequest, response: VercelResponse) => {
  const story = JSON.parse(request.body) as MyStory

  try {
      await client.query(
        q.Create(q.Collection('stories'), {
          data: {
            ...story
          }
        })
      )
    response.status(201).end()
  } catch (error) {
    console.error(error);
    response.status(500).end()
  }
}
