export const replaceCurrency = (v: string) => {
    v = v.replace(/./g, ',')

    return v
  }