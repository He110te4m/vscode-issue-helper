import { type CommentController, Range, comments } from 'vscode'
import { extensionID, extensionName } from '../const'

export class CommentService {
  private ctrl: CommentController

  constructor() {
    this.ctrl = this.createController()
  }

  /** Let vscode automatically release resources through dispose */
  dispose() {
    return this.ctrl.dispose()
  }

  private createController() {
    const ctrl = comments.createCommentController(extensionID, extensionName)

    ctrl.commentingRangeProvider = {
      provideCommentingRanges({ lineCount }) {
        return [
          new Range(0, 0, lineCount - 1, 0),
        ]
      },
    }

    return ctrl
  }
}
