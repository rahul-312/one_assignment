import React from 'react'

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  className?: string
  title?: string;
}

export default function Button({
  children,
  onClick,
  type = 'button',
  className = '',
}: ButtonProps) {
  return (
    <button type={type} onClick={onClick} className={`cursor-pointer ${className}`}>
      {children}
    </button>
  )
}
