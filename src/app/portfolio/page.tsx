'use client'

import Container from '@/components/UI/Container/Container'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useState } from 'react'
import s from './style.module.scss'
import first from '../../../public/icons/IMG_6859.png'
import sec from '../../../public/images/IMG_6780 1.png'
import third from '../../../public/images/IMG_6850.png'
import fourt from '../../../public/images/IMG_6773 1.png'
import slider1 from '../../../public/images/IMG_6750 1.png'
import Slider, { Settings } from 'react-slick'
import Icon from '@/components/UI/Icon/Icon'
import OurWorks from '@/components/layout/OurWorks/OurWorks';
import Image from 'next/image';
import notFound from '../../../public/images/notFound.png'

type Props = {}

interface ICustomPrevArrowProps {
    onClick?: () => void;
    current?: any;
    max?: number
  }

  const CustomPrevArrow: React.FC<ICustomPrevArrowProps> = ({ onClick, current }) => (
    <div className={s.prev}>
        <button disabled={current === 0} className='btn__s p-[14px_24px]' onClick={onClick}>
            <Icon type='vector_back'></Icon>
        </button>
    </div>
);

const CustomNextArrow: React.FC<ICustomPrevArrowProps> = ({ onClick, current, max }) => (
    <div className={s.next}>
        <button disabled={current === max} className='btn__s p-[14px_24px]' onClick={onClick}>
            <Icon type='vector_forvard'></Icon>
        </button>
    </div>
);

function page({}: Props) {
    const list:any[] = [
        slider1,
        slider1,
        slider1,
        slider1,
    ]
    const [currentSlide, setCurrentSlide] = useState<number>(1)
    const sliderRef2 = React.useRef<Slider | null>(null);

    const settings2: Settings = {
        infinite: false,
        slidesToShow: 1,
        //focusOnSelect: true,
        // slidesToScroll: 1,
        className: s.slider,
        swipeToSlide: true,
        autoplay: false,
        touchMove: list && list.length < 5 ? false : true,
        prevArrow: <></>,
        nextArrow: <></>,
        pauseOnHover: true,
        beforeChange: (_oldIndex, newIndex) => {
          setCurrentSlide(newIndex);
        },
      };

      const next = () => {
            sliderRef2.current?.slickNext();
      };
      const previous = () => {
        sliderRef2.current?.slickPrev();
      };
  return (
    <div className=''>
        <Container>
            <div className='py-[35px] xs:py-[50px] px-[10px] xs:px-[0px] m:py-[80px] w-full h-full flex flex-col gap-[35px] xs:gap-[50px] m:gap-[80px]'>
                <div className='flex flex-col gap-[10px] xs:gap-[20px] mx-[-10px] xs:mx-0 '>
                <h2 className='l:hidden block text-u-h2 font-bold uppercase'>Подлинная мастерская тюнинга автомобилей</h2>
                <div className='h-[731px] w-full grid grid-cols-12 grid-rows-71 l:grid-rows-36 gap-[0px_10px] l:gap-[0px_30px]'>
                    <div className={s.first}>
                        <Image src={first} className='w-full h-full absolute top-0 left-0 object-cover' alt="" />
                    </div>
                    <div className={s.sec}>
                        <Image src={sec} className='w-full h-full absolute top-0 left-0 object-cover' alt="" />
                    </div>
                    <div className={s.third}>
                        <div className={s.fourth}><h2 className='text-u-h2 font-bold uppercase min-w-[570px]'>Подлинная мастерская тюнинга автомобилей</h2></div>
                        <div className={s.fifth}>
                            <Image src={third} className='w-full h-full absolute top-0 left-0 object-cover' alt="" />
                        </div>
                        <div className={s.sixth}>
                            <Image src={fourt} className='w-full h-full absolute top-0 left-0 object-cover' alt="" />
                        </div>
                    </div>
                </div>
                </div>
                <div>
                    <div>
                        <div className='w-full xs:w-[83%] m-[0_auto] relative'>
                            <h2 className='text-u-h2 font-bold uppercase mb-[20px] w-full xs:w-[79%] m-[0px_auto]'>Больше фото</h2>
                            <div className='m-[0_auto] w-full xs:w-[80%] rounded-[8px] overflow-hidden'>
                                <CustomPrevArrow onClick={previous} current={currentSlide}/>
                                <CustomNextArrow onClick={next} max={list.length} current={currentSlide}/>
                                <Slider ref={sliderRef2} {...settings2} className={s.slider}>
                                    {list?.map((image:any, index:number) => {
                                        //
                                        return(
                                    <div key={index} className={'rounded-[8px] relative overflow-hidden h-[200px] n:h-[300px] xxs:h-[350px] xs:h-[400px] m:h-[500px]'}>
                                        <Image width={500} height={500} className='object-cover absolute top-0 left-0 w-full h-full' src={image ?? notFound.src} alt="img" />
                                    </div> 
                                    )})}
                                </Slider>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col m:flex-row gap-[25px] xxs:gap-[30px] xs:gap-[45px] m:gap-[64px] w-full m:w-[66.5%] m-[0_auto]'>
                    <div className='flex h-full flex-col gap-[5px]'>
                        <p className='flex items-center text-[40px] xs:text-[50px] m:text-[70px] text-u-h1 font-bold uppercase text-prim3'>
                        <span>5</span>
                            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 0.5C12 7.12742 6.62742 12.5 0 12.5C6.62742 12.5 12 17.8726 12 24.5C12 17.8726 17.3726 12.5 24 12.5C17.3726 12.5 12 7.12742 12 0.5Z" fill="#51BEF9"/>
                            </svg>
                        </p>
                        <p>Крупных поставщиков работают с нами</p>
                    </div>
                    <div className='flex h-full flex-col gap-[5px]'>
                        <p className='flex items-center text-[40px] xs:text-[50px] m:text-[70px] text-u-h1 font-bold uppercase text-prim3'>
                        <span>5000</span>
                            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 0.5C12 7.12742 6.62742 12.5 0 12.5C6.62742 12.5 12 17.8726 12 24.5C12 17.8726 17.3726 12.5 24 12.5C17.3726 12.5 12 7.12742 12 0.5Z" fill="#51BEF9"/>
                            </svg>
                        </p>
                        <p>Клиентов выбрали нас</p>
                    </div>
                    <div className='flex h-full  flex-col gap-[5px]'>
                        <p className='flex items-center text-[40px] xs:text-[50px] m:text-[70px] text-u-h1 font-bold uppercase text-prim3'>
                        <span>35</span>
                            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 0.5C12 7.12742 6.62742 12.5 0 12.5C6.62742 12.5 12 17.8726 12 24.5C12 17.8726 17.3726 12.5 24 12.5C17.3726 12.5 12 7.12742 12 0.5Z" fill="#51BEF9"/>
                            </svg>
                        </p>
                        <p className=''>Машин обслуживаются одновременно</p>
                    </div>
                    <div className='flex h-full flex-col gap-[5px]'>
                        <p className='flex items-center text-[40px] xs:text-[50px] m:text-[70px] text-u-h1 font-bold uppercase text-prim3'>
                        <span>21</span>
                            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 0.5C12 7.12742 6.62742 12.5 0 12.5C6.62742 12.5 12 17.8726 12 24.5C12 17.8726 17.3726 12.5 24 12.5C17.3726 12.5 12 7.12742 12 0.5Z" fill="#51BEF9"/>
                            </svg>
                        </p>
                        <p>Сотрудник, готов взяться за ваш авто</p>
                    </div>
                </div>
                <OurWorks title={'В ателье уже побывали'}></OurWorks>
            </div>
        </Container>
    </div>
  )
}

export default page