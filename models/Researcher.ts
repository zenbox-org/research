import { isEqualByD } from 'libs/utils/lodash'
import { getArraySchema } from 'libs/utils/zod'
import { z } from 'zod'
import { UrlSchema } from '../../generic/models/Url'

export const ResearcherSchema = z.object({
  url: UrlSchema,
}).describe('Researcher')

export const ResearcherUidSchema = ResearcherSchema.pick({
  url: true,
})

export const ResearchersSchema = getArraySchema(ResearcherSchema, parseResearcherUid)

export type Researcher = z.infer<typeof ResearcherSchema>

export type ResearcherUid = z.infer<typeof ResearcherUidSchema>

export function parseResearcher(researcher: Researcher): Researcher {
  return ResearcherSchema.parse(researcher)
}

export function parseResearchers(researchers: Researcher[]): Researcher[] {
  return ResearchersSchema.parse(researchers)
}

export function parseResearcherUid(researcherUid: ResearcherUid): ResearcherUid {
  return ResearcherUidSchema.parse(researcherUid)
}

export const isEqualResearcher = (a: Researcher) => (b: Researcher) => isEqualByD(a, b, parseResearcherUid)
