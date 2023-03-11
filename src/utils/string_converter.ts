const sharingStringConverter = {
  transformFalsyToEmptyStr(str?: string) {
    return str || ''
  }
}

export const StringConverter = {
  stringToArray(value?: string,symbol: string = ',') : string[] | null {
    if(!value) return null 
    
    return value.split(symbol)
  },
  splitName(name = '') {
    const [firstName, ...lastName] = name.split(' ').filter(Boolean);
    return {
      firstName: firstName,
      lastName: lastName.join(' ')
    }
  },
  combineName(firstName: string, lastName: string) : string {
    return `${sharingStringConverter.transformFalsyToEmptyStr(firstName)} ${sharingStringConverter.transformFalsyToEmptyStr(lastName)}`.trim();
  },
  ...sharingStringConverter
}