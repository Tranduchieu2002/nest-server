export enum TokenType {
  ACCESS_TOKEN = 'ACCESS_TOKEN',
  REFRESH_TOKEN = 'REFRESH_TOKEN',
}

export type Tokens = { [Key in Lowercase<keyof typeof TokenType>]: string}