import React from 'react'
import { NavLink } from 'react-router-dom'

const TopHeader = () => (
  <div className="topHeader">
    <h1>Progressing Forward</h1>
    <NavLink to="/login">Login</NavLink>
  </div>
)

export default TopHeader
