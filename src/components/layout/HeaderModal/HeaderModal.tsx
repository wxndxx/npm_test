'use client'

import Container from '@/components/UI/Container/Container';
import Icon from '@/components/UI/Icon/Icon';
import Input from '@/components/UI/Input/Input';
// import useTypedValue from '@/hook/useTypedValue';
import { basketService } from '@/services/busket.service';
import { onChangeBasket, onChangeStatus, onChangeSum } from '@/store/Slices/BasketSlice';
import { onChangeModal } from '@/store/Slices/HomeSlice';
import { setModal, setModalLink } from '@/store/Slices/ProfileSlice';
import { useTypedDispatch, useTypedSelector } from '@/store/store'
import { MyStorage } from '@/utils/MyStorage';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

type Props = {}

const Modal = () => {
  useEffect(() => {
    document.body.classList.add("modal-open")

    return () => {
        document.body.classList.remove("modal-open")
    }
  }, [])

  // const {value, setValue} = useTypedValue();

  const list = [
    {url: '/catalog', title: 'Каталог'},
    {url: '/our_works', title: 'Наши работы'},
    {url: '/portfolio', title: 'Ателье'},
    {url: '/documents?page=1', title: 'Документы'},
    {url: '/contacts', title: 'Контакты'},
  ];

  const dispatch = useTypedDispatch()
  const isAuth = useTypedSelector((state) => state.profile.isAuth)
  // const windowInnerWidth = window.innerWidth;
  // useEffect(() => {
  //   console.log(windowInnerWidth)
  //   if(windowInnerWidth > 1120) {
  //     dispatch(onChangeModal(false))
  //   }
  // }, [])
  const path = usePathname()
  const {push} = useRouter()
  const {sum} = useTypedSelector((state) => state.basket)
  useEffect(() => {
    console.log(path)
    if(path != '/basket' && path != '/payment' && MyStorage.get('accessToken')) {
        basketService.getBusket()
        .then((res:any) => {
            dispatch(onChangeStatus(true))
            dispatch(onChangeBasket(res))
            dispatch(onChangeSum(res.appointments_sum + res.products_sum))
            //setStateSum(res.appointments_sum + res.products_sum)
        })
        .catch((err:any) => {
            console.log(err)
        })
    }
}, [path, sum])

  function insertSpaces(number:string) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  return (
    <div className='fixed  w-full h-full z-[30] bg-gray1 pt-[85px]'>
    <Container>
      <div className='w-full p-[0px_10px_25px_10px] flex-col flex justify-between h-full'>
        <div className=' w-full flex-col gap-[16px] flex'>
            <Input type='search' placeholder='Поиск по деталям' value={''} onClick={() => {
              push('/search')
              setTimeout(() => dispatch(onChangeModal(false)), 10)
              //document?.getElementById('search')?.focus()
            }} onChange={() => {}}></Input>
            <div className='grid grid-cols-2 gap-[16px] w-full m-auto'>
              <button disabled={sum === 0} className='btn__p flex gap-[5px] items-center justify-center py-[9px] rounded-[8px]' onClick={() => {
                push('/basket')
                setTimeout(() => dispatch(onChangeModal(false)), 10)
              }}>{sum > 0 && <p className='h-full flex items-center justify-center'>{insertSpaces(`${sum}`)}₽</p>}<Icon type='bag'></Icon></button>
              {!isAuth ? <button className='btn__p p-[5px_15px] flex justify-center' onClick={() => {
                  if(!isAuth) {
                      dispatch(setModal(true))
                      dispatch(setModalLink(null))
                  }
              }}>Войти</button> : <Link onClick={() => {dispatch(onChangeModal(false))}} href={'/profile'} className='btn__s flex justify-center p-[5px_19px]'><Icon type='user'/></Link>}
            </div>
          <div className='flex flex-col'>
            {list.map(({url, title}, index) => (
              <div key={index} onClick={() => {
                push(url)
                setTimeout(() => dispatch(onChangeModal(false)), 10)
              }} className='p-[15px_10px] xs:text-[18px] text-[14px] cursor-pointer text-u-h4 font-bold'>{title}</div>
            ))}
          </div>
        </div>
        <div className='w-full flex flex-col gap-[6px]'>
          <div>
          <div className='h-full flex gap-[10px] items-center px-[5px]'>
                                    <Link href={'https://vk.com/matalex_official?from=search'}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1.68 1.68C3.17891e-07 3.376 0 6.088 0 11.52V12.48C0 17.904 3.17891e-07 20.616 1.68 22.32C3.376 24 6.088 24 11.52 24H12.48C17.904 24 20.616 24 22.32 22.32C24 20.624 24 17.912 24 12.48V11.52C24 6.096 24 3.384 22.32 1.68C20.624 3.17891e-07 17.912 0 12.48 0H11.52C6.096 0 3.384 3.17891e-07 1.68 1.68ZM4.048 7.304H6.8C6.888 11.88 8.904 13.816 10.504 14.216V7.304H13.088V11.248C14.664 11.08 16.328 9.28 16.888 7.296H19.464C19.254 8.32304 18.8345 9.29574 18.2316 10.1533C17.6287 11.0109 16.8554 11.7348 15.96 12.28C16.9592 12.7772 17.8417 13.4806 18.5491 14.3438C19.2566 15.2071 19.7729 16.2105 20.064 17.288H17.224C16.616 15.392 15.096 13.92 13.088 13.72V17.288H12.768C7.296 17.288 4.176 13.544 4.048 7.304Z" fill="#51BEF9"/>
                                    </svg>
                                    </Link>
                                    <Link href={'https://t.me/matalextuning'}>
                                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14.0001 0.666687C6.64008 0.666687 0.666748 6.64002 0.666748 14C0.666748 21.36 6.64008 27.3334 14.0001 27.3334C21.3601 27.3334 27.3334 21.36 27.3334 14C27.3334 6.64002 21.3601 0.666687 14.0001 0.666687ZM20.1867 9.73335C19.9867 11.84 19.1201 16.96 18.6801 19.32C18.4934 20.32 18.1201 20.6534 17.7734 20.6934C17.0001 20.76 16.4134 20.1867 15.6667 19.6934C14.4934 18.92 13.8267 18.44 12.6934 17.6934C11.3734 16.8267 12.2267 16.3467 12.9867 15.5734C13.1867 15.3734 16.6001 12.2667 16.6667 11.9867C16.676 11.9443 16.6748 11.9003 16.6632 11.8584C16.6515 11.8166 16.6299 11.7782 16.6001 11.7467C16.5201 11.68 16.4134 11.7067 16.3201 11.72C16.2001 11.7467 14.3334 12.9867 10.6934 15.44C10.1601 15.8 9.68008 15.9867 9.25341 15.9734C8.77341 15.96 7.86675 15.7067 7.18675 15.48C6.34675 15.2134 5.69341 15.0667 5.74675 14.6C5.77341 14.36 6.10675 14.12 6.73342 13.8667C10.6267 12.1734 13.2134 11.0534 14.5067 10.52C18.2134 8.97335 18.9734 8.70669 19.4801 8.70669C19.5868 8.70669 19.8401 8.73335 20.0001 8.86669C20.1334 8.97335 20.1734 9.12002 20.1867 9.22669C20.1734 9.30669 20.2001 9.54669 20.1867 9.73335Z" fill="#51BEF9"/>
                                    </svg>
                                    </Link>
                                    <Link href={'https://www.youtube.com/channel/UC3vbfTipX1VSm_tSN9pKJrQ'}>
                                    <svg width="28" height="20" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.3334 14L18.2534 10L11.3334 6.00002V14ZM26.7467 3.56002C26.9201 4.18669 27.0401 5.02669 27.1201 6.09335C27.2134 7.16002 27.2534 8.08002 27.2534 8.88002L27.3334 10C27.3334 12.92 27.1201 15.0667 26.7467 16.44C26.4134 17.64 25.6401 18.4134 24.4401 18.7467C23.8134 18.92 22.6667 19.04 20.9067 19.12C19.1734 19.2134 17.5867 19.2534 16.1201 19.2534L14.0001 19.3334C8.41341 19.3334 4.93341 19.12 3.56008 18.7467C2.36008 18.4134 1.58675 17.64 1.25341 16.44C1.08008 15.8134 0.960081 14.9734 0.880082 13.9067C0.786748 12.84 0.746748 11.92 0.746748 11.12L0.666748 10C0.666748 7.08002 0.880081 4.93335 1.25341 3.56002C1.58675 2.36002 2.36008 1.58669 3.56008 1.25335C4.18675 1.08002 5.33342 0.96002 7.09342 0.88002C8.82675 0.786687 10.4134 0.746687 11.8801 0.746687L14.0001 0.666687C19.5867 0.666687 23.0667 0.88002 24.4401 1.25335C25.6401 1.58669 26.4134 2.36002 26.7467 3.56002Z" fill="#51BEF9"/>
                                    </svg>
                                    </Link>
                                    <Link href={'tel:+7 (985) 425-16-36'} className='text-[#007DBF] text-u-h4'>+7 (985) 425-16-36</Link>
                        </div>
          </div>
          <div className='border-l border-l-[#F2F2F5] text-u-h4 text-gray1 text-[14px] leading-[15px] pb-[10px]'>Тюнинг ателье,<br />
                        доставка по всему миру</div>
          <Link href={'https://yandex.ru/maps/213/moscow/house/sovetskaya_ulitsa_80s9/Z04YcQJiTEYCQFtvfXt4dHtjZg==/?ll=37.752535%2C55.795702&z=17.64'} className='text-[12px] text-gray4'>Советская ул., 80, стр. 9</Link>
          <div className='flex items-center justify-between gap-[6px]'>
            <div className='text-[12px] text-gray4 flex items-center gap-[2px]'>  
            </div>
          </div>
        </div>
      </div>
    </Container>
  </div>
  )
}

function HeaderModal({}: Props) {
  const {modal} = useTypedSelector((state) => state.home);
  const [state, setState] = useState<boolean>(modal)
  useEffect(() => {
    setState(modal)
  }, [modal])
  return (
    <>
      {state && <Modal />}
    </>
  )
}

export default HeaderModal