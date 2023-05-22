import { isEqualByD } from 'libs/utils/lodash'
import { getArraySchema } from 'libs/utils/zod'
import { z } from 'zod'
import { NameSchema } from '../../generic/models/Name'

export const PaperSchema = z.object({
  name: NameSchema,
  doi: z.string(),
  publishedAt: z.date(),
}).describe('Paper')

export const PaperUidSchema = PaperSchema.pick({
  doi: true,
})

export const PapersSchema = getArraySchema(PaperSchema, parsePaperUid)

export type Paper = z.infer<typeof PaperSchema>

export type PaperUid = z.infer<typeof PaperUidSchema>

export function parsePaper(paper: Paper): Paper {
  return PaperSchema.parse(paper)
}

export function parsePapers(papers: Paper[]): Paper[] {
  return PapersSchema.parse(papers)
}

export function parsePaperUid(paperUid: PaperUid): PaperUid {
  return PaperUidSchema.parse(paperUid)
}

export const isEqualPaper = (a: Paper) => (b: Paper) => isEqualByD(a, b, parsePaperUid)
