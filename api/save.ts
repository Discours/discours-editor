/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import type { MyStory } from '../src/stores/story'
import faunadb from 'faunadb'
import type { VercelRequest, VercelResponse } from '@vercel/node'

const q = faunadb.query
const client = new faunadb.Client({ secret: process.env.FAUNADB_SERVER_SECRET })

export default async (request: VercelRequest, response: VercelResponse) => {
  const data = JSON.parse(request.body) as MyStory
  console.debug(data)
  try {
    await client.query(q.Create(q.Collection(data.room), { data }))
    response.status(201).end()
  } catch (error) {
    console.error(error)
    response.status(500).end()
  }
}
