import React from 'react'
import s from './Container.module.scss'

type Props = {
    children: React.ReactNode
}

function Container({children}: Props) {
  return (
    <div className={s.container}>
      <div className={s.container__wrapper}>
        {children}
      </div>
    </div>
  )
}

export default Container