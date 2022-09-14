let vscode: VSCodeInstance | null = null

export function getVSCode() {
  if (!vscode && typeof acquireVsCodeApi === 'function') {
    vscode = acquireVsCodeApi()
  }

  return vscode!
}
