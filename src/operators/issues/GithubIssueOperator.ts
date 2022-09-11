import { Octokit } from '@octokit/core'
import { BaseIssueOperator, type IssueOptions } from './BaseIssueOperator'

export class GithubIssueOperator extends BaseIssueOperator {
  kit: Octokit

  constructor(opt: IssueOptions) {
    super(opt)

    this.kit = new Octokit({
      auth: this.token,
    })
  }

  async createIssue(title: string, body: string): Promise<void> {
    return this.kit.request('POST /repos/{owner}/{repo}/issues', {
      owner: this.owner,
      repo: this.repo,
      title,
      body,
    }).then(() => {})
  }
}
