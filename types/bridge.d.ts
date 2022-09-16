declare global {
  type IssueCodeData = Record<'desc' | 'code' | 'id' | 'path', string>
  type IssueData = {
    title: string
    repo: string
    codeSnippets: IssueCodeData[]
    content?: string
  }

  interface WebViewEventFn {
    // Fire by extension

    /** Fired when the user selects a code snippet and adds a comment */
    'add-code': (codeData: IssueCodeData) => void
    /** Resets the data for the issue form */
    'reset-state': () => void
    /** Send the Git repository list */
    'send-repo-list': (repoList: string[]) => void
    /** Send the default Git repository */
    'send-default-repo': (repo: string) => void

    // Fire by webview

    /** When the user submits the form, the webview initiates the request */
    'submit-issue': (issue: IssueData) => void
    /** The request for the Git repository is initiated by the webview */
    'collect-repo-list': () => void
    /** The request for the default Git repository is initiated by the webview */
    'collect-default-repo': () => void
  }

  interface VSCodeInstance {
    postMessage: <TEvent extends keyof WebViewEventFn>(args: {
      eventName: TEvent,
      params: Parameters<WebViewEventFn[TEvent]>,
    }) => ReturnType<WebViewEventFn[TEvent]>
    setState: (data: unknown) => void
    getState: () => unknown
  }

  type MessageEventData<TEvent extends keyof WebViewEventFn> = {
    eventName: TEvent
    params: Parameters<WebViewEventFn[TEvent]>
  }

  const acquireVsCodeApi: () => VSCodeInstance
}

export { }
