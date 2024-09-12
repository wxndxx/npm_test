'use client'

import Container from '@/components/UI/Container/Container'
import Icon from '@/components/UI/Icon/Icon'
import { onlineService } from '@/services/online.service'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import s from './Appointment.module.scss'
import useFormatDate from '@/hook/useFormatDate'
import Slider, { Settings } from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Modal from '@/components/UI/Modal/Modal'
import OrderCard from '@/components/UI/OrderCard/OrderCard'
import { CLOUD } from '@/api/api'
import Image from 'next/image'
import notFound from '../../../../../../public/images/notFound.png'

type Props = {
    id: any,
}

// interface IAppointment {
//   id:number,
//   car: ICar,
//   start_time: string,
//   status: string
// }

interface ICustomPrevArrowProps {
  onClick?: () => void;
  current?: any;
  max?: number
}

function Appointment({id}: Props) {

  const {push} = useRouter()

  const [appointmentData, setAppointmentData] = useState<any>()

  function getAppointment(id:string) {
    onlineService.getAppointmentUser(id)
    .then((res:any) => {
      setAppointmentData({
        ...res,
        after_work_photos:res.after_work_photos
      })
    })
    .catch((err:any) => {
      console.log(err)
    })
  }

  useEffect(() => {
    getAppointment(id);
  },[]);

  function SampleNextArrow() {
    return (
      <></>
    );
  }
  
  function SamplePrevArrow() {
    return (
      <></>
    );
  }


  const CustomPrevArrow: React.FC<ICustomPrevArrowProps> = ({ onClick, current }) => (
    <div className={s.prev}>
        <button disabled={current === 0} className='btn__s p-[8px_18px] xxs:p-[14px_24px]' onClick={onClick}>
            <Icon type='vector_back'></Icon>
        </button>
    </div>
);

const CustomNextArrow: React.FC<ICustomPrevArrowProps> = ({ onClick, current, max }) => (
    <div className={s.next}>
        <button disabled={current === max} className='btn__s p-[8px_18px] xxs:p-[14px_24px]' onClick={onClick}>
            <Icon type='vector_forvard'></Icon>
        </button>
    </div>
);

const sliderRef2 = React.useRef<Slider | null>(null);
const sliderRef3 = React.useRef<Slider | null>(null);
const sliderRef4 = React.useRef<Slider | null>(null);

  const goToSlide = (index:any, type:string) => {
    //
    const sliderType = (type:string, index:any) => {
      switch(type) {
        case 'after_work_photos':
          if(sliderRef2.current) {
            sliderRef2.current.slickGoTo(index);
          }
          break
        case 'before_work_photos':
          if(sliderRef3.current) {
            sliderRef3.current.slickGoTo(index);
          }
          break
        case 'during_work_photos':
          if(sliderRef4.current) {
            sliderRef4.current.slickGoTo(index);
          }
          break
        default: 
          return
      }
    }
    // console.log()
    sliderType(type, index)
  };

  const settings1: Settings = {
    infinite: true,
    slidesToShow: appointmentData?.after_work_photos.length > 5 ? 5 :appointmentData?.after_work_photos.length,
    //focusOnSelect: true,
    // slidesToScroll: 1,
    className: s.slider,
    swipeToSlide: true,
    autoplay: false,
    touchMove: appointmentData?.after_work_photos && appointmentData?.after_work_photos.length < 3 ? false : true,
    prevArrow: <SamplePrevArrow />,
    nextArrow: <SampleNextArrow />,
    pauseOnHover: true,
};
  const settings3: Settings = {
    infinite: true,
    slidesToShow: appointmentData?.before_work_photos.length > 5 ? 5 :appointmentData?.before_work_photos.length,
    //focusOnSelect: true,
    // slidesToScroll: 1,
    className: s.slider,
    swipeToSlide: true,
    autoplay: false,
    touchMove: appointmentData?.before_work_photos && appointmentData?.before_work_photos.length < 3 ? false : true,
    prevArrow: <SamplePrevArrow />,
    nextArrow: <SampleNextArrow />,
    pauseOnHover: true,
  };
  const settings4: Settings = {
    infinite: true,
    slidesToShow: appointmentData?.during_work_photos.length > 5 ? 5 :appointmentData?.during_work_photos.length,
    //focusOnSelect: true,
    // slidesToScroll: 1,
    className: s.slider,
    swipeToSlide: true,
    autoplay: false,
    touchMove: appointmentData?.during_work_photos && appointmentData?.during_work_photos.length < 3 ? false : true,
    prevArrow: <SamplePrevArrow />,
    nextArrow: <SampleNextArrow />,
    pauseOnHover: true,
  };

const [modal, setModal] = useState<boolean>(false);
const [currentSlide, setCurrentSlide] = useState<number>(1)

const settings2: Settings = {
  infinite: false,
  slidesToShow: 1,
  //focusOnSelect: true,
  // slidesToScroll: 1,
  className: s.slider,
  swipeToSlide: true,
  autoplay: false,
  touchMove: appointmentData?.after_work_photos && appointmentData?.after_work_photos.length < 3 ? false : true,
  prevArrow: appointmentData?.after_work_photos.length > 1 ? <CustomPrevArrow current={currentSlide}/> : <></>,
  nextArrow: appointmentData?.after_work_photos.length > 1 ? <CustomNextArrow current={currentSlide} max={appointmentData?.after_work_photos?.length - 1}/> : <></>,
  pauseOnHover: true,
  beforeChange: (_oldIndex, newIndex) => {
    setCurrentSlide(newIndex);
  },
};
const settings5:Settings = {
  ...settings2,
  touchMove: appointmentData?.before_work_photos && appointmentData?.before_work_photos.length < 3 ? false : true,
  prevArrow: appointmentData?.before_work_photos.length > 1 ? <CustomPrevArrow current={currentSlide}/> : <></>,
  nextArrow: appointmentData?.before_work_photos.length > 1 ? <CustomNextArrow current={currentSlide} max={appointmentData?.before_work_photos?.length - 1}/> : <></>,
}
const settings6:Settings = {
  ...settings2,
  touchMove: appointmentData?.during_work_photos && appointmentData?.during_work_photos.length < 3 ? false : true,
  prevArrow: appointmentData?.during_work_photos.length > 1 ? <CustomPrevArrow current={currentSlide}/> : <></>,
  nextArrow: appointmentData?.during_work_photos.length > 1 ? <CustomNextArrow current={currentSlide} max={appointmentData?.during_work_photos?.length - 1}/> : <></>,
}

function widthSwitch(length:number){

  switch(length) {
      case 1:
        return 'w-[110px]'
      case 2:
          return 'w-[220px]'
      case 3:
          return 'w-[330px]'
      case 4:
          return 'w-[440px]'
      case 5:
          return `w-[560px]`
      default:
          return 
  }
}

const [modalType, setModalType] = useState<string>()

const sliderComponent = (arr:any, type:string) => {
  const sliderType = (type:string) => {
    switch(type) {
      case 'after_work_photos':
        return settings1
      case 'before_work_photos':
        return settings3
      case 'during_work_photos':
        return settings4
      default: 
        return
    }
  }
  return (
    <div>
      {arr.length != 0 ? 
        <div style={arr.length < 5 ? {width: `${arr.length * 115}px`} : {width:'580px'}} className={widthSwitch(arr.length)}>
          {arr.length > 1 ? <Slider {...sliderType(type)}>
            {arr.map((image:any, index:number) => {
              
              return (
                  <div key={index}>
                    <div onClick={() => {
                      goToSlide(index, type)
                      console.log(image, index)
                      setModal(true)
                      setModalType(type)
                      //setModalArr(rotateArray(arr, index))
                    }} className={'h-[70px] w-[100px] rounded-[8px] overflow-hidden relative' + ' ' + s.slider_card}>
                      <div className={'hidden text-i-p4 text-center items-center justify-center text-white absolute w-full h-full z-20' + ' ' + s.card_hidden}>
                        Нажмите, чтобы посмотреть
                      </div>
                      <Image width={500} height={500} className='object-cover absolute top-0 left-0 w-full h-full' src={CLOUD + image.photo ?? notFound.src} alt="img" />
                    </div>
                  </div>  
                )}
            )}
            </Slider> :
            <div>
              <div onClick={() => {
                //goToSlide(0)
                console.log(arr)
                goToSlide(0, type)
                setModalType(type)
                setModal(true)
              }} className={'h-[70px] w-[100px] rounded-[8px] overflow-hidden relative' + ' ' + s.slider_card}>
                <div className={'hidden text-i-p4 text-center items-center justify-center text-white absolute w-full h-full z-20' + ' ' + s.card_hidden}>
                    Нажмите, чтобы посмотреть
                  </div>
                  <Image width={500} height={500} className='object-cover absolute top-0 left-0 w-full h-full' src={CLOUD + arr[0]?.photo ?? notFound.src} alt="img" />
              </div>
            </div>
            }
          </div> : <p className='text-i-p2 text-gray5'>Наши мастера скоро добавят фотографии вашего автомобиля.</p>}
    </div>
  )
}

// const sliderType = () => {
  
//   switch(modalType) {
//     case 'after_work_photos':
//       return (
//         <Slider ref={sliderRef2} {...settings2} className={s.slider}>
//           {appointmentData?.after_work_photos?.map((image:any, index:number) => (
//             <div key={index} className={' h-[770px] w-[1100px] overflow-hidden relative'}>
//               <Image width={500} height={500} className='object-cover absolute top-0 left-0 w-full h-full' src={API_BASE_URL_2 + image.photo} alt="img" />
//             </div> 
//           ))}
//         </Slider>
//       )
//     case 'before_work_photos':
//       return (
//         <Slider ref={sliderRef3} {...settings5} className={s.slider}>
//           {appointmentData?.before_work_photos?.map((image:any, index:number) => (
//             <div key={index} className={' h-[770px] w-[1100px] overflow-hidden relative'}>
//               <Image width={500} height={500} className='object-cover absolute top-0 left-0 w-full h-full' src={API_BASE_URL_2 + image.photo} alt="img" />
//             </div> 
//           ))}
//         </Slider>
//       )
//       case 'during_work_photos':
//         return (
//           <Slider ref={sliderRef4} {...settings6} className={s.slider}>
//             {appointmentData?.during_work_photos?.map((image:any, index:number) => (
//               <div key={index} className={' h-[770px] w-[1100px] overflow-hidden relative'}>
//                 <Image width={500} height={500} className='object-cover absolute top-0 left-0 w-full h-full' src={API_BASE_URL_2 + image.photo} alt="img" />
//               </div> 
//             ))}
//           </Slider>
//         )
//       default:
//         return
//   }

// }

useEffect(() => {
  document.body.classList.remove("modal-open")
},[])
  
  return (
    <div className='p-[40px_0px_118px_0px] l:px-0 px-[10px]'>
     <Modal type='slider' onClose={() => {
        document.body.classList.remove("modal-open")
        setModal(false);
        }} isOpen={modal}>
        <div style={{display: modalType === 'after_work_photos' ? 'block' : 'none'}}><Slider ref={sliderRef2} {...settings2} className={s.slider}>
          {appointmentData?.after_work_photos?.map((image:any, index:number) => (
            <div key={index} className={s.cardBig}>
              <Image width={500} height={500} className='object-cover absolute top-0 left-0 w-full h-full' src={CLOUD + image.photo ?? notFound.src} alt="img" />
            </div> 
          ))}
        </Slider></div>
        <div style={{display: modalType === 'before_work_photos' ? 'block' : 'none'}}><Slider ref={sliderRef3} {...settings5} className={s.slider}>
          {appointmentData?.before_work_photos?.map((image:any, index:number) => (
            <div key={index} className={s.cardBig}>
              <Image width={500} height={500} className='object-cover absolute top-0 left-0 w-full h-full' src={CLOUD + image.photo ?? notFound.src} alt="img" />
            </div> 
          ))}
        </Slider></div>
        <div style={{display: modalType === 'during_work_photos' ? 'block' : 'none'}}><Slider ref={sliderRef4} {...settings6} className={s.slider}>
            {appointmentData?.during_work_photos?.map((image:any, index:number) => (
              <div key={index} className={s.cardBig}>
                <Image width={500} height={500} className='object-cover absolute top-0 left-0 w-full h-full' src={CLOUD + image.photo ?? notFound.src} alt="img" />
              </div> 
            ))}
          </Slider></div>
      </Modal>
      <Container>
        <div className='w-full card flex flex-col items-start m:p-[50px_116px] xs:p-[30px_90px] p-[20px]'>
          <div className='w-full m:w-[54%] xs:w-[60%]'>
              <div onClick={() => {
                  push('/profile/appointments')
              }} className={'xs:mb-[30px] mb-4 flex items-center gap-[20px] h-[32px] pl-[6px] cursor-pointer text-i-p3 max-w-[80px]' + ' ' + s.back}>
                  <Icon type='vector_back' /><p className='font-medium'>Назад</p>
              </div>
              <div>
                <h2 className='mb-[10px] text-u-h2 font-bold uppercase'>запись {appointmentData && useFormatDate(appointmentData.start_time)}</h2>
                <div className='flex items-center gap-[10px] mb-[30px]'>
                  <div className={`rounded-[28px] text-nowrap p-[9px_15px] text-white text-i-p3 font-medium flex justify-center items-center w-fit ${appointmentData && appointmentData.status === 'FREEZE' ? 'bg-green2' : 'bg-prim3'}`}>
                    {appointmentData?.status === 'FREEZE' ? 'Завершено' : 'В работе'}
                  </div>
                  <div className='border border-prim3 rounded-[28px] text-nowrap p-[9px_15px] text-white text-i-p3 font-medium flex justify-center items-center w-min'>
                    <span className='text-prim3 text-i-p3'>{appointmentData?.payModelStatus ? 'Оплачено' : 'Не оплачено'} ({appointmentData?.payModel === 'OFFLINE' ? 'Наличными' : 'По карте'})</span>
                  </div>
                </div>
              </div>
              <div className='flex flex-col gap-[15px] xs:gap-[20px] w-full xs:w-[90%]'>
                <div className={s.appointmentCard}>
                  <h3 className='text-u-h3 font-bold'>Машина будет готова</h3>
                  <h3 className='text-u-h3 font-bold text-gray5'>{appointmentData && useFormatDate(appointmentData?.end_time)}</h3>
                </div>
                <div className={s.appointmentCard}>
                  <h3 className='text-u-h3 font-bold'>Услуги</h3>
                  <div className='flex flex-col gap-[15px]'>
                    {appointmentData?.service.map((order:any, index:number) => {
                      return(
                      <OrderCard key={index} total_amount={order?.total_amount} service={order?.service}/>
                    )})}
                  </div>
                </div>
                <div className={s.appointmentCard}>
                  <h3 className='text-u-h3 font-bold'>Оплата: {appointmentData?.service.reduce((acc:any, curr:any) => acc + curr?.total_amount, 0)} ₽</h3>
                  <h3 className='text-u-h4 font-bold text-gray5'>{appointmentData?.payModel === 'OFFLINE' ? 'Наличными' : 'По карте'}</h3>
                </div>
                <div className={s.appointmentCard}>
                  <h3 className='text-u-h3 font-bold'>Фото ДО работ</h3>
                  {appointmentData && sliderComponent(appointmentData.before_work_photos, 'before_work_photos')}
                </div>
                <div className={s.appointmentCard}>
                  <h3 className='text-u-h3 font-bold'>Фото ПРОЦЕСС работ</h3>
                  {appointmentData && sliderComponent(appointmentData.during_work_photos, 'during_work_photos')}
                </div>
                <div className={s.appointmentCard}>
                  <h3 className='text-u-h3 font-bold'>Фото ПОСЛЕ работ</h3>
                  {appointmentData && sliderComponent(appointmentData.after_work_photos, 'after_work_photos')}
                </div>
              </div>
            </div>
        </div>
      </Container>
    </div>
  )
}

export default Appointment