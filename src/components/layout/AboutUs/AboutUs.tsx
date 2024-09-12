import React from 'react'
import s from './AboutUs.module.scss'
import Container from '@/components/UI/Container/Container'
import Icon from '@/components/UI/Icon/Icon'
import Link from 'next/link'

type Props = {}

function AboutUs({}: Props) {
  return (
    <div className={s.about}>
      <Container>
        <div className={s.wrapp}>
          <div className='w-full text-center flex flex-col gap-[10px]'>
            <h2 className='text-u-h2 text-gray6 font-bold uppercase'>MATALEX Performance это</h2>
            <p className='text-i-p2 text-gray6'>Узнайте, чем мы можем быть полезны для вас.</p>
          </div>
          <div className='flex flex-col gap-[10px]'>
            <div className='flex gap-[10px] flex-col m:flex-row'>
              <div className={s.card}>
                <div className='w-full flex gap-[13px]'><Icon type='speed2' color='rgba(0, 125, 191, 1)'/><h4 className='text-u-h4 text-gray6 font-bold'>Качественные автозапчасти</h4></div>
                <div className='text-i-p2 pl-[34px]'>Работаем с ведущими производителями автомобильных запчастей и тюнинг-аксессуаров.</div>
              </div>
              <div className={s.card}>
                <div className='w-full flex gap-[13px]'><Icon type='car1' color='rgba(0, 125, 191, 1)'/><h4 className='text-u-h4 text-gray6 font-bold'>Уникальный автотюнинг</h4></div>
                <div className='text-i-p2 pl-[34px]'>Предлагаем уникальные решения для тюнинга вашего автомобиля, помогая создать стиль, отражающий вашу индивидуальность.</div>
              </div>
            </div>
            <div className='flex gap-[10px] flex-col m:flex-row'>
              <div className={s.card}>
                <div className='w-full flex gap-[13px]'><Icon type='user' color='rgba(0, 125, 191, 1)'/><h4 className='text-u-h4 text-gray6 font-bold'>Индивидуальный подход</h4></div>
                <div className='text-i-p2 pl-[34px]'>Понимаем, что каждый клиент уникален, поэтому мы всегда нацелены на обеспечение индивидуального подхода к каждому проекту.</div>
              </div>
              <div className={s.card}>
                <div className='w-full flex gap-[13px]'><Icon type='bag2' color='rgba(0, 125, 191, 1)'/><h4 className='text-u-h4 text-gray6 font-bold'>Профессиональный сервис</h4></div>
                <div className='text-i-p2 pl-[34px]'>Гарантируем профессиональный и качественный сервис при каждом шаге работы с нами.</div>
              </div>
            </div>
            <div className={s.card_blue + ' ' + 'hidden m:flex'}>
                <div className='w-full gap-[10px] flex flex-col'><div className='w-full flex gap-[13px]'><Icon type='accept' color='white'/><h4 className='text-u-h4 text-white font-bold'>Доставим или установим детали, все в одном месте</h4></div>
                <div className='text-i-p2 pl-[34px] w-full'>Установить или только доставить запчасть - выберите сами!</div></div>
                <div className='w-full flex justify-end'><Link href={'catalog'} className='btn__s w-[130px] p-[8.5px_15px]'>В каталог <Icon type='uf' /></Link></div>
              </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default AboutUs