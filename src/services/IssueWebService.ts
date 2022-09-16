import { readFileSync } from 'fs-extra'
import type { Disposable, Webview, WebviewOptions, WebviewView, WebviewViewProvider } from 'vscode'
import { Uri, window } from 'vscode'
import { extensionID } from '../const'
import { getDefaultRepository, getRepositoryList } from '../helpers/env/config'

const panelID = `${extensionID}-views-issue`
const viewID = `${panelID}.issue-helper`

export class IssueWebService {
  private uri: Uri
  private disposables: Disposable[] = []
  private view?: WebviewView

  constructor(extensionUri: Uri) {
    this.uri = extensionUri
    this.registerProvider(extensionUri)
  }

  sendMessage<TEvent extends keyof WebViewEventFn>(eventName: TEvent, ...params: Parameters<WebViewEventFn[TEvent]>) {
    this.view?.webview.postMessage({
      eventName,
      params,
    })
  }

  dispose() {
    while (this.disposables) {
      const disposable = this.disposables.pop()
      if (disposable) {
        disposable.dispose()
      }
    }
  }

  private updateWebview() {
    if (!this.view) {
      return
    }
    this.view.webview.html = this.getHTMLForWebview(this.view.webview, this.getWebRoot(this.uri))
  }

  private registerProvider(uri: Uri) {
    const viewProvider = this.createWebviewProvider(uri)
    window.registerWebviewViewProvider(viewID, viewProvider)
  }

  private createWebviewProvider(uri: Uri): WebviewViewProvider {
    return {
      resolveWebviewView: (webviewView) => {
        this.view = webviewView
        webviewView.webview.options = this.getWebViewOpts(uri)
        webviewView.webview.onDidReceiveMessage(this.handleReceiveMessage, this, this.disposables)
        this.updateWebview()
      },
    }
  }

  private async handleReceiveMessage(e: MessageEventData<keyof WebViewEventFn>) {
    switch (e.eventName) {
      case 'submit-issue':
        // TODO: submit issue
        break

      case 'collect-repo-list':
        this.sendMessage('send-repo-list', await getRepositoryList())
        break

      case 'collect-default-repo':
        this.sendMessage('send-default-repo', getDefaultRepository())
        break

      default:
        break
    }
  }

  private getHTMLForWebview(view: Webview, rootUri: Uri): string {
    const htmlContent = readFileSync(Uri.joinPath(rootUri, 'index.html').fsPath).toString()

    const url = view.asWebviewUri(rootUri)

    return htmlContent.replace(/(<link.+?href="|<script.+?src="|<img.+?src=")(.+?)"/g, (m, $1, $2) => `${$1}${url}${$2}"`)
  }

  private getWebViewOpts(uri: Uri): WebviewOptions {
    return {
      enableScripts: true,
      localResourceRoots: [
        this.getWebRoot(uri),
      ],
    }
  }

  private getWebRoot(extensionUri: Uri): Uri {
    return Uri.joinPath(extensionUri, 'out', 'web', 'issue')
  }
}
