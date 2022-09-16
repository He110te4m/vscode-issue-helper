import { workspace } from 'vscode'
import { configurationIDs } from '../../const'
import { getGitInfo } from './git'

export function getRepoListInConfig() {
  const config = workspace.getConfiguration(configurationIDs.repository)

  return config.get<string[]>('list', [])
}

export async function getRepositoryList() {
  let configList = getRepoListInConfig()
  const gitRepo = await getGitInfo()
  if (gitRepo) {
    configList = Array.from(new Set(configList.concat(gitRepo.url)))
  }

  return configList
}

export function getDefaultRepository() {
  return workspace.getConfiguration(configurationIDs.repository).get<string>('default', '')
}
