import { type CommentReply, commands, window } from 'vscode'
import { extensionName } from '../const'
import { getTextByUri } from '../helpers/generators/text'
import type { BaseIssueOperator } from '../operators/issues/BaseIssueOperator'
import { commandIDs } from './const'

export function registeIssueCommands(issueOperator: BaseIssueOperator) {
  return [
    commands.registerCommand(commandIDs.createIssue, async ({ text, thread }: CommentReply) => {
      const { uri, range } = thread

      const code = getTextByUri(uri, range)

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
