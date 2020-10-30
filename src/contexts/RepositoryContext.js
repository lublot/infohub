import React, { useState, useEffect } from 'react'

export const RepositoryContext = React.createContext()

export const RepositoryProvider = ({ children }) => {

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(6)
  const [totalPages, setTotalPages] = useState(2)
  const [reposCount, setReposCount] = useState(0)

  useEffect(() => {
    setTotalPages(Math.ceil(reposCount / itemsPerPage))
  }, [itemsPerPage, reposCount])


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
      setCurrentPage(GITHUB_ITEMS_LIMIT)
    } else {
      setCurrentPage(page)
    }
    return true
  }

  return (
    <RepositoryContext.Provider value={{ currentPage, itemsPerPage, totalPages, updateCurrentPage, setReposCount, updateItemsPerPage }}>
      {children}
    </RepositoryContext.Provider>
  )
}

export default RepositoryProvider