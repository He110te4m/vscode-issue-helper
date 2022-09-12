import { type CommentReply, commands, window, workspace } from 'vscode'
import { extensionName } from '../const'
import type { BaseIssueOperator } from '../operators/issues/BaseIssueOperator'
import { commandIDs } from './const'

export function registeIssueCommands(issueOperator: BaseIssueOperator) {
  return [
    commands.registerCommand(commandIDs.createIssue, async ({ text, thread }: CommentReply) => {
      const { range, uri } = thread

      const doc = workspace.textDocuments.find(doc => doc.uri.fsPath === uri.fsPath)
      if (!doc) {
        return
      }

      const code = doc.getText(range)

      await issueOperator.createIssue('test', getIssueTemplate(text, code))

      window.showInformationMessage(`[${extensionName}]: create issue success`)

      thread.dispose()
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
