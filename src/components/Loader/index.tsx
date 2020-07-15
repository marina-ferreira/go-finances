import React from 'react'

import { Loader as LoaderStyles } from './styles'

interface LoaderProps {
  color?: string
}

const Loader: React.FC<LoaderProps> = ({ color = '#FF872C' }: LoaderProps) => (
  <LoaderStyles color={color}>
    <div className="double-bounce1" />
    <div className="double-bounce2" />
  </LoaderStyles>
)

export default Loader
