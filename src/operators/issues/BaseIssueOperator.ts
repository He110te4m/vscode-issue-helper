export interface IssueOptions {
  token: string
  owner: string
  repo: string
}

export abstract class BaseIssueOperator {
  protected token: string
  protected owner: string
  protected repo: string

  constructor({ token, owner, repo }: IssueOptions) {
    this.token = token
    this.owner = owner
    this.repo = repo
  }

  abstract createIssue(title: string, body: string): Promise<void>
}
