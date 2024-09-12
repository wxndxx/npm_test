'use client'
import Container from '@/components/UI/Container/Container'
import React, { useEffect, useState } from 'react'
import HomeMenu from '../HomeMenu/HomeMenu'
import AboutUs from '../AboutUs/AboutUs'
import Maps from '../Maps/Maps'
import HomeCataloge from '../HomeCataloge/HomeCataloge'
import OurWorks from '../OurWorks/OurWorks'
import MoreInfo from '../MoreInfo/MoreInfo'
import { onlineService } from '@/services/online.service'
import Reviews from '../Reviews/Reviews'


type Props = {
  comments: any, reviews: any, homeCataloge: any
}

interface IList {
  name: string,
  description: string,
  link: string
}

function HomePage({reviews}: Props) {
  const [list, setList] = useState<IList[]>()
useEffect(() => {

    onlineService.getComments()
    .then((res:any) => {
        setList(res)
    })

}, [])
  return (
    <Container>
        {list && list.length > 0 && <div className='flex flex-col xs:gap-[80px] gap-[40px] w-full'>
            <HomeMenu />
            <AboutUs />
            <Maps />
            <HomeCataloge />
            <OurWorks />
            <Reviews list={reviews}/>
            <MoreInfo />
        </div>}
    </Container>
  )
}

export default HomePage