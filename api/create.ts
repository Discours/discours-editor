import { Switchboard } from 'switchboard.js'
import type { VercelRequest, VercelResponse } from '@vercel/node'

interface MyStory {
  note: string
  url: string
  from?: string
}

export default async (request: VercelRequest, response: VercelResponse) => {
  const story = JSON.parse(request.body) as MyStory;

  try {
    // TODO: save in db
    response.status(201).end();
  } catch (error) {
    console.error(error);
    response.status(500).end();
  }
};