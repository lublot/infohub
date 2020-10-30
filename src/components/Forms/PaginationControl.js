import React, {useContext} from 'react'
import { RepositoryContext } from '../../contexts/RepositoryContext'
import { ChevronLeft, ChevronRight } from 'react-feather'
import './PaginationControl.css'

function PaginationControl () {
  const { totalPages, currentPage, updateCurrentPage } = useContext(RepositoryContext)

  const hasNext = currentPage < totalPages
  const hasPrevious = currentPage > 1

  return (
    <div className="pagination-container">
      <button
        onClick={() => updateCurrentPage(currentPage - 1) }
        className={!hasPrevious ? 'hidden' : ''}
        disabled={!hasPrevious}>
        <ChevronLeft size={16} />
        Anterior
      </button>
      <span className="pagination-selector">
        <input type="number" value={currentPage} onChange={(event) => updateCurrentPage(event.target.value)}/> / {totalPages}
      </span>
      <button
        onClick={() => updateCurrentPage(currentPage + 1) }
        className={!hasNext ? 'hidden' : ''}
        disabled={!hasNext}>
        Próximo
        <ChevronRight size={16} />
      </button>
    </div>
  )
}

export default PaginationControl
