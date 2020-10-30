class GithubService {
  static async getUserInfo (username) {
    if (typeof username != 'string' && typeof username != 'number') {
      throw new Error('user/must-be-string')
    }
    
    const API_ROUTE = `https://api.github.com/users/${username}`
    const response = await fetch(API_ROUTE, { method: 'GET' })

    switch (response.status) {
      case 200:
        return await response.json()
      case 404:
        throw new Error(ErrorCodes.userNotFound)
      default:
        throw new Error(ErrorCodes.failToConnect)
    }
  }
}

export const ErrorCodes = {
  userNotFound: 'user/not-found',
  failToConnect: 'user/fail-to-connect'
}

export default GithubService