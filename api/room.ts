/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import type { MyStory } from './../src/stores/story'
import faunadb from 'faunadb'
import type { VercelRequest, VercelResponse } from '@vercel/node'

const q = faunadb.query
const client = new faunadb.Client({ secret: process.env.FAUNADB_SERVER_SECRET })

export default async (request: VercelRequest, res: VercelResponse) => {
  const room: string = JSON.parse(request.body)
  console.debug('getting room: ' + room)
  try {
    const allRefs: any = await client.query(q.Paginate(q.Collection(room)))
    if (allRefs.data.length === 0) {
      console.log('room space is empty')
      return []
    }
    const query: any = await client.query(allRefs.data.map((ref) => q.Get(ref)))
    res.json(query.map((res) => res.data as MyStory))
  } catch (error) {
    console.error(error)
    res.status(500).end()
  }
}
