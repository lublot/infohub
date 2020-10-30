import React, { useContext, useState } from 'react'
import { PaginationContext } from '../../contexts/PaginationContext'
import './FilterControl.css'

/**
 * Este componente exibe as opções de filtro nas buscas
 * 
 * @param {boolean} isShowing - Controla a exibição do componente 
 */
function FilterControl ({ isShowing }) {
  const { updateFilter, updateItemsPerPage } = useContext(PaginationContext)
  const [selected, setSelected] = useState("created_desc")
  
  function handleFilterUpdate (option) {
    updateFilter(option)
    setSelected(option)
  }
  if (!isShowing) { return null }
  
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
          <select onChange={(event) => handleFilterUpdate(event.target.value)}>
            <option value="created_desc" selected={selected === 'created_desc'} >
              Mais novo criado
            </option>
            <option value="created_asc" selected={selected === 'created_asc'} >
              Mais antigo criado
            </option>
            <option value="update_desc" selected={selected === 'update_desc'} >
              Atualizado recentemente
            </option>
            <option value="update_asc" selected={selected === 'update_asc'} >
              Atualização mais antiga
            </option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default FilterControl
