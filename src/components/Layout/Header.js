import React from 'react'
import './Header.css'
import SearchForm from '../Forms/SearchForm'

function Header() {
  return (
    <div>
      <h1 className="title">
        <span className="title-left">INFO</span>
        <span className="title-right">HUB</span>
      </h1>
      <SearchForm />
    </div>
  )
}

export default Header