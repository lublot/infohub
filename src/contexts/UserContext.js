import React, { useState } from 'react';
import GithubService, { ErrorCodes } from '../services/GithubService'

export const UserContext = React.createContext()

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState("")
  const [userData, setUserData] = useState(null)
  const [reposInfo, setReposInfo] = useState(null)
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

  async function getRepositoriesInfo (searchUsername) {
    try {
      const reposInfo = await GithubService.getReposInfo(searchUsername)

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