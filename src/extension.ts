import { type ExtensionContext, window } from 'vscode'
import { registeCodeCommands } from './commands/codeCommands'
import { registeIssueCommands } from './commands/issueCommands'
import { extensionName } from './const'
import { getGitInfo } from './helpers/env/git'
import { getIssueOperator } from './operators/issues/factory'
import { CommentService } from './services/CommentService'

export async function activate(context: ExtensionContext) {
  const info = await getGitInfo()
  if (!info) {
    return
  }

  const operator = getIssueOperator(info)
  if (!operator) {
    window.showErrorMessage(`[${extensionName}]: In order to ensure the normal function of the extension, you need to configure the corresponding website token first.`)
    return
  }

  const commentService = new CommentService()

  context.subscriptions.push(
    commentService,
    ...registeIssueCommands(operator),
    ...registeCodeCommands(),
  )
}

// this method is called when your extension is deactivated
export function deactivate() { }
