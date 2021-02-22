import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const NavItem = ({ href, children }) => {
  const router = useRouter()

  let className = children.props.className || ''
  if(router.pathname === '/' && router.pathname === href) {
    className = `${className} selected`
  } else if (href !== '/' && router.pathname.includes(href)) {
    className = `${className} selected`
  }

  return (
    <Link href={href}>{React.cloneElement(children, { className })}</Link>
  )
}

export default NavItem