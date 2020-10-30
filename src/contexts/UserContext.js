import React, { useState, useEffect, useContext } from 'react';
import GithubService, { ErrorCodes } from '../services/GithubService'
import { RepositoryContext } from './RepositoryContext';

export const UserContext = React.createContext()

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState("")
  const [userData, setUserData] = useState(null)
  const [reposInfo, setReposInfo] = useState(null)
  const { currentPage, itemsPerPage, setReposCount, sortByFilter } = useContext(RepositoryContext)
  /**
   * Esta função obtém informações de um usuário desejado e salva-as no contexto.
   * 
   * @param {string} searchUsername - O nome do usuário a ser buscado
   */
  async function getUserInfo (searchUsername) {
    try {
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
    } catch (error) {
      switch (error.message) {
        case ErrorCodes.userNotFound:
          break;
        case ErrorCodes.failToConnect:
          break;
        default:
          break;
      }
    }
  }

  useEffect(() => {
    if (userData && userData.login) {
      getRepositoriesInfo(userData.login, currentPage, itemsPerPage, sortByFilter.criteria, sortByFilter.direction)
    }
  }, [currentPage, itemsPerPage, userData, sortByFilter])

  useEffect(() => {
    if (userData && userData.public_repos) {
      setReposCount(userData.public_repos)
    }
  }, [userData, setReposCount])

  async function getRepositoriesInfo (searchUsername, targetPage, itemsPerPage, sortBy, direction) {
    try {
      const reposInfo = await GithubService.getReposInfo(searchUsername, targetPage, itemsPerPage, sortBy, direction)

      const relevantInfo = reposInfo.map((repo) => {
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

      setReposInfo(relevantInfo)
    } catch (error) {
      switch (error.message) {
        case ErrorCodes.userNotFound:
          break;
        case ErrorCodes.failToConnect:
          break;
        default:
          break;
      }
    }
  }

  return (
    <UserContext.Provider value={{ username, setUsername, getUserInfo, userData, reposInfo, getRepositoriesInfo }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider