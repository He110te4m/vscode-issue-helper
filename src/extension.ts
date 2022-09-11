import { type ExtensionContext, window, workspace } from 'vscode'
import { registeCodeCommands } from './commands/codeCommands'
import { registeIssueCommands } from './commands/issueCommands'
import { extensionID, extensionName } from './const'
import { getGitInfo } from './helpers/env/git'
import { GithubIssueOperator } from './operators/issues/GithubIssueOperator'
import { CommentService } from './services/CommentService'

export async function activate(context: ExtensionContext) {
  const info = await getGitInfo()
  if (!info) {
    return
  }

  const { type, repo, owner } = info

  const token = workspace.getConfiguration(extensionID).get<string>(`token.${type}`)
  if (!token) {
    window.showErrorMessage(`[${extensionName}]: In order to ensure the normal function of the extension, you need to configure the corresponding website token first.`)
    return
  }

  const commentService = new CommentService()

  const operator = new GithubIssueOperator({ token, repo, owner })

  context.subscriptions.push(...[commentService], ...registeIssueCommands(operator), ...registeCodeCommands())
}

// this method is called when your extension is deactivated
export function deactivate() { }
