import { extensionID } from '../const'

const codeCommandPrefix = `${extensionID}.code`
const codeCommandIDs = {
  markCode: `${codeCommandPrefix}.mark`,
  removeCode: `${codeCommandPrefix}.remove`,
}

const issueCommandPrefix = `${extensionID}.issue`
const issueCommandIDs = {
  createIssue: `${issueCommandPrefix}.create`,
}

export const commandIDs = {
  ...codeCommandIDs,
  ...issueCommandIDs,
}
