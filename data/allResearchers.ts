import { getFinder, getInserter, getName } from 'libs/utils/zod'
import { parseResearcherUid, Researcher, ResearcherSchema } from '../models/Researcher'

export const allResearchers: Researcher[] = []

export const addResearcher = getInserter(getName(ResearcherSchema), ResearcherSchema, parseResearcherUid, allResearchers)

export const findResearcher = getFinder(parseResearcherUid, allResearchers)

const MarcusHutter = addResearcher({
  url: 'https://scholar.google.com.au/citations?hl=en&user=7hmCntEAAAAJ',
})
