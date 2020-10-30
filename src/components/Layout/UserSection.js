import React, { useContext } from 'react';
import { UserContext } from '../../contexts/UserInfoContext';
import './UserSection.css';

/**
 * Este componente renderiza a seção de informações sobre um usuário.
 * Possui um componente aninhado que é responsável por verificar se um usuário está elegível para contratação
 */
function UserSection() {
  const { userData, loadingUserData } = useContext(UserContext)

  function Hireable ({ isHireable, name, userType }) {
    /**
     * Se a conta for de um "usuário", avalia se ele está disponível para contratação.
     * No entanto, se a conta for de uma "organização" ignora este campo e não renderiza.
     */
    if (userType.toLowerCase() === "user") {
      if (isHireable) {
        return (
          <span className="hireable free">
            {name} está disponível para contratação.
          </span>
        ) 
      } else {
        return (
          <span className="hireable busy">
            {name} não está disponível para contratação.
          </span>
        )
      }
    } else {
      return null
    }     
  }

  if (loadingUserData) {
    return (
      <span>
        Carregando informações sobre o usuário...
      </span>
    )
  } else {
    return (
      <section className="grid-container">
        <div>
          <img className="avatar"
            src={userData.avatar_url}
            alt={`Perfil de ${userData.name}`}/>
        </div>
        <div className="info-container">
          <h2>{userData.login} | {userData.name}</h2>
          <span>{userData.email}</span>
          {userData.public_repos} repositórios | {userData.followers} seguidores | {userData.following} seguindo
          <p className="bio">
            {userData.bio}
          </p>
          <Hireable isHireable={userData.hireable} name={userData.login} userType={userData.type}/>
        </div>
      </section>
    )
  }
}

export default UserSection

