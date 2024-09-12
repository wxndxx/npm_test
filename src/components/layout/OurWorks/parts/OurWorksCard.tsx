import React, { useEffect, useState } from 'react'
import { IList } from '../OurWorks'
import Slider, { Settings } from 'react-slick';
import s from './OurWorksCard.module.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from 'next/image';
import notFound from '../../../../../public/images/notFound.png'

type Props = {
    item: IList
}

interface ICustomPrevArrowProps {
    onClick?: () => void;
}   

function OurWorksCard({item}: Props) {
    let sliderRef = React.useRef<Slider | null>(null);

    const [sliderIndex, setSliderIndex] = useState<number>(0)

    useEffect(() => {
        if (sliderRef.current) {
            sliderRef.current.slickGoTo(sliderIndex);
        }
      }, [sliderIndex]);

      const CustomPrevArrow: React.FC<ICustomPrevArrowProps> = ({ onClick }) => (
        <div className={s.prev} onClick={onClick}>
            
        </div>
    );
    
    const CustomNextArrow: React.FC<ICustomPrevArrowProps> = ({ onClick }) => (
        <div className={s.next} onClick={onClick}>
            
        </div>
    );

    const [_currentSlide, setCurrentSlide] = useState<number>(1)

    const {name, images, service_name, description} = item;
    const [hover, setHover] = useState<any>()

    const settings1: Settings = {
        infinite: true,
        slidesToShow: 1,
        //focusOnSelect: true,
        // slidesToScroll: 1,
        className: s.slider,
        swipeToSlide: true,
        autoplay: false,
        //autoplaySpeed: 5000,
        // rtl: _currentSlide === images.length - 4 ? true : false,
        touchMove: false,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
        pauseOnHover: true,
        beforeChange: (_oldIndex, newIndex) => {
            setSliderIndex(newIndex);
            setCurrentSlide(newIndex);
            if(sliderRef.current){
                sliderRef.current.slickGoTo(newIndex);
            }
        },
    };

    return (
        <div className='rounded-[8px] bg-white p-[10px_10px_0px_10px] h-[390px] overflow-hidden relative cursor-pointer m-auto'>
            <div className={!hover ? 'w-full absolute top-0 left-0 duration-300 p-[10px_10px_0px_10px]' : 'p-[10px_10px_0px_10px] w-full absolute top-[-44%] left-0 duration-300'}>
                <div className='rounded-[8px] relative w-full h-[250px] overflow-hidden'>
                    <div className='text-i-p3 text-white absolute w-full top-0 left-0 z-20 flex justify-center pt-[10px] items-center'><p>Наведите, чтобы почитать</p></div>
                    <div className='w-full h-full rounded-[8px] overflow-hidden'>
                    {images && <Slider ref={sliderRef} {...settings1}>
                        {images.slice(0, 5).map((image:any, index:number) => {
                            return(
                            <div key={index} className='w-full h-[250px] relative'>
                                <Image fill className='w-full h-full absolute object-cover' src={image.image ?? notFound.src} alt="" />
                            </div>
                        )})}
                    </Slider>}
                    </div>
                    <div className='absolute bottom-[10px] w-full flex justify-center'><div className={s.dots}>
                    <div className='flex w-full gap-1 justify-center items-center'>
                    {images.slice(0, 5).map((_item:any, index) => (
                            <div key={index} onClick={() => setSliderIndex(index)}><div className={sliderIndex === index ? 'w-[8px] h-[8px] rounded-[50%] bg-white cursor-pointer' :'cursor-pointer w-[6px] h-[6px] rounded-[50%] bg-gray4 hover:bg-gray3'}></div></div>
                        ))}
                        
                    </div></div>
                </div>
                </div>
                <div className='min-h-[300px] flex flex-col gap-[5px] pb-[8px]' onMouseLeave={() => setHover(false)} onMouseEnter={() => setHover(true)}>
                    <div>
                        <div className='w-full justify-center items-center flex mt-[25px] mb-[10px]'>
                            <div className='p-[7px_15px] w-fit bg-gray1 rounded-[28px] flex items-center justify-center'>
                                {service_name}
                            </div>
                        </div>
                        <div className='flex justify-center items-center w-full text-u-h4 text-center font-bold mb-[30px]'>
                            {name}
                        </div>
                    </div>
                    <div className='border-t flex items-center w-full justify-center border-t-gray2 pt-[25px] text-center text-i-p3'>
                        <p className='w-[80%]'>{description.length > 200 ? description.slice(0, 200) + '...' : description}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OurWorksCard