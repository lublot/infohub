/**
 * Esta classe abstrai as chamadas para a API do Github e retorna erros padronizados.
 */

class GithubService {
  /**
   * Buscar informações de um usuário no Github
   * 
   * @param {string} username - O nome do usuário que se deseja buscar informações 
   */
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

  /**
   * Buscar informações de um usuário no Github
   * 
   * @param {string} searchUsername - O nome do usuário a ser buscado
   * @param {number} targetPage - O número da página que se dejesa buscar
   * @param {number} itemsPerPage - A quantidade de itens desejados por página. Máx: 100
   * @param {string} sortBy - O critério de ordenação dos resultados. Aceita valores: "created", "update"
   * @param {string} direction - A direção da ordenação. Ex: "asc"(ascendente), "desc" (decrescente)
   */
  static async getReposInfo (username, page = 1, perPage = 6, sortBy="created", direction="desc") {
    if (typeof username != 'string' && typeof username != 'number') {
      throw new Error('user/must-be-string')
    }
    
    const API_ROUTE = `https://api.github.com/users/${username}/repos?page=${page}&per_page=${perPage}&sort=${sortBy}&direction=${direction}`
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