import React, { useContext } from 'react'
import { UserContext } from '../../contexts/UserInfoContext'
import './SearchForm.css'

/**
 * Este componente renderiza a barra de busca da aplicação
 */
function SearchForm () {
  const { getUserInfo, setUsername, username, getRepositoriesInfo } = useContext(UserContext)
  
  async function fetchData (event, username) {
    event.preventDefault()
    await getUserInfo(username)
    await getRepositoriesInfo(username)
  }

  return (
    <div>
      <form onSubmit={(event) => fetchData(event, username)}>
        <div className="input-control">
          <input
            className="search-input"
            type="text"
            name="search"
            id="search_input"
            placeholder="Digite o nome do usuário"
            onChange={(event) => setUsername(event.target.value)}
          />
          <button className="search-button" >Buscar</button>
        </div>
      </form>
    </div>
  )
}

export default SearchForm