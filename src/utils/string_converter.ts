export const StringConverter = {
  stringToArray(value?: string,symbol: string = ',') : string[] | null {
    if(!value) return null 
    
    return value.split(symbol)
  }
}