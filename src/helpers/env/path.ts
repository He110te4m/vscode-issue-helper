import { workspace } from 'vscode'

export function getRootPath(): string | null {
  return workspace.workspaceFolders?.[0]?.uri.fsPath ?? null
}
