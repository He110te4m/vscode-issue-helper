import { type ExtensionContext } from 'vscode'
import { CommentService } from './services/CommentService'

export function activate(context: ExtensionContext) {
  const commentService = new CommentService()

  context.subscriptions.push(...[commentService])
}

// this method is called when your extension is deactivated
export function deactivate() { }
