const vscode = getVSCode()

const storageKey = 'vscode-issue-helper-state'

const issueData = useSessionStorage<IssueData>(storageKey, getDefauleValue())

export function useIssueData() {
  useVSCodeEvent('reset-state', () => {
    issueData.value = getDefauleValue()
  })

  useVSCodeEvent('add-code', (code: IssueCodeData) => {
    issueData.value.codeSnippets.push(code)
  })

  watchThrottled(issueData, () => {
    vscode.setState(issueData.value)
  }, { deep: true, throttle: 500 })

  return issueData
}

function getDefauleValue() {
  return {
    title: '',
    content: '',
    codeSnippets: [],
  }
}
