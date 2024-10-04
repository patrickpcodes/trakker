import React from 'react'

const MockedLink = ({ children, href }: { children: React.ReactNode; href: string }) => (
  <a href={href}>{children}</a>
)

export default MockedLink