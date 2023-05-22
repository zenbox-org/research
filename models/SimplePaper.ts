import { isEqualByD } from 'libs/utils/lodash'
import { getArraySchema } from 'libs/utils/zod'
import { z } from 'zod'
import { UrlSchema } from '../../generic/models/Url'
import { PaperSchema } from './Paper'

export const SimplePaperSchema = PaperSchema.pick({
  name: true,
  publishedAt: true,
}).extend({
  url: UrlSchema,
}).describe('SimplePaper')

export const SimplePaperUidSchema = SimplePaperSchema.pick({
  url: true,
})

export const SimplePapersSchema = getArraySchema(SimplePaperSchema, parseSimplePaperUid)

export type SimplePaper = z.infer<typeof SimplePaperSchema>

export type SimplePaperUid = z.infer<typeof SimplePaperUidSchema>

export function parseSimplePaper(paper: SimplePaper): SimplePaper {
  return SimplePaperSchema.parse(paper)
}

export function parseSimplePapers(papers: SimplePaper[]): SimplePaper[] {
  return SimplePapersSchema.parse(papers)
}

export function parseSimplePaperUid(paperUid: SimplePaperUid): SimplePaperUid {
  return SimplePaperUidSchema.parse(paperUid)
}

export const isEqualSimplePaper = (a: SimplePaper) => (b: SimplePaper) => isEqualByD(a, b, parseSimplePaperUid)
