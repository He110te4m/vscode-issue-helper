import { type CommentReply, commands } from 'vscode'
import { v4 as uuid } from 'uuid'
import { getTextByUri } from '../helpers/generators/text'
import type { IssueWebService } from '../services/IssueWebService'
import { commandIDs } from './const'

export function registeCodeCommands(issueService: IssueWebService) {
  return [
    commands.registerCommand(commandIDs.markCode, ({ text, thread }: CommentReply) => {
      const { uri, range } = thread

      issueService.sendMessage('add-code', {
        id: uuid(),
        desc: text,
        code: getTextByUri(uri, range),
        path: uri.fsPath,
      })

      thread.dispose()
    }),
  ]
}
