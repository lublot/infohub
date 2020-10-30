import React from 'react'
import { Eye, Star, GitMerge } from 'react-feather'
import './RepositoryCard.css'

/**
 * Este componente renderiza o card de exibição das informações de um repositório.
 * Ele apresenta um componente aninhado que é responsável por formatar a "descrição" de um repositório
 * 
 * 
 * @param {string} name - O nome abreviado do repositório 
 * @param {string} fullname - O nome completo do repositório 
 * @param {string} description - A url do repositório
 * @param {number} stars - A quantidade de estrelas no Github
 * @param {number} forks - A quantidade de forks no Github
 * @param {number} watchers - A quantidade de watchers no Github
 */
function RepositoryCard ({ name, fullname, description, url, stars, forks, watchers }) {
  function Description ({ description }) {
    return description ? 
      (<p className="description"> {description} </p> ) :
      (<p className="description empty"> Nenhuma descrição disponível </p>)
  }

  return (
    <li className="card-container">
      <a href={url} target="_blank" rel="noopener noreferrer" className="heading-link">
        <h4 className="heading-title">{name}</h4>
        <span className="heading-fullname">{fullname}</span>
      </a>
      <Description description={description}/>
      <div className="card-stats-container">
        <span className="info-container">
          <Star size={18} />
          <span className="value">{stars} stars</span>
        </span>
        <span className="info-container">
          <GitMerge size={18}/>
          <span className="value">{forks} forks</span>
        </span>
        <span className="info-container">
          <Eye size={18}/>
          <span className="value">{watchers} watchers</span>
        </span>
      </div>
    </li>
  )
}

export default RepositoryCard
