import { Client } from '@notionhq/client'
import dotenv from 'dotenv'

dotenv.config()

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

export const getNotionData = async () => {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
      filter: {
        property: 'Status',
        select: {
          equals: 'Published',
        },
      },
    })
    return response.results
  } catch (error) {
    console.error('Error fetching data from Notion:', error)
    throw error
  }
}

export const getPage = async (pageId) => {
  try {
    const response = await notion.pages.retrieve({ page_id: pageId })
    return response
  } catch (error) {
    console.error('Error retrieving page:', error)
    throw error
  }
}

export const getBlocks = async (blockId) => {
  const blocks = []
  let cursor

  try {
    while (true) {
      const { results, next_cursor } = await notion.blocks.children.list({
        start_cursor: cursor,
        block_id: blockId,
      })
      blocks.push(...results)
      if (!next_cursor) {
        break
      }
      cursor = next_cursor
    }
    return blocks
  } catch (error) {
    console.error('Error retrieving blocks:', error)
    throw error
  }
}
