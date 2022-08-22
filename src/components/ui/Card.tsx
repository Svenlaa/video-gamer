import React, { FC, ReactNode } from 'react'

const Card: FC<{ children: ReactNode }> = ({ children, ...props }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <div
    className="rounded-md p-4 backdrop-blur-md backdrop-brightness-110"
    {...props}
  >
    {children}
  </div>
)

export default Card
