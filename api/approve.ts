import faunadb from 'faunadb'
import type { VercelRequest, VercelResponse } from '@vercel/node'

const q = faunadb.query
const client = new faunadb.Client({ secret: process.env.FAUNADB_SERVER_SECRET })

export default async (request: VercelRequest, response: VercelResponse) => {
  const { message, signature } = JSON.parse(request.body)

  try {
    await client.query(
      q.Update(q.Ref(q.Collection('stories'), message), {
        data: {
          ...message,
          approved: signature === process.env.SIGNATURE,
        },
      })
    )
    response.status(201).end()
  } catch (error) {
    console.error(error)
    response.status(500).end()
  }
}
