import React, { useContext, useState } from 'react'
import { UserContext } from '../../contexts/UserInfoContext'
import RepositoryCard from '../Cards/RepositoryCard'
import './RepositorySection.css'
import PaginationControl from '../Control/PaginationControl'
import FilterControl from '../Control/FilterControl'
import { Sliders } from 'react-feather';

/**
 * Este componente renderiza a seção de informações sobre os repositórios de um usuário.
 */
function RepositorySection () {
  const { repositoryInfo, loadingRepositoryInfo } = useContext(UserContext)
  const [showFilters, setShowFilters] = useState(false)
  
  if (loadingRepositoryInfo) {
    return (
      <div>
        <span>
          Carregando informações dos repositórios...
        </span>
        <br/>
      </div>
    )
  } else if (repositoryInfo.length === 0) {
    return (
      <div>
        Não foram encontrados repositórios para este usuário.
      </div>
    )
  } else {
    return (
      <section className="repository-container">
        <div className="heading-container">
          <h2 className="section-title">Repositórios</h2>
          <button onClick={ () => setShowFilters(!showFilters) }>
            <Sliders />
          </button>
        </div>
        <FilterControl isShowing={showFilters}/>
        <ul className="list-container">
          {
            repositoryInfo.map((repo, index) => (
              <RepositoryCard
                name={repo.name}
                fullname={repo.fullname}
                description={repo.description}
                url={repo.url}
                language={repo.language}
                stars={repo.stars}
                forks={repo.forks}
                issues={repo.issues}
                watchers={repo.watchers}
                key={index}
              />
            ))
          }
        </ul>
        <PaginationControl />
      </section>
    )
  }
}

export default RepositorySection
