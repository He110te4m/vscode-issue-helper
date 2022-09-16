import { defaultRepoKey } from '~/const/keys'

const vscode = getVSCode()

const storageKey = 'vscode-issue-helper-state'

export function useIssueData() {
  const issueData = useSessionStorage<IssueData>(storageKey, getDefauleValue())

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
    repo: sessionStorage.getItem(defaultRepoKey) ?? '',
    codeSnippets: [],
  }
}
