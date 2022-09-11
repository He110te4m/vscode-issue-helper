export function genNameByID(id: string): string {
  return id
    .split('-')
    .slice(1)
    .map(str => str[0].toUpperCase() + str.slice(1))
    .join(' ')
}
