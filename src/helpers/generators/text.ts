import { createInterface } from 'readline'
import { EOL } from 'os'
import { createReadStream } from 'fs-extra'
import type { Range, Uri } from 'vscode'
import { workspace } from 'vscode'

export function getTextByUri(uri: Uri, range: Range) {
  const doc = workspace.textDocuments.find(doc => doc.uri.fsPath === uri.fsPath)
  if (doc) {
    return doc.getText(range)
  }

  // document has been destroyed and can only be read from the file

  const file = createInterface({
    input: createReadStream(uri.fsPath),
    output: process.stdout,
    terminal: false,
  })

  let text = ''
  let lineNum = -1

  file.on('line', onLineRead)

  return text

  function onLineRead(line: string) {
    lineNum++
    if (lineNum < range.start.line || lineNum > range.end.line) {
      return
    }

    text += line + EOL

    if (lineNum === range.end.line) {
      file.off('line', onLineRead)
    }
  }
}
