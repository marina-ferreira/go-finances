import React from 'react'

import { NavLink as Link } from 'react-router-dom'

import Logo from 'assets/logo.svg'
import { Container } from './styles'

interface HeaderProps {
  size?: 'small' | 'large'
}

const navActiveStyle = {
  borderBottom: '2px solid #FF872C'
}

const Header: React.FC<HeaderProps> = ({ size = 'large' }: HeaderProps) => {
  return (
    <Container size={size}>
      <header>
        <img src={Logo} alt="GoFinances" />
        <nav>
          <Link to="/" exact activeStyle={navActiveStyle}>
            Dashboard
          </Link>
          <Link to="/import" activeStyle={navActiveStyle}>
            Import
          </Link>
        </nav>
      </header>
    </Container>
  )
}

export default Header
