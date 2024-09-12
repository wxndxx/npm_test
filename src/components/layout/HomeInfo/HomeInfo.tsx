'use client'

import Container from '@/components/UI/Container/Container'
import { usePathname } from 'next/navigation'
import React from 'react'

type Props = {}

function HomeInfo({}: Props) {
    const path = usePathname()
    const parts = path.split("/");
    const basepath = parts[1];
  return (
    <div className='absolute w-full' style={{display: basepath != 'home' ? 'none' : 'block'}}>
        <Container>
          <div className='text-gray4 text-i-p4 flex justify-between w-full px-[4px] pt-[4px] z-20'>
            <div className='cursor-pointer'>
              Тюнинг ателье Matalex Performance
            </div>
            <div className='flex gap-[20px] cursor-pointer'><div>+7 877 907 35 03</div>
              <div className='flex gap-[3px] items-center'><svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.49992 0.333344C3.81992 0.333344 0.833252 3.32001 0.833252 7.00001C0.833252 10.68 3.81992 13.6667 7.49992 13.6667C11.1799 13.6667 14.1666 10.68 14.1666 7.00001C14.1666 3.32001 11.1799 0.333344 7.49992 0.333344ZM10.5933 4.86668C10.4933 5.92001 10.0599 8.48001 9.83992 9.66001C9.74658 10.16 9.55992 10.3267 9.38658 10.3467C8.99992 10.38 8.70658 10.0933 8.33325 9.84668C7.74658 9.46001 7.41325 9.22001 6.84659 8.84668C6.18659 8.41334 6.61325 8.17334 6.99325 7.78668C7.09325 7.68668 8.79992 6.13334 8.83325 5.99334C8.83788 5.97214 8.83727 5.95012 8.83146 5.92921C8.82565 5.9083 8.81482 5.88912 8.79992 5.87334C8.75992 5.84001 8.70658 5.85334 8.65992 5.86001C8.59992 5.87334 7.66658 6.49334 5.84659 7.72001C5.57992 7.90001 5.33992 7.99334 5.12658 7.98668C4.88658 7.98001 4.43325 7.85334 4.09325 7.74001C3.67325 7.60668 3.34659 7.53334 3.37325 7.30001C3.38658 7.18001 3.55325 7.06001 3.86659 6.93334C5.81325 6.08668 7.10659 5.52668 7.75325 5.26001C9.60658 4.48668 9.98659 4.35334 10.2399 4.35334C10.2933 4.35334 10.4199 4.36668 10.4999 4.43334C10.5666 4.48668 10.5866 4.56001 10.5933 4.61334C10.5866 4.65334 10.5999 4.77334 10.5933 4.86668Z" fill="#9A9AA5"/>
              </svg>
              <div className='cursor-pointer'>@Matalex_Perf</div>
              </div>
            </div>
          </div>
        </Container>
      </div>
  )
}

export default HomeInfo