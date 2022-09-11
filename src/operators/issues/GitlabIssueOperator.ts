import { BaseIssueOperator } from './BaseIssueOperator'

export class GitlabIssueOperator extends BaseIssueOperator {
  createIssue(title: string, body: string): Promise<void> {
    return body ? Promise.resolve() : Promise.reject(new Error('x'))
  }
}
