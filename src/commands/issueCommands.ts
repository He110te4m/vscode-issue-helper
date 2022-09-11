import { type CommentReply, commands, workspace } from 'vscode'
import type { BaseIssueOperator } from '../operators/issues/BaseIssueOperator'
import { commandIDs } from './const'

export function registeIssueCommands(issueOperator: BaseIssueOperator) {
  return [
    commands.registerCommand(commandIDs.createIssue, ({ text, thread: { range, uri } }: CommentReply) => {
      const doc = workspace.textDocuments.find(doc => doc.uri.fsPath === uri.fsPath)
      if (!doc) {
        return
      }

      const code = doc.getText(range)

      issueOperator.createIssue('test', getIssueTemplate(text, code))
    }),
  ]
}

function getIssueTemplate(text: string, code: string): string {
  return `${text}
\`\`\`
${code}
\`\`\`
`
}
