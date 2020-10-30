import React, { useState } from 'react';
import GithubService, { ErrorCodes } from '../services/GithubService'

export const UserContext = React.createContext()

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState("")
  const [userData, setUserData] = useState(null)
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
        hireable: userInfo.hireable
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

  return (
    <UserContext.Provider value={{ username, setUsername, getUserInfo, setUserData, userData }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider