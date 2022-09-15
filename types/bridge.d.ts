declare global {
  type IssueCodeData = Record<'desc' | 'code' | 'id' | 'path', string>;
  type IssueData = {
    title: string;
    codeSnippets: IssueCodeData[];
    content?: string;
  };

  interface WebViewEventFn {
    /** Fired when the user selects a code snippet and adds a comment */
    'add-code': (codeData: IssueCodeData) => void;
    /** Fired when a user submits an issue */
    'submit-issue': (issue: IssueData) => void;
    'reset-state': () => void;
  }

  interface VSCodeInstance {
    postMessage: <TEvent extends keyof WebViewEventFn>(event: TEvent, ...args: Parameters<WebViewEventFn[TEvent]>) => ReturnType<WebViewEventFn[TEvent]>;
    setState: (data: any) => void;
    getState: () => any;
  }

  type MessageEventData<TEvent extends keyof WebViewEventFn> = {
    eventName: TEvent;
    params: Parameters<WebViewEventFn[TEvent]>;
  };

  const acquireVsCodeApi: () => VSCodeInstance;
}

export { };
