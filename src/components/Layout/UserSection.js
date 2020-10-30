import React, { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import './UserSection.css';

function UserSection() {
  const { userData } = useContext(UserContext)

  function Hireable ({ isHireable, name, userType }) {
    if (userType.toLowerCase() === "user") {
      if (isHireable) {
        return (
          <span className="hireable free">
            {name} está disponível para trabalhar
          </span>
        ) 
      } else {
        return (
          <span className="hireable busy">
            {name} não está disponível para trabalhar
          </span>
        )
      }
    } else {
      return null
    }     
  }

  if (userData) {
    return (
      <section className="grid-container">
        <div>
          <img className="avatar"
            src={userData.avatar_url}
            alt={`Perfil de ${userData.name}`}/>

        </div>
        <div className="info-container">
          <h2>{userData.login} ({userData.name})</h2>
          <span>{userData.email}</span>
          {userData.public_repos} repositórios | {userData.followers} seguidores | {userData.following} seguindo
          <p className="bio">
            {userData.bio}
          </p>
          <Hireable isHireable={userData.hireable} name={userData.name} userType={userData.type}/>
        </div>
      </section>
    )
  } else {
    return (
      <div>
        Oi
      </div>
    )
  }
}

export default UserSection

