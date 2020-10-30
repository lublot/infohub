import React, { useContext, useState } from 'react'
import { UserContext } from '../../contexts/UserContext'
import RepositoryCard from '../Cards/RepositoryCard'
import './RepositorySection.css'
import PaginationControl from '../Forms/PaginationControl'
import FilterControl from '../Forms/FilterControl'
import { Sliders } from 'react-feather';

function RepositorySection () {
  const { reposInfo } = useContext(UserContext)
  const [showFilters, setShowFilters] = useState(false)
  if (reposInfo && reposInfo.length > 0) {
    return (
      <section className="repository-container">
        <h2 className="section-title">Repositórios</h2>
        <button onClick={ () => setShowFilters(!showFilters) }>
          <Sliders />
        </button>
        <FilterControl isShowing={showFilters}/>
        <ul className="list-container">
          {
            reposInfo.map((repo, index) => (
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
  } else {
    return (
      <div>

      </div>
    )
  }
}

export default RepositorySection
