import { genNameByID } from './helpers/generators/id'

export const extensionID = 'vscode-issue-helper'

export const extensionName = genNameByID(extensionID)

export const configurationIDs = {
  token: `${extensionID}.token`,
  repository: `${extensionID}.repository`,
}

const codeCommandPrefix = `${extensionID}.code`
const codeCommandIDs = {
  /** Add code to issue attachment */
  markCode: `${codeCommandPrefix}.mark`,
}

const issueCommandPrefix = `${extensionID}.issue`
const issueCommandIDs = {
  /** create issue */
  createIssue: `${issueCommandPrefix}.create`,
}

const repositoryCommandPrefix = `${extensionID}.repository`
const repositoryCommandIDs = {
  /** By default, when you submit an issue, to which repository */
  selectDefaultRepository: `${repositoryCommandPrefix}.select-default`,
  /** Configure the git repository address that supports issue submission */
  addRepository: `${repositoryCommandPrefix}.add`,
}

export const commandIDs = {
  ...codeCommandIDs,
  ...issueCommandIDs,
  ...repositoryCommandIDs,
}

export const gitRepoUrlRegExp = /^git@[a-zA-Z]+(\.[a-zA-Z]+)+\/[a-zA-Z]+\/[a-zA-Z]+$/
