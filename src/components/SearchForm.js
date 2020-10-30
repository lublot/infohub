import React, { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'
import './SearchForm.css'

function SearchForm () {
  const { getUserInfo, setUsername, username } = useContext(UserContext)
 
  return (
    <div>
      <div className="input-control">
        <input
          className="search-input"
          type="text"
          name="search"
          id="search_input"
          placeholder="Digite o nome do usuário"
          onChange={(event) => setUsername(event.target.value)}
        />
        <button className="search-button" onClick={() => getUserInfo(username)}>Buscar</button>
      </div>
    </div>
  )
}

export default SearchForm