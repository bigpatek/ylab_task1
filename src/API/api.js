export const fetch = async(url, email, password) => {
    return await Promise.resolve(
      { 
        json: () => Promise.resolve({email, password})
      }
    )
  }