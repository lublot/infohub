import React, { useContext } from 'react'
import './FilterControl.css'

function FilterControl({ isShowing }) {
  if (!isShowing) {
    return null
  }
  return (
    <div className="filter-container">
      <h4 className="heading">Critérios de Busca</h4>
      <div className="options-container">
        <div className="field-control">
          Itens por página (máx: 100): <input type="number"/>
        </div>
        <div className="field-control">
          Ordenar por:
          <select>
            <option>Mais antigo criado</option>
            <option>Mais novo criado</option>
            <option>Atualizado recentemente</option>
            <option>Atualização mais antiga</option>
          </select>
        </div>
        <button>
          Aplicar Filtros
        </button>
      </div>
    </div>
  )
}

export default FilterControl
