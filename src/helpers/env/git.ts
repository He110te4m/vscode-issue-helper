import { join } from 'path'
import { existsSync } from 'fs-extra'
import { simpleGit } from 'simple-git'
import { getRootPath } from './path'

const githubDomain = 'github.com'
const sshStart = 'git@'
const gitSuffix = '.git'

export type IssueType = 'github' | 'gitlab'

export interface GitInfo {
  type: IssueType
  url: string
  repo: string
  owner: string
  domain: string
}

export async function getGitInfo(): Promise<GitInfo | null> {
  const rootPath = getRootPath()
  if (!rootPath) {
    return Promise.resolve(null)
  }

  const isGitProject = existsSync(join(rootPath, '.git'))

  if (isGitProject) {
    return getGitProjectInfo(rootPath)
  }

  return null
}

async function getGitProjectInfo(baseDir: string): Promise<GitInfo | null> {
  const git = simpleGit({
    baseDir,
  })

  const remoteList = await git.getRemotes(true)
  if (!remoteList.length) {
    return null
  }
  const url = remoteList[0].refs.fetch

  return getGitInfoByUrl(url)
}

function getGitInfoByUrl(url: string): GitInfo | null {
  if (url.startsWith(sshStart)) {
    const [host, path = ''] = url.split(':')
    const domain = host.slice(sshStart.length)
    const [owner, repo] = parseOwnerAndRepo(path)

    return {
      type: domain === githubDomain ? 'github' : 'gitlab',
      domain,
      url,
      owner,
      repo,
    }
  }

  let urlInfo: URL | null = null

  try {
    urlInfo = new URL(url)
  } catch (error) {
  }

  if (!urlInfo) {
    return null
  }

  const [owner, repo] = parseOwnerAndRepo(urlInfo.pathname)

  return {
    type: urlInfo.hostname === githubDomain ? 'github' : 'gitlab',
    domain: urlInfo.hostname,
    url,
    owner,
    repo,
  }
}

function parseOwnerAndRepo(pathname: string): [string, string] {
  const [owner, repo] = pathname.split('/')

  return [owner, repo.slice(0, 0 - gitSuffix.length)]
}
