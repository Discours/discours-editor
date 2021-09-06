import type { Ref, PageHelper } from 'faunadb'
import faunadb from 'faunadb'
import type { VercelRequest, VercelResponse } from '@vercel/node'

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
  domain: 'db.eu.fauna.com'
  // TODO: move to config/env
})

export default async (request: VercelRequest, res: VercelResponse) => {
  console.log('Loading data...')
  const room = JSON.parse(request.body)

  try {
    const allRefs: Ref = await client.query(q.Paginate(q.Match(q.Index('get_by_room'), room)))

    if (allRefs.data.length === 0) {
      console.log('NO RECORDS')
      return []
    }

    const query = await client.query(allRefs.data.map((ref) => q.Get(ref)))

    return query.map((entry) => entry.data)
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
}