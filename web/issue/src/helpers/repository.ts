export async function getRepository(): Promise<string[]> {
  return new Promise((resolve) => {
    const vscode = getVSCode()
    vscode.postMessage({
      eventName: 'collect-repo-list',
      params: [],
    })
    useVSCodeEvent('send-repo-list', (list: string[]) => {
      resolve(list)
    })
  })
}

export async function getDefaultRepository(): Promise<string> {
  return new Promise((resolve) => {
    const vscode = getVSCode()
    vscode.postMessage({
      eventName: 'collect-default-repo',
      params: [],
    })
    useVSCodeEvent('send-default-repo', (repo: string) => {
      resolve(repo)
    })
  })
}
