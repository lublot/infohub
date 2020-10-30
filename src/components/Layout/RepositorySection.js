import React, { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'
import RepositoryCard from '../Cards/RepositoryCard'
import './RepositorySection.css'

function RepositorySection () {
  const { reposInfo } = useContext(UserContext)

  if (reposInfo && reposInfo.length > 0) {
    return (
      <section className="repository-container">
        <h2 className="section-title">Repositórios</h2>
        <ul className="list-container">
          {
            reposInfo.map((repo) => (
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
              />
            ))
          }
        </ul>
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
