import React, { useState, useEffect } from 'react'

export const PaginationContext = React.createContext()

/**
 * Este contexto lida com o controle da paginação da aplicação.
 * O contexto garante que as regras de negócio para a atualização de dados seja coerente 
 * e decide se deve atualizar ou não o estado da aplicação.
 * Aqui também é calculada a quantidade de páginas de repositórios no perfil de um usuário.
 */
export const PaginationProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(6)
  const [sortByFilter, setSortByFilter] = useState({ criteria: "created", direction: "desc" })
  const [totalPages, setTotalPages] = useState(2)
  const [repositoriesCount, setRepositoriesCount] = useState(0)

  useEffect(() => {
    setTotalPages(Math.ceil(repositoriesCount / itemsPerPage))
  }, [itemsPerPage, repositoriesCount])


  function updateCurrentPage (newPage) {
    const page = parseInt(newPage)
    if (typeof page == 'number' && page > 0 && page <= totalPages) {
      setCurrentPage(page)
      return true
    }
    return false
  }

  function updateItemsPerPage (newPage) {
    const GITHUB_ITEMS_LIMIT = 100
    const page = parseInt(newPage)
    if (typeof page != 'number') {
      return false
    } else if (page > GITHUB_ITEMS_LIMIT) {
      setItemsPerPage(GITHUB_ITEMS_LIMIT)
    } else {
      setItemsPerPage(page)
    }
    return true
  }

  function updateFilter (value) {
    switch (value) {
      case "created_asc":
        setSortByFilter({ criteria: "created", direction: "asc" })
        break;
      case "created_desc":
        setSortByFilter({ criteria: "created", direction: "desc" })
        break;
      case "update_asc":
        setSortByFilter({ criteria: "update", direction: "asc" })
        break;
      case "update_desc":
        setSortByFilter({ criteria: "update", direction: "desc" })
        break;
      default:
        setSortByFilter({ criteria: "created", direction: "asc" })
        break;
    }
  }

  return (
    <PaginationContext.Provider value={{
      currentPage,
      itemsPerPage,
      totalPages,
      updateCurrentPage,
      setRepositoriesCount,
      updateItemsPerPage,
      sortByFilter,
      updateFilter
    }}>
      {children}
    </PaginationContext.Provider>
  )
}

export default PaginationProvider