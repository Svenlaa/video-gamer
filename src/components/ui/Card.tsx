import React, { FC, ReactNode } from 'react'

const Card: FC<{ children: ReactNode; bgColor: string }> = ({
  children,
  bgColor,
  ...props
}) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <div
    className={`rounded-md p-4 backdrop-blur-md backdrop-brightness-110 bg-${bgColor}`}
    {...props}
  >
    {children}
  </div>
)

export default Card
