import React, { useContext } from 'react'
import { RepositoryContext } from '../../contexts/RepositoryContext'
import './FilterControl.css'

function FilterControl ({ isShowing }) {
  const { updateFilter, updateItemsPerPage } = useContext(RepositoryContext)
  if (!isShowing) {
    return null
  }
  return (
    <div className="filter-container">
      <h4 className="heading">Critérios de Busca</h4>
      <div className="options-container">
        <div className="field-control">
          Itens por página (máx: 100):
          <input type="number" min={0} max={100} onChange={(event) => updateItemsPerPage(event.target.value) }/>
        </div>
        <div className="field-control">
          Ordenar por:
          <select onChange={(event) => updateFilter(event.target.value)}>
            <option value="created_desc">Mais novo criado</option>
            <option value="created_asc" >Mais antigo criado</option>
            <option value="update_desc" >Atualizado recentemente</option>
            <option value="update_asc" >Atualização mais antiga</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default FilterControl
