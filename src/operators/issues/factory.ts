import { workspace } from 'vscode'
import { configurationIDs } from '../../const'
import type { GitInfo } from '../../helpers/env/git'
import type { BaseIssueOperator } from './BaseIssueOperator'
import { GithubIssueOperator } from './GithubIssueOperator'
import { GitlabIssueOperator } from './GitlabIssueOperator'

export function getIssueOperator({ type, repo, owner, domain }: GitInfo) {
  const token = getConfig(type)
  if (!token) {
    return null
  }

  let operator: BaseIssueOperator

  switch (type) {
    case 'github':
      operator = new GithubIssueOperator({ token, repo, owner })
      break

    case 'gitlab':
    default:
      operator = new GitlabIssueOperator({ token, repo, owner, domain })
      break
  }

  return operator!
}

function getConfig(type: GitInfo['type']) {
  return workspace.getConfiguration(configurationIDs.token).get<string>(type)
}
