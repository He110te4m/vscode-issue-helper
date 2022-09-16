import { ConfigurationTarget, commands, window, workspace } from 'vscode'
import { commandIDs, configurationIDs, gitRepoUrlRegExp } from '../const'
import { getRepoListInConfig, getRepositoryList } from '../helpers/env/config'

export function registeRepositoryCommands() {
  return [
    commands.registerCommand(commandIDs.selectDefaultRepository, onSelectDefaultRepository),
    commands.registerCommand(commandIDs.addRepository, onAddRepository),
  ]
}

async function onSelectDefaultRepository() {
  const list = await getRepositoryList()
  const item = await window.showQuickPick(list, {
    placeHolder: 'By default, when you submit an issue, to which repository',
    canPickMany: false,
  })

  if (!item) {
    return
  }

  const config = workspace.getConfiguration(configurationIDs.repository)
  config.update('default', item, ConfigurationTarget.Global)
}

async function onAddRepository() {
  const list = getRepoListInConfig()
  const item = await window.showInputBox({
    validateInput(value) {
      if (list.includes(value)) {
        return `The repository ${value} already exists in the configuration`
      }
      if (gitRepoUrlRegExp.test(value)) {
        return
      }
      try {
        const info = new URL(value)
        if (info.pathname.endsWith('.git')) {
          return
        }
      } catch (e) {
      }

      return 'The current address is not recognized. Please enter a valid Git repository address, eg: `git@github.com:He110te4m/vscode-issue-helper.git` or `https://github.com/He110te4m/vscode-issue-helper.git`'
    },
  })

  if (!item) {
    return
  }

  const config = workspace.getConfiguration(configurationIDs.repository)
  config.update('list', list.concat(item), ConfigurationTarget.Global)
}
