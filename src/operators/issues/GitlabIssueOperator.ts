import axios from 'axios'
import { BaseIssueOperator, type IssueOptions } from './BaseIssueOperator'

export class GitlabIssueOperator extends BaseIssueOperator {
  private domain: string

  constructor(opt: IssueOptions & { domain: string }) {
    super(opt)

    this.domain = opt.domain
  }

  async createIssue(title: string, body: string) {
    return axios.post(this.getIssueUrl(), {
      title,
      description: body,
    }, {
      headers: {
        'PRIVATE-TOKEN': this.token,
      },
    }).then((res) => {
      return res
    }).catch((err) => {
      globalThis.console.log(err)
    })
  }

  private getIssueUrl(): string {
    const project = encodeURIComponent(`${this.owner}/${this.repo}`)

    return `https://${this.domain}/api/v4/projects/${project}/issues`
  }
}
