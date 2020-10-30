import React, { useState, useEffect, useContext } from 'react';
import GithubService, { ErrorCodes } from '../services/GithubService';
import { PaginationContext } from './PaginationContext';

export const UserContext = React.createContext()

/**
 * Este contexto lida com o fluxo de dados na comunicação com a API do Github.
 * O contexto se encarrega de fazer as chamadas à API através do serviço GithubService.
 */
export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState("")
  const [userData, setUserData] = useState(null)
  const [repositoryInfo, setRepositoryInfo] = useState(null)
  const [loadingUserData, setLoadingUserData] = useState(false)
  const [loadingRepositoryData, setLoadingRepositoryData] = useState(false)
  const [userError, setUserError] = useState(null)
  const [repositoryError, setRepositoryError] = useState(null)
  const { currentPage, itemsPerPage, setRepositoriesCount, sortByFilter } = useContext(PaginationContext)
  
  /**
   * Esta função obtém informações de um usuário desejado e salva-as no contexto.
   * 
   * @param {string} searchUsername - O nome do usuário a ser buscado
   */
  async function getUserInfo (searchUsername) {
    try {
      setLoadingUserData(true)
      const userInfo = await GithubService.getUserInfo(searchUsername)
      setUserData({
        email: userInfo.email,
        followers: userInfo.followers,
        following: userInfo.following,
        bio: userInfo.bio,
        name: userInfo.name,
        avatar_url: userInfo.avatar_url,
        public_repos: userInfo.public_repos,
        hireable: userInfo.hireable,
        login: userInfo.login,
        type: userInfo.type
      })
      setUserError(null)
    } catch (error) {
      switch (error.message) {
        case ErrorCodes.userNotFound:
          setUserError(ErrorCodes.userNotFound)
          break;
        case ErrorCodes.failToConnect:
          setUserError(ErrorCodes.failToConnect)
          break;
        default:
          setUserError(ErrorCodes.failToConnect)
          break;
      }
      setUserData(null)
      setRepositoryInfo(null)
    } finally {
      setLoadingUserData(false)
    }
  }

  useEffect(() => {
    if (userData && userData.login) {
      getRepositoriesInfo(userData.login, currentPage, itemsPerPage, sortByFilter.criteria, sortByFilter.direction)
    }
  }, [currentPage, itemsPerPage, userData, sortByFilter])

  useEffect(() => {
    if (userData && userData.public_repos) {
      setRepositoriesCount(userData.public_repos)
    }
  }, [userData, setRepositoriesCount])

  /**
   * Esta função obtém informações relevantes sobre os repositórios de um usuário e salva-as no contexto.
   * 
   * @param {string} searchUsername - O nome do usuário a ser buscado
   * @param {number} targetPage - O número da página que se dejesa buscar
   * @param {number} itemsPerPage - A quantidade de itens desejados por página. Máx: 100
   * @param {string} sortBy - O critério de ordenação dos resultados. Aceita valores: "created", "update"
   * @param {string} direction - A direção da ordenação. Ex: "asc"(ascendente), "desc" (decrescente)
   */
  async function getRepositoriesInfo (searchUsername, targetPage, itemsPerPage, sortBy, direction) {
    try {
      setLoadingRepositoryData(true)
      const repositoryInfo = await GithubService.getReposInfo(searchUsername, targetPage, itemsPerPage, sortBy, direction)
      const relevantInfo = repositoryInfo.map((repo) => {
        return {
          name: repo.name,
          fullname: repo.full_name,
          url: repo.html_url,
          description: repo.description,
          forks: repo.forks_count,
          stars: repo.stargazers_count,
          watchers: repo.watchers_count,
          issues: repo.open_issues_count,
          language: repo.language
        }
      })
      setRepositoryInfo(relevantInfo)
      setRepositoryError(null)
    } catch (error) {
      switch (error.message) {
        case ErrorCodes.userNotFound:
          setRepositoryError(ErrorCodes.userNotFound)
          break;
        case ErrorCodes.failToConnect:
          setRepositoryError(ErrorCodes.failToConnect)
          break;
        default:
          break;
      }
      setUserData(null)
      setRepositoryInfo(null)
    } finally {
      setLoadingRepositoryData(false)
    }
  }

  return (
    <UserContext.Provider value={{
      username,
      setUsername,
      getUserInfo,
      userData,
      repositoryInfo,
      getRepositoriesInfo,
      loadingUserData,
      loadingRepositoryData,
      userError,
      repositoryError
    }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider