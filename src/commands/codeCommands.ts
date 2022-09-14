import { commands } from 'vscode'
import { commandIDs } from './const'

export function registeCodeCommands() {
  return [
    commands.registerCommand(commandIDs.markCode, () => {}),
  ]
}
