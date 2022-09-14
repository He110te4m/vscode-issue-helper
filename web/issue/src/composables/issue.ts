const vscode = getVSCode()

const issueData = ref<IssueData>(vscode.getState() || {
  title: '',
  content: '',
  codeSnippets: [],
})

export function useIssueData() {
  useVSCodeEvent('add-code', (code: IssueCodeData) => {
    issueData.codeSnippets.push(code)
  })

  // TODO: update
  watchThrottled(issueData, () => {
    vscode.setState(issueData.value)
  }, { deep: true, throttle: 500 })

  return issueData
}
