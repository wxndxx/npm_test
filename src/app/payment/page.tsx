'use client'

import Container from '@/components/UI/Container/Container'
import Icon from '@/components/UI/Icon/Icon'
import { basketService } from '@/services/busket.service'
import { IBasket } from '@/shared/types/Basket'
import { onChangeBasket, onChangeSum } from '@/store/Slices/BasketSlice'
import { useTypedDispatch } from '@/store/store'
import React, { useEffect, useState } from 'react'
import s from './style.module.scss'
import { useRouter } from 'next/navigation'
import OrderCard from '@/components/UI/OrderCard/OrderCard'
import { authService } from '@/services/auth.service'
import { IUser } from '@/shared/types/Profile'
import Modal from '@/components/UI/Modal/Modal'
import SearchSelect from '@/components/UI/SearchSelect/SearchSelect'
import Input from '@/components/UI/Input/Input'
import type { Dayjs } from 'dayjs';
import { DatePicker, TimePicker, ConfigProvider } from 'antd';
import type { DatePickerProps } from 'antd';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs';
import { appointmentService } from '@/services/appointment.service'
import ruRU from 'antd/es/locale/ru_RU';

type Props = {}

interface IUserError {
  first_name: [boolean, string],
  gosNum: [boolean, string],
  vinNum: [boolean, string],
  email: [boolean, string]
}

dayjs.extend(customParseFormat);

const Payment:React.FC = ({}: Props) => {

  const onChangeDate: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };
  const [errors, setErrors] = useState({
    appointments: [false, '']
  })
  const dispatch = useTypedDispatch()

  const [sum, setSum] = useState<number>()

  const [basketData, setBasketData] = useState<IBasket>()
  // const [appointmentsData, setAppointmentsData] = useState<any>()
  // const [productsData, setProductsData] = useState<any>()
  // const [selectedSum, setSelectedSum] = useState<any>()
  const [profile, setProfile] = useState<IUser>()
  let appointments:any = null
  let products:any =  null
  useEffect(() => {
    authService.getProfile()
    .then((res:any) => {
      setCarId(res.cars[0].id)
      setProfile(res)
      setFirstName(res.first_name)
      setEmail(res.email)
      //setCar(res.cars)
    })
    .catch((err:any) => {
      console.log(err);
    })
    basketService.getBusket()
    .then((res:any) => {
      setSum(res.appointments_sum + res.products_sum)
      dispatch(onChangeBasket(res))
      dispatch(onChangeSum(res.appointments_sum + res.products_sum))
      appointments = res.appointments.filter((item:any) => item.order_true)
      products =  res.products.filter((item:any) => item.order_true)
      setBasketData({appointments: appointments, products: products, appointments_sum:res.appointments_sum, products_sum:res.products_sum})
      // setAppointmentsData(JSON.parse(JSON.stringify([...res.appointments])))
      // setProductsData(JSON.parse(JSON.stringify([...res.products])))
      
      let sum = 0
    
      res.products.length > 0 && res?.products.map((item:any) => {
        if(item.order_true) {
          sum += item.quantity;
        }
      })
      res.appointments.length > 0 && res?.appointments.map((item:any) => {
        if(item.order_true) {
          sum += item.quantity;
        }
      })
      // setSelectedSum(sum)
    })
    .catch((err:any) => {
      console.log(err)
    })
  }, [])

  function insertSpaces(number:string) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }
  
  const {push} = useRouter()

  const [userErr, setUserErr] = useState<IUserError>({
    first_name: [false, ''],
    gosNum: [true, ''],
    vinNum: [true, ''],
    email: [false, '']
})

  const [searchTerm, setSearchTerm] = useState('');
  const [modal, setModal] = useState<boolean>(false)
  const [brands, setBrands] = useState<any>([])
  const [select, setSelect] = useState<any>()
  const [models, setModels] = useState<any>([])
  const [searchModel, setSearchModel] = useState('');
  const [modelsId, setModelsId] = useState<any>()
  const [selectModel, setSelectModel] = useState<any>()
  const [filteredBrands, setFilteredBrands] = useState<any>(brands);
  const [filteredModels, setFilteredModels] = useState<any>(models);
  const [firstName, setFirstName] = useState<any>()
  const [email, setEmail] = useState<any>()

  const handleSearch = (event:any) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);

    // Фильтрация массива брендов по введенному термину
    const filtered= brands.filter((brand:any) => brand.name.toLowerCase().startsWith(searchTerm.toLowerCase()));
    setFilteredBrands(filtered);
    if(brands.some((brand:any) => brand.name.toLowerCase() === searchTerm.toLowerCase())) {
        //setSearchTerm(searchTerm)
        setSelect(event.target.value)
    } else {
        setSelect(null)
    }
    if(select) {
        const brand = brands.find((brand:any) => brand.name.toLowerCase() === select.toLowerCase())?.name;
        authService.getModels(brand)
        .then((res) => {
            setModels(res)
        })
    }
    if(searchTerm.length === 0) {
        setSearchModel('')
        setSelectModel('')
    }
  };

  const setSelectedModel = (val:any) => {
    setSearchModel(val);
    setSelectModel(val)
    const model = models.find((brand:any) => brand.name.toLowerCase() === val.toLowerCase())?.id;
    setModelsId(model)
    // const brand = brands.find((brand:any) => brand.name.toLowerCase() === val.toLowerCase())?.name;
    // authService.getModels(brand)
    // .then((res) => {
    //     setModels(res)
    // })
    // brand && authService.getModels(brand)
    // .then((res) => setModels(res))
    //console.log(select)
  }
  const [vinNum, setVinValue] = useState('');

  const setSelected = (val:any) => {
    setSearchTerm(val);
    setSelect(val)
    const brand = brands.find((brand:any) => brand.name.toLowerCase() === val.toLowerCase())?.name;
    authService.getModels(brand)
    .then((res) => {
        setModels(res)
    })
  }

  const handleVinChange = (event: any) => {
    const inputValue = event.target.value;
  
    // Если введенное значение не соответствует, очистить поле ввода

    setVinValue(inputValue.replace(/[^a-zA-Z0-9]/g, "").toUpperCase());

    const regex = /^[A-Z]{8}[0-9][A-Z]{2}[0-9]{6}$/;
    if (!regex.test(inputValue)) {
    // Удалить последний введенный символ, если он не соответствует формату
        userErr.vinNum = [true, 'Введите номер формата XXXXXXXXYXXYYYYYY (X - буква, Y-цифра)']
        setUserErr(JSON.parse(JSON.stringify(userErr)))
    } else {
        userErr.vinNum = [false, '']
        setUserErr(JSON.parse(JSON.stringify(userErr)))
    }
  };

  const [gosNum, setGosValue] = useState('');

  const handleGosChange = (event: any) => {
    const input = event.target.value;
    setGosValue(input.toUpperCase());
    // if(event.target.value.length < 10) {
    //     setGosValue(input.toUpperCase());
    // }
  
    const regex = /^[A-ZА-Я][0-9]{3}[A-ZА-Я]{2}[0-9]{2,3}$/;
    if (!regex.test(input)) {
    // Удалить последний введенный символ, если он не соответствует формату
        userErr.gosNum = [true, 'Введите номер формата B876KU777']
        setUserErr(JSON.parse(JSON.stringify(userErr)))
    } else {
        userErr.gosNum = [false, '']
        setUserErr(JSON.parse(JSON.stringify(userErr)))
    }
  
  };

  const handleSearchModel = (event:any) => {
    const searchModel = event.target.value;
    setSearchModel(searchModel);

    // Фильтрация массива брендов по введенному термину
    const filtered= models.filter((brand:any) => brand.name.toLowerCase().startsWith(searchModel.toLowerCase()));
    setFilteredModels(filtered);
    if(models.some((brand:any) => brand.name.toLowerCase() === searchModel.toLowerCase())) {
        //setSearchTerm(searchTerm)
        setSelectModel(event.target.value)
    } else {
        setSelectModel(null)
    }
    if(selectModel) {
        const model = models.find((brand:any) => brand.name.toLowerCase() === selectModel.toLowerCase());
        setModelsId(model)
    }
  };

  const [carId, setCarId] = useState<number>()

  function setCarData() {
    authService.createCar(select, modelsId, gosNum, vinNum)
    .then((res:any) => {
        setModels(res)
        authService.getProfile()
        .then((res) => {
            if(res.cars.length > 0) {
              
                setSelect(res.cars[0].model.brand.name)
                setSearchTerm(res.cars[0].model.brand.name)
                setSearchModel(res.cars[0].model.name)
                setSelectModel(res.cars[0].model.name)
                setModelsId(res.cars[0].model.id)
                setGosValue(res.cars[0].license_plate)
                setVinValue(res.cars[0].vin)
                //setCar(res.cars)
                setModal(false)
                // setFirstName(res.first_name)
                // setEmail(res.email)
            }
        })
            .catch((err:any) => {
                console.log(err)
        })
    })
  }

  async function getBrandsfun() {
    authService.getBrands()
    .then((res:any) => {
        setBrands(res)
    })
}

  //date picker 
  const [_time_value, setTimeValue] = useState<Dayjs | null>(null);

  const onChangeTime = (time: Dayjs, timeString:any) => {
    console.log(time);
    setTimeValue(timeString);
  };

  // const [rulesText, setRulesText] = useState<boolean>(false)
  // const [paymentType, setPaymentType] = useState<boolean>(false)
  // const [paymentRules, setPaymentRules] = useState<boolean>(false)
  // const [confRules, setConfRules] = useState<boolean>(false)

  return (
    <div>
      {modal && 
        <Modal isOpen={modal} onClose={() => {
          setSelectedModel('')
          setSearchTerm('')
          setGosValue('')
          setSelect(false)
          setVinValue('')
          setUserErr((prev:any) => ({
            ...prev,
            gosNum: [true, ''],
            vinNum: [true, ''],
          }))
          setModal(false)
          }}>
          <div className='flex flex-col gap-5'>
            <h3 className='text-u-h3'>Данные о вашем авто</h3>
            <div className={s.label}>
                <p className='text-gray4'>Марка</p>
                <SearchSelect unfilter={brands} setVal={(val) => setSelected(val)} value={searchTerm} onChange={(e) => handleSearch(e)} list={filteredBrands} title='Введите марку'/>
            </div>
            <div className={s.label}>
                <p className='text-gray4'>Модель</p>
                <SearchSelect disabled={!select} unfilter={models} setVal={(val) => setSelectedModel(val)} value={searchModel} onChange={(e) => handleSearchModel(e)} list={filteredModels} title='Введите модель'/>
            </div>
            <div className={s.label}>
                <p className='text-gray4'>ГОС номер</p>
                <Input placeholder='Введите ГОС номер' type='default' value={gosNum} onChange={(e) => {handleGosChange(e)
                }}></Input>
                {userErr.gosNum[0] && <p className='text-red2'>{userErr.gosNum[1]}</p>}
            </div>
            <div className={s.label}>
                <p className='text-gray4'>VIN номер</p>
                <Input placeholder='Введите VIN номер' type='default' value={vinNum} onChange={(e) => handleVinChange(e)}></Input>
                {userErr.vinNum[0] && <p className='text-red2'>{userErr.vinNum[1]}</p>}
            </div>
            <button disabled={userErr.gosNum[0] || userErr.vinNum[0] || modelsId === 0 || !select
                // || profile?.cars[0].vin === vinNum || profile?.cars[0].license_plate === gosNum
            } onClick={() => {
                setCarData()
            }} className='btn__p flex justify-center'>Применить изменения</button>
            </div>
        </Modal>
      }
      <Container>
      <div className='w-[95%] xxs:w-[90%] m:w-[83%] relative min-h-[700px] xxs:pb-[40px] xs:pb-[60px] m:pb-[85px]'>
        <div className='pt-[30px] xs:pt-[40px] pb-[15px]'><h1 className='text-u-h1 uppercase font-bold'>Оформление заказа</h1></div>
          <div className='grid grid-cols-5 gap-[30px]'>
            <div className='col-span-5 m:col-span-3'>
              <div onClick={() => {
                  push('/basket')
              }} className={'mb-[20px] flex items-center gap-[20px] h-[32px] pl-[6px] cursor-pointer text-i-p3 max-w-[80px]' + ' ' + s.back}>
                  <Icon type='vector_back' /><p className='font-medium'>Назад</p>
              </div>
              <div className='flex flex-col gap-[38px]'>
                <div className='bg-white rounded-[8px] p-[30px] flex flex-col gap-[15px]'>
                  <h3 className='text-u-h3 font-bold'>Выбранные услуги и товары</h3>
                  {basketData?.appointments.map((item:any, index:any) => (
                    <OrderCard key={index} total_amount={item.service.total_amount} service={item.service}/>
                  ))}
                  {basketData?.products.map((item:any, index:any) => (
                    <OrderCard key={index} total_amount={item.sklad.sum} service={item.sklad}/>
                  ))}
                </div>
                <div className='bg-white rounded-[8px] p-[30px] flex flex-col gap-[20px]'>
                  <h3 className='text-u-h3 font-bold'>Заполните данные</h3>
                  <div className='border border-gray2 rounded-[8px] p-[15px] flex justify-between items-center'>
                    <div>
                      <h4 className='text-u-h4 font-bold'>Данные авто</h4>
                      {profile && `${profile.cars[0].model.brand.name} ${profile.cars[0].model.name} ${profile.cars[0].license_plate} (${profile.cars[0].vin})`}
                    </div>
                    <div className='cursor-pointer' onClick={() => {
                      getBrandsfun()
                      setModal(true)
                    }}><Icon color='rgba(81, 190, 249, 1)' type='pen2'></Icon>
                    </div>
                  </div>
                  <Input placeholder='Введите имя' value={firstName ?? ''} onChange={(e) => setFirstName(e.target.value)}></Input>
                  <Input placeholder='Введите почту' value={email ?? ''} onChange={(e) => setEmail(e.target.value)}></Input>
                  <ConfigProvider locale={ruRU}>
                  <DatePicker placeholder='Выберите предпочитаемую дату установки' className='text-i-p2 w-full p-[1rem] rounded-[8px]' onChange={onChangeDate} />
                  </ConfigProvider>
                  <TimePicker format='HH:mm' placeholder='Выберите предпочитаемое время установки' className='text-i-p2 w-full p-[1rem] rounded-[8px]' onChange={onChangeTime} defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')} />
                </div>
                {/* <div className='bg-white rounded-[8px] p-[30px] flex flex-col gap-[15px]'>
                  <h3 className='text-u-h3 font-bold'>Способ оплаты</h3>
                  <div className='flex items-center gap-[15px]'>
                    <p className={!paymentType ? 'text-u-h4 underline text-prim3 cursor-pointer' : 'text-u-h4 cursor-pointer'}>Наличными</p>
                    <Toggle type='toggle' onClick={() => setPaymentType(!paymentType)} isChecked={paymentType}></Toggle>
                    <p className={paymentType ? 'text-u-h4 underline text-prim3 cursor-pointer' : 'text-u-h4 cursor-pointer'}>Онлайн, по карте</p>
                  </div>
                  <div className='flex flex-col items-end'>
                    {!paymentType ? <div className="flex justify-start items-center gap-[20px] w-[68%]">
                      <svg width="40" height="32" viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_808_19137)">
                      <path d="M40 25.4413C40 28.9818 37.2127 31.8649 33.7897 31.8649H0V6.4236C0 2.88307 2.78734 0 6.21031 0H40V25.4413Z" fill="white"/>
                      <path d="M28.998 18.9166H31.5652C31.6387 18.9166 31.8098 18.8914 31.8832 18.8914C32.3723 18.7902 32.7879 18.3349 32.7879 17.7027C32.7879 17.0958 32.3723 16.6405 31.8832 16.5141C31.8098 16.4888 31.6632 16.4888 31.5654 16.4888H28.9982V18.9166H28.998Z" fill="#9A9AA5"/>
                      <path d="M31.2712 2.14941C28.8262 2.14941 26.8212 4.19806 26.8212 6.75224V11.532H33.105C33.2517 11.532 33.4228 11.532 33.545 11.5573C34.9631 11.6332 36.0145 12.3918 36.0145 13.7067C36.0145 14.7437 35.3055 15.6288 33.9852 15.806V15.8564C35.4277 15.9576 36.528 16.7922 36.528 18.0819C36.528 19.4729 35.3055 20.3833 33.6917 20.3833H26.7969V29.7405H33.325C35.77 29.7405 37.775 27.692 37.775 25.1377V2.14941H31.2712Z" fill="#9A9AA5"/>
                      <path d="M32.4699 14.0104C32.4699 13.4033 32.0543 12.9986 31.5652 12.9227C31.5165 12.9227 31.3941 12.8975 31.3209 12.8975H28.998V15.1229H31.3209C31.3943 15.1229 31.5409 15.1229 31.5654 15.0977C32.0545 15.0217 32.4701 14.6172 32.4701 14.0102L32.4699 14.0104Z" fill="#9A9AA5"/>
                      <path d="M6.67555 2.14941C4.23055 2.14941 2.22555 4.19806 2.22555 6.75224V18.1074C3.47258 18.7395 4.76836 19.1442 6.0643 19.1442C7.60461 19.1442 8.43586 18.1832 8.43586 16.8681V11.5067H12.2501V16.8427C12.2501 18.9164 11.0032 20.611 6.77336 20.611C4.20617 20.611 2.20117 20.0292 2.20117 20.0292V29.7152H8.7293C11.1743 29.7152 13.1793 27.6667 13.1793 25.1123V2.14974H6.67539L6.67555 2.14941Z" fill="#9A9AA5"/>
                      <path d="M18.9734 2.14941C16.5284 2.14941 14.5234 4.19806 14.5234 6.75224V12.7712C15.6483 11.7848 17.6042 11.1526 20.7583 11.3043C22.4453 11.3803 24.2545 11.8608 24.2545 11.8608V13.8081C23.3498 13.3276 22.2742 12.8975 20.8805 12.7964C18.4844 12.6194 17.0419 13.8333 17.0419 15.9576C17.0419 18.1072 18.4844 19.3211 20.8805 19.1188C22.2742 19.0176 23.35 18.5625 24.2545 18.1072V20.0545C24.2545 20.0545 22.4697 20.535 20.7583 20.611C17.6042 20.7626 15.6483 20.1303 14.5236 19.1442V29.7657H21.0517C23.4967 29.7657 25.5016 27.7172 25.5016 25.1629V2.14974H18.9734V2.14941Z" fill="#9A9AA5"/>
                      </g>
                      <defs>
                      <clipPath id="clip0_808_19137">
                      <rect width="40" height="32" fill="white"/>
                      </clipPath>
                      </defs>
                      </svg>
                      <svg width="40" height="32" viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_808_19144)">
                      <path d="M7.27156 31.8411V29.7231C7.27156 28.911 6.79125 28.3817 5.96797 28.3817C5.55641 28.3817 5.11047 28.5229 4.80172 28.9818C4.56172 28.5935 4.21875 28.3817 3.70422 28.3817C3.36109 28.3817 3.01828 28.4875 2.74375 28.8758V28.4523H2.02344V31.8411H2.74375V29.9701C2.74375 29.3701 3.0525 29.0876 3.53281 29.0876C4.01281 29.0876 4.25313 29.4054 4.25313 29.9701V31.8411H4.97344V29.9701C4.97344 29.3701 5.31625 29.0876 5.76219 29.0876C6.2425 29.0876 6.4825 29.4054 6.4825 29.9701V31.8411H7.27156ZM17.9389 28.4523H16.7728V27.4286H16.0525V28.4523H15.4008V29.1228H16.0523V30.6762C16.0523 31.4529 16.3611 31.9116 17.1844 31.9116C17.4931 31.9116 17.8359 31.8058 18.0763 31.6646L17.8703 31.0292C17.6645 31.1703 17.4245 31.2057 17.253 31.2057C16.91 31.2057 16.7728 30.9939 16.7728 30.6408V29.1228H17.9389V28.4523ZM24.0445 28.3815C23.633 28.3815 23.3586 28.5935 23.187 28.8758V28.4523H22.4667V31.8411H23.187V29.9349C23.187 29.3701 23.427 29.0524 23.873 29.0524C24.0102 29.0524 24.1817 29.0878 24.3189 29.123L24.5247 28.4171C24.3875 28.3817 24.1817 28.3817 24.0445 28.3817V28.3815ZM14.8177 28.7346C14.4745 28.4875 13.9944 28.3817 13.4798 28.3817C12.6567 28.3817 12.108 28.8052 12.108 29.4759C12.108 30.0408 12.5195 30.3584 13.2398 30.4644L13.5828 30.4998C13.9602 30.5702 14.1659 30.6762 14.1659 30.8528C14.1659 31.0997 13.8916 31.2763 13.4113 31.2763C12.9311 31.2763 12.5537 31.0997 12.3136 30.9233L11.9706 31.4881C12.348 31.7705 12.8625 31.9116 13.3769 31.9116C14.3373 31.9116 14.8863 31.4529 14.8863 30.8174C14.8863 30.2173 14.4403 29.8995 13.7542 29.7937L13.4113 29.7583C13.1025 29.7229 12.8625 29.6525 12.8625 29.4407C12.8625 29.1936 13.1025 29.0524 13.4798 29.0524C13.8916 29.0524 14.3031 29.2288 14.5089 29.3348L14.8177 28.7346ZM33.9575 28.3817C33.5458 28.3817 33.2714 28.5935 33.0998 28.8758V28.4523H32.3795V31.8411H33.0998V29.9349C33.0998 29.3701 33.34 29.0524 33.7858 29.0524C33.9231 29.0524 34.0947 29.0878 34.2319 29.123L34.4377 28.4171C34.3005 28.3817 34.0947 28.3817 33.9575 28.3817ZM24.7648 30.1467C24.7648 31.1703 25.4508 31.9116 26.5142 31.9116C26.9944 31.9116 27.3373 31.8058 27.6803 31.5235L27.3373 30.9233C27.063 31.1351 26.7886 31.2409 26.4798 31.2409C25.8967 31.2409 25.4852 30.8174 25.4852 30.1467C25.4852 29.5113 25.8967 29.0876 26.4798 29.0524C26.7886 29.0524 27.063 29.1582 27.3373 29.3701L27.6803 28.77C27.3373 28.4875 26.9944 28.3817 26.5142 28.3817C25.4508 28.3817 24.7648 29.123 24.7648 30.1467ZM31.4192 30.1467V28.4523H30.6989V28.8758C30.4588 28.5582 30.1158 28.3817 29.6698 28.3817C28.7438 28.3817 28.0234 29.123 28.0234 30.1467C28.0234 31.1703 28.7438 31.9116 29.6698 31.9116C30.15 31.9116 30.4931 31.7352 30.6989 31.4175V31.8411H31.4192V30.1467ZM28.778 30.1467C28.778 29.5465 29.1553 29.0524 29.7727 29.0524C30.3558 29.0524 30.7675 29.5113 30.7675 30.1467C30.7675 30.7468 30.3558 31.2409 29.7727 31.2409C29.1553 31.2056 28.778 30.7468 28.778 30.1467ZM20.1686 28.3817C19.2081 28.3817 18.522 29.0876 18.522 30.1467C18.522 31.2057 19.208 31.9116 20.2028 31.9116C20.683 31.9116 21.1633 31.7705 21.5406 31.4529L21.1975 30.9233C20.9231 31.1351 20.5802 31.2763 20.2372 31.2763C19.7913 31.2763 19.3453 31.0645 19.2423 30.4642H21.6778V30.182C21.7122 29.0876 21.0947 28.3817 20.1684 28.3817H20.1686ZM20.1686 29.017C20.6144 29.017 20.9233 29.2995 20.9917 29.8291H19.2767C19.3453 29.3701 19.6541 29.017 20.1686 29.017ZM38.0392 30.1467V27.1108H37.3189V28.8758C37.0788 28.5582 36.7358 28.3817 36.2898 28.3817C35.3638 28.3817 34.6434 29.123 34.6434 30.1467C34.6434 31.1703 35.3638 31.9116 36.2898 31.9116C36.7702 31.9116 37.1131 31.7352 37.3189 31.4175V31.8411H38.0392V30.1467ZM35.3981 30.1467C35.3981 29.5465 35.7753 29.0524 36.3928 29.0524C36.9759 29.0524 37.3875 29.5113 37.3875 30.1467C37.3875 30.7468 36.9759 31.2409 36.3928 31.2409C35.7753 31.2056 35.3981 30.7468 35.3981 30.1467ZM11.3189 30.1467V28.4523H10.5986V28.8758C10.3584 28.5582 10.0155 28.3817 9.56953 28.3817C8.64344 28.3817 7.92312 29.123 7.92312 30.1467C7.92312 31.1703 8.64344 31.9116 9.56953 31.9116C10.0498 31.9116 10.3928 31.7352 10.5986 31.4175V31.8411H11.3189V30.1467ZM8.64344 30.1467C8.64344 29.5465 9.02078 29.0524 9.63813 29.0524C10.2213 29.0524 10.633 29.5113 10.633 30.1467C10.633 30.7468 10.2213 31.2409 9.63813 31.2409C9.02078 31.2056 8.64344 30.7468 8.64344 30.1467Z" fill="#9A9AA5"/>
                      <path d="M14.5781 2.71826H25.3828V22.6983H14.5781V2.71826Z" fill="#696969"/>
                      <path d="M15.2639 12.7082C15.2639 8.64868 17.1161 5.04796 19.963 2.71807C17.8708 1.02368 15.2297 0 12.3484 0C5.52234 0 0 5.6833 0 12.7082C0 19.7329 5.52234 25.4164 12.3483 25.4164C15.2295 25.4164 17.8706 24.3927 19.963 22.6981C17.1161 20.4036 15.2639 16.7677 15.2639 12.7082Z" fill="#9A9AA5"/>
                      <path d="M39.961 12.7082C39.961 19.7329 34.4387 25.4164 27.6127 25.4164C24.7315 25.4164 22.0904 24.3927 19.998 22.6981C22.8793 20.3684 24.6973 16.7677 24.6973 12.7082C24.6973 8.64868 22.8449 5.04796 19.998 2.71807C22.0902 1.02368 24.7315 0 27.6127 0C34.4387 0 39.9612 5.71867 39.9612 12.7082H39.961Z" fill="#9A9AA5"/>
                      </g>
                      <defs>
                      <clipPath id="clip0_808_19144">
                      <rect width="40" height="32" fill="white"/>
                      </clipPath>
                      </defs>
                      </svg>
                      <svg width="84" height="24" viewBox="0 0 84 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_808_19149)">
                      <path d="M80.8272 14.9778C82.0707 14.2296 83.036 12.342 83.3632 11.4918L60.0488 11.4067V24.0756H67.5749V17.1035H75.5917C77.4732 17.1035 79.2729 15.9131 80.8272 14.9778Z" fill="#9A9AA5"/>
                      <path d="M41.004 0.145508H33.231L33.2051 24.0756H40.2436C41.5955 24.0756 42.891 22.7836 43.3697 22.1376L48.946 9.91976H49.4529V24.0756H57.2259L57.1414 0.145508H49.8754C48.3208 0.145508 47.1999 1.77455 46.8338 2.58907L41.4265 14.3013H40.8351L41.004 0.145508Z" fill="#9A9AA5"/>
                      <path d="M0 24.0756H7.72071L7.63679 10.0883H8.14031L12.3035 24.0756H17.959L22.1551 9.91976H22.6586L22.5056 24.0756H30.3793V0.145508H22.1551C19.7382 0.145508 18.5185 3.1789 18.2108 4.69559L15.2736 14.3013H14.9379C14.3784 12.4195 13.0413 7.8638 12.1685 4.69559C11.2957 1.52739 9.39912 0.342116 8.55991 0.145508H0V24.0756Z" fill="#9A9AA5"/>
                      <path d="M76.5535 0.145508H59.3438C59.3438 1.21298 59.7656 3.10158 61.6215 5.97553C63.1063 8.2747 67.1893 9.61587 69.0453 9.99907H84.0616V9.67062C84.0616 8.2747 84.3147 6.13976 82.2057 3.2658C80.5184 0.966638 77.7345 0.227621 76.5535 0.145508Z" fill="#9A9AA5"/>
                      </g>
                      <defs>
                      <clipPath id="clip0_808_19149">
                      <rect width="84" height="24" fill="white"/>
                      </clipPath>
                      </defs>
                      </svg>
                      <svg width="64" height="24" viewBox="0 0 64 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M46.52 3.46867C45.0305 2.93024 43.4578 2.65875 41.874 2.66667C36.76 2.66667 33.146 5.25067 33.124 8.94867C33.082 11.6667 35.686 13.1987 37.654 14.1147C39.676 15.0527 40.352 15.6367 40.342 16.4687C40.332 17.7507 38.726 18.3227 37.248 18.3227C35.194 18.3227 34.08 18.0427 32.362 17.3227L31.724 17.0207L30.996 21.2927C32.246 21.8027 34.486 22.2507 36.798 22.2927C42.246 22.2927 45.798 19.7307 45.838 15.7807C45.88 13.6147 44.486 11.9707 41.516 10.6147C39.724 9.74067 38.602 9.14467 38.602 8.24867C38.602 7.45667 39.56 6.62467 41.56 6.62467C42.8873 6.59142 44.2068 6.83599 45.434 7.34267L45.924 7.56067L46.642 3.44667L46.52 3.46867ZM59.814 3.02067H55.814C54.564 3.02067 53.636 3.35467 53.084 4.59467L45.396 22.0207H50.834L51.93 19.1667L58.564 19.1767C58.73 19.8427 59.198 22.0187 59.198 22.0187H64L59.814 3.02067ZM25.76 2.86467H30.938L27.698 21.8727H22.52L25.76 2.85467V2.86467ZM12.594 13.3327L13.124 15.9787L18.196 3.02067H23.686L15.518 21.9887H10.052L5.572 5.92667C5.53768 5.79325 5.47653 5.66822 5.39228 5.55922C5.30803 5.45021 5.20246 5.35952 5.082 5.29267C3.47277 4.45569 1.76566 3.82216 0 3.40667L0.062 3.00867H8.416C9.542 3.05067 10.458 3.40667 10.77 4.61467L12.594 13.3427V13.3327ZM53.406 15.2807L55.48 9.95867C55.448 10.0087 55.906 8.86467 56.166 8.14467L56.52 9.77867L57.72 15.2687H53.406V15.2807Z" fill="#9A9AA5"/>
                      </svg>
                    </div> : 
                    <div className="flex justify-start items-center gap-[20px] w-[68%]">
                    <svg width="40" height="32" viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_808_19206)">
                    <path d="M40 25.4413C40 28.9818 37.2127 31.8649 33.7897 31.8649H0V6.4236C0 2.88307 2.78734 0 6.21031 0H40V25.4413Z" fill="white"/>
                    <path d="M28.998 18.9166H31.5652C31.6387 18.9166 31.8098 18.8914 31.8832 18.8914C32.3723 18.7902 32.7879 18.3349 32.7879 17.7027C32.7879 17.0958 32.3723 16.6405 31.8832 16.5141C31.8098 16.4888 31.6632 16.4888 31.5654 16.4888H28.9982V18.9166H28.998Z" fill="#51BEF9"/>
                    <path d="M31.2712 2.14941C28.8262 2.14941 26.8212 4.19806 26.8212 6.75224V11.532H33.105C33.2517 11.532 33.4228 11.532 33.545 11.5573C34.9631 11.6332 36.0145 12.3918 36.0145 13.7067C36.0145 14.7437 35.3055 15.6288 33.9852 15.806V15.8564C35.4277 15.9576 36.528 16.7922 36.528 18.0819C36.528 19.4729 35.3055 20.3833 33.6917 20.3833H26.7969V29.7405H33.325C35.77 29.7405 37.775 27.692 37.775 25.1377V2.14941H31.2712Z" fill="#51BEF9"/>
                    <path d="M32.4699 14.0104C32.4699 13.4033 32.0543 12.9986 31.5652 12.9227C31.5165 12.9227 31.3941 12.8975 31.3209 12.8975H28.998V15.1229H31.3209C31.3943 15.1229 31.5409 15.1229 31.5654 15.0977C32.0545 15.0217 32.4701 14.6172 32.4701 14.0102L32.4699 14.0104Z" fill="#51BEF9"/>
                    <path d="M6.67555 2.14941C4.23055 2.14941 2.22555 4.19806 2.22555 6.75224V18.1074C3.47258 18.7395 4.76836 19.1442 6.0643 19.1442C7.60461 19.1442 8.43586 18.1832 8.43586 16.8681V11.5067H12.2501V16.8427C12.2501 18.9164 11.0032 20.611 6.77336 20.611C4.20617 20.611 2.20117 20.0292 2.20117 20.0292V29.7152H8.7293C11.1743 29.7152 13.1793 27.6667 13.1793 25.1123V2.14974H6.67539L6.67555 2.14941Z" fill="#51BEF9"/>
                    <path d="M18.9734 2.14941C16.5284 2.14941 14.5234 4.19806 14.5234 6.75224V12.7712C15.6483 11.7848 17.6042 11.1526 20.7583 11.3043C22.4453 11.3803 24.2545 11.8608 24.2545 11.8608V13.8081C23.3498 13.3276 22.2742 12.8975 20.8805 12.7964C18.4844 12.6194 17.0419 13.8333 17.0419 15.9576C17.0419 18.1072 18.4844 19.3211 20.8805 19.1188C22.2742 19.0176 23.35 18.5625 24.2545 18.1072V20.0545C24.2545 20.0545 22.4697 20.535 20.7583 20.611C17.6042 20.7626 15.6483 20.1303 14.5236 19.1442V29.7657H21.0517C23.4967 29.7657 25.5016 27.7172 25.5016 25.1629V2.14974H18.9734V2.14941Z" fill="#51BEF9"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_808_19206">
                    <rect width="40" height="32" fill="white"/>
                    </clipPath>
                    </defs>
                    </svg>
                    <svg width="40" height="32" viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_808_19213)">
                    <path d="M7.27156 31.8411V29.7231C7.27156 28.911 6.79125 28.3817 5.96797 28.3817C5.55641 28.3817 5.11047 28.5229 4.80172 28.9818C4.56172 28.5935 4.21875 28.3817 3.70422 28.3817C3.36109 28.3817 3.01828 28.4875 2.74375 28.8758V28.4523H2.02344V31.8411H2.74375V29.9701C2.74375 29.3701 3.0525 29.0876 3.53281 29.0876C4.01281 29.0876 4.25313 29.4054 4.25313 29.9701V31.8411H4.97344V29.9701C4.97344 29.3701 5.31625 29.0876 5.76219 29.0876C6.2425 29.0876 6.4825 29.4054 6.4825 29.9701V31.8411H7.27156ZM17.9389 28.4523H16.7728V27.4286H16.0525V28.4523H15.4008V29.1228H16.0523V30.6762C16.0523 31.4529 16.3611 31.9116 17.1844 31.9116C17.4931 31.9116 17.8359 31.8058 18.0763 31.6646L17.8703 31.0292C17.6645 31.1703 17.4245 31.2057 17.253 31.2057C16.91 31.2057 16.7728 30.9939 16.7728 30.6408V29.1228H17.9389V28.4523ZM24.0445 28.3815C23.633 28.3815 23.3586 28.5935 23.187 28.8758V28.4523H22.4667V31.8411H23.187V29.9349C23.187 29.3701 23.427 29.0524 23.873 29.0524C24.0102 29.0524 24.1817 29.0878 24.3189 29.123L24.5247 28.4171C24.3875 28.3817 24.1817 28.3817 24.0445 28.3817V28.3815ZM14.8177 28.7346C14.4745 28.4875 13.9944 28.3817 13.4798 28.3817C12.6567 28.3817 12.108 28.8052 12.108 29.4759C12.108 30.0408 12.5195 30.3584 13.2398 30.4644L13.5828 30.4998C13.9602 30.5702 14.1659 30.6762 14.1659 30.8528C14.1659 31.0997 13.8916 31.2763 13.4113 31.2763C12.9311 31.2763 12.5537 31.0997 12.3136 30.9233L11.9706 31.4881C12.348 31.7705 12.8625 31.9116 13.3769 31.9116C14.3373 31.9116 14.8863 31.4529 14.8863 30.8174C14.8863 30.2173 14.4403 29.8995 13.7542 29.7937L13.4113 29.7583C13.1025 29.7229 12.8625 29.6525 12.8625 29.4407C12.8625 29.1936 13.1025 29.0524 13.4798 29.0524C13.8916 29.0524 14.3031 29.2288 14.5089 29.3348L14.8177 28.7346ZM33.9575 28.3817C33.5458 28.3817 33.2714 28.5935 33.0998 28.8758V28.4523H32.3795V31.8411H33.0998V29.9349C33.0998 29.3701 33.34 29.0524 33.7858 29.0524C33.9231 29.0524 34.0947 29.0878 34.2319 29.123L34.4377 28.4171C34.3005 28.3817 34.0947 28.3817 33.9575 28.3817ZM24.7648 30.1467C24.7648 31.1703 25.4508 31.9116 26.5142 31.9116C26.9944 31.9116 27.3373 31.8058 27.6803 31.5235L27.3373 30.9233C27.063 31.1351 26.7886 31.2409 26.4798 31.2409C25.8967 31.2409 25.4852 30.8174 25.4852 30.1467C25.4852 29.5113 25.8967 29.0876 26.4798 29.0524C26.7886 29.0524 27.063 29.1582 27.3373 29.3701L27.6803 28.77C27.3373 28.4875 26.9944 28.3817 26.5142 28.3817C25.4508 28.3817 24.7648 29.123 24.7648 30.1467ZM31.4192 30.1467V28.4523H30.6989V28.8758C30.4588 28.5582 30.1158 28.3817 29.6698 28.3817C28.7438 28.3817 28.0234 29.123 28.0234 30.1467C28.0234 31.1703 28.7438 31.9116 29.6698 31.9116C30.15 31.9116 30.4931 31.7352 30.6989 31.4175V31.8411H31.4192V30.1467ZM28.778 30.1467C28.778 29.5465 29.1553 29.0524 29.7727 29.0524C30.3558 29.0524 30.7675 29.5113 30.7675 30.1467C30.7675 30.7468 30.3558 31.2409 29.7727 31.2409C29.1553 31.2056 28.778 30.7468 28.778 30.1467ZM20.1686 28.3817C19.2081 28.3817 18.522 29.0876 18.522 30.1467C18.522 31.2057 19.208 31.9116 20.2028 31.9116C20.683 31.9116 21.1633 31.7705 21.5406 31.4529L21.1975 30.9233C20.9231 31.1351 20.5802 31.2763 20.2372 31.2763C19.7913 31.2763 19.3453 31.0645 19.2423 30.4642H21.6778V30.182C21.7122 29.0876 21.0947 28.3817 20.1684 28.3817H20.1686ZM20.1686 29.017C20.6144 29.017 20.9233 29.2995 20.9917 29.8291H19.2767C19.3453 29.3701 19.6541 29.017 20.1686 29.017ZM38.0392 30.1467V27.1108H37.3189V28.8758C37.0788 28.5582 36.7358 28.3817 36.2898 28.3817C35.3638 28.3817 34.6434 29.123 34.6434 30.1467C34.6434 31.1703 35.3638 31.9116 36.2898 31.9116C36.7702 31.9116 37.1131 31.7352 37.3189 31.4175V31.8411H38.0392V30.1467ZM35.3981 30.1467C35.3981 29.5465 35.7753 29.0524 36.3928 29.0524C36.9759 29.0524 37.3875 29.5113 37.3875 30.1467C37.3875 30.7468 36.9759 31.2409 36.3928 31.2409C35.7753 31.2056 35.3981 30.7468 35.3981 30.1467ZM11.3189 30.1467V28.4523H10.5986V28.8758C10.3584 28.5582 10.0155 28.3817 9.56953 28.3817C8.64344 28.3817 7.92312 29.123 7.92312 30.1467C7.92312 31.1703 8.64344 31.9116 9.56953 31.9116C10.0498 31.9116 10.3928 31.7352 10.5986 31.4175V31.8411H11.3189V30.1467ZM8.64344 30.1467C8.64344 29.5465 9.02078 29.0524 9.63813 29.0524C10.2213 29.0524 10.633 29.5113 10.633 30.1467C10.633 30.7468 10.2213 31.2409 9.63813 31.2409C9.02078 31.2056 8.64344 30.7468 8.64344 30.1467Z" fill="#51BEF9"/>
                    <path d="M14.5781 2.71826H25.3828V22.6983H14.5781V2.71826Z" fill="#3097CE"/>
                    <path d="M15.2639 12.7082C15.2639 8.64868 17.1161 5.04796 19.963 2.71807C17.8708 1.02368 15.2297 0 12.3484 0C5.52234 0 0 5.6833 0 12.7082C0 19.7329 5.52234 25.4164 12.3483 25.4164C15.2295 25.4164 17.8706 24.3927 19.963 22.6981C17.1161 20.4036 15.2639 16.7677 15.2639 12.7082Z" fill="#51BEF9"/>
                    <path d="M39.961 12.7082C39.961 19.7329 34.4387 25.4164 27.6127 25.4164C24.7315 25.4164 22.0904 24.3927 19.998 22.6981C22.8793 20.3684 24.6973 16.7677 24.6973 12.7082C24.6973 8.64868 22.8449 5.04796 19.998 2.71807C22.0902 1.02368 24.7315 0 27.6127 0C34.4387 0 39.9612 5.71867 39.9612 12.7082H39.961Z" fill="#51BEF9"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_808_19213">
                    <rect width="40" height="32" fill="white"/>
                    </clipPath>
                    </defs>
                    </svg>
                    <svg width="84" height="24" viewBox="0 0 84 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clipPath="url(#clip0_808_19218)">
<path d="M80.8272 14.9778C82.0707 14.2296 83.036 12.342 83.3632 11.4918L60.0488 11.4067V24.0756H67.5749V17.1035H75.5917C77.4732 17.1035 79.2729 15.9131 80.8272 14.9778Z" fill="#51BEF9"/>
<path d="M41.004 0.145508H33.231L33.2051 24.0756H40.2436C41.5955 24.0756 42.891 22.7836 43.3697 22.1376L48.946 9.91976H49.4529V24.0756H57.2259L57.1414 0.145508H49.8754C48.3208 0.145508 47.1999 1.77455 46.8338 2.58907L41.4265 14.3013H40.8351L41.004 0.145508Z" fill="#51BEF9"/>
<path d="M0 24.0756H7.72071L7.63679 10.0883H8.14031L12.3035 24.0756H17.959L22.1551 9.91976H22.6586L22.5056 24.0756H30.3793V0.145508H22.1551C19.7382 0.145508 18.5185 3.1789 18.2108 4.69559L15.2736 14.3013H14.9379C14.3784 12.4195 13.0413 7.8638 12.1685 4.69559C11.2957 1.52739 9.39912 0.342116 8.55991 0.145508H0V24.0756Z" fill="#51BEF9"/>
<path d="M76.5535 0.145508H59.3438C59.3438 1.21298 59.7656 3.10158 61.6215 5.97553C63.1063 8.2747 67.1893 9.61587 69.0453 9.99907H84.0616V9.67062C84.0616 8.2747 84.3147 6.13976 82.2057 3.2658C80.5184 0.966638 77.7345 0.227621 76.5535 0.145508Z" fill="#51BEF9"/>
</g>
<defs>
<clipPath id="clip0_808_19218">
<rect width="84" height="24" fill="white"/>
</clipPath>
</defs>
                    </svg>
                    <svg width="64" height="24" viewBox="0 0 64 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M46.52 3.46867C45.0305 2.93024 43.4578 2.65875 41.874 2.66667C36.76 2.66667 33.146 5.25067 33.124 8.94867C33.082 11.6667 35.686 13.1987 37.654 14.1147C39.676 15.0527 40.352 15.6367 40.342 16.4687C40.332 17.7507 38.726 18.3227 37.248 18.3227C35.194 18.3227 34.08 18.0427 32.362 17.3227L31.724 17.0207L30.996 21.2927C32.246 21.8027 34.486 22.2507 36.798 22.2927C42.246 22.2927 45.798 19.7307 45.838 15.7807C45.88 13.6147 44.486 11.9707 41.516 10.6147C39.724 9.74067 38.602 9.14467 38.602 8.24867C38.602 7.45667 39.56 6.62467 41.56 6.62467C42.8873 6.59142 44.2068 6.83599 45.434 7.34267L45.924 7.56067L46.642 3.44667L46.52 3.46867ZM59.814 3.02067H55.814C54.564 3.02067 53.636 3.35467 53.084 4.59467L45.396 22.0207H50.834L51.93 19.1667L58.564 19.1767C58.73 19.8427 59.198 22.0187 59.198 22.0187H64L59.814 3.02067ZM25.76 2.86467H30.938L27.698 21.8727H22.52L25.76 2.85467V2.86467ZM12.594 13.3327L13.124 15.9787L18.196 3.02067H23.686L15.518 21.9887H10.052L5.572 5.92667C5.53768 5.79325 5.47653 5.66822 5.39228 5.55922C5.30803 5.45021 5.20246 5.35952 5.082 5.29267C3.47277 4.45569 1.76566 3.82216 0 3.40667L0.062 3.00867H8.416C9.542 3.05067 10.458 3.40667 10.77 4.61467L12.594 13.3427V13.3327ZM53.406 15.2807L55.48 9.95867C55.448 10.0087 55.906 8.86467 56.166 8.14467L56.52 9.77867L57.72 15.2687H53.406V15.2807Z" fill="#51BEF9"/>
                    </svg>
                  </div>
                    }
                  </div>
                  <div className='flex flex-col items-end mt-[15px]'>
                    <div className='flex flex-col justify-start items-center gap-[20px] w-[68%]'>
                      <button onClick={() => {
                        setRulesText(!rulesText)
                      }} className='btn__s w-full p-[4.5px_15px] flex justify-between'><p className='text-i-p3'>{rulesText ? 'Скрыть правила онлайн оплаты' : 'Открыть правила онлайн оплаты'}</p> <div className='w-[24px] h-[24px] flex items-center justify-center'><Icon type={rulesText ? 'close' : 'info'}></Icon></div></button>
                      {rulesText && <div className='flex flex-col gap-[10px] text-gray4 text-i-p2 leading-5'>
                        <p>Для оплаты (ввода реквизитов Вашей карты) Вы будете перенаправлены на платёжный шлюз ПАО СБЕРБАНК. Соединение с платёжным шлюзом и передача информации осуществляется в защищённом режиме с использованием протокола шифрования SSL. В случае если Ваш банк поддерживает технологию безопасного проведения интернет-платежей Verified By Visa, MasterCard SecureCode, MIR Accept, J-Secure, для проведения платежа также может потребоваться ввод специального пароля.</p>
                        <p>Настоящий сайт поддерживает 256-битное шифрование. Конфиденциальность сообщаемой персональной информации обеспечивается ПАО СБЕРБАНК. Введённая информация не будет предоставлена третьим лицам за исключением случаев, предусмотренных законодательством РФ. Проведение платежей по банковским картам осуществляется в строгом соответствии с требованиями платёжных систем МИР, Visa Int., MasterCard Europe Sprl, JCB.</p>
                        <p>Срок возврата товара надлежащего качества составляет 30 дней с момента получения товара.Возврат переведённых средств, производится на ваш банковский счёт в течение 5-30 рабочих дней (срок зависит от банка, который выдал вашу банковскую карту).</p>
                      </div>}
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
            <div className='col-span-2 w-[38%] absolute right-0 top-[90px] pb-[25px] h-[93.4%]'>
              <div className='w-full fixed m:sticky bottom-0 m:top-0 left-0 pt-[76px]'>
                <div className='w-full h-[170px] xxs:h-[190px] xs:h-[400px] m:h-[500px] m:rounded-[8px] rounded-[8px_8px_0px_0px] card p-[30px] flex flex-col justify-between gap-[20px]'>
                  <div className='flex flex-col gap-[10px] w-full'>
                    <p className={sum && sum > 0 ? 'text-u-h3 font-bold' : 'text-gray4 text-u-h3 font-bold'}>Итого: {sum ? insertSpaces(`${sum}`) : 0} ₽</p>
                    <p className='text-i-p3 text-gray4'>Общая стоимость, включая установку деталей.</p>

                    {/* <div className='flex flex-col gap-[10px] w-full mt-[10px]'>
                      <div className='flex items-center gap-[5px] text-i-p3 text-prim3 underline cursor-pointer' onClick={() => setConfRules(!confRules)}><Toggle type='checkbox' isChecked={confRules} onClick={() => setConfRules(!confRules)} /> Согласен с политикой конфиденциальности</div>
                      <div className='flex items-center gap-[5px] text-i-p3 text-prim3 underline cursor-pointer' onClick={() => setPaymentRules(!paymentRules)}><Toggle type='checkbox' isChecked={paymentRules} onClick={() => setPaymentRules(!paymentRules)} /> Согласен с правилами оплаты</div>
                    </div> */}
                  </div>
                  {/* <button disabled={sum && sum > 0 && paymentRules && confRules ? false : true} onClick={() => {
                      push('payment/cash')
                    }} className='btn__p w-full flex items-center justify-between'>Перейти к оплате <Icon type='vector_forvard'></Icon></button> */}
                  <div className='flex flex-col gap-[10px] w-full'>
                  {errors.appointments[0] && <p className='text-red2'>{errors.appointments[1]}</p>}
                  <button disabled={sum && sum > 0 ? false : true} onClick={() => {
                      // let status = false
                      if(basketData?.appointments && basketData?.appointments.length > 0 && profile) {
                        debugger
                        if(profile.first_name !== firstName) {

                        }
                        appointmentService.createAppointment({car: carId})
                        .then(() => {
                          // status = true
                          debugger
                          errors.appointments = [false, '']
                          setErrors(JSON.parse(JSON.stringify(errors)))
                          push('payment/cash/csuccess')
                        })
                        .catch(() => {
                          errors.appointments = [true, 'не все услуги в заказе соответсвуют марке автомобиля в заказе']
                          setErrors(JSON.parse(JSON.stringify(errors)))
                          push('payment/cash/cerror')
                        })
                      }
                      if(basketData?.products.length > 0) {
                        appointmentService.createService()
                        .then(() => {

                          push('payment/cash/csuccess')
                        })
                        .catch(() => {

                          push('payment/cash/cerror')
                        })
                      }
                      
                      // push('payment/cash/cerror')
                      // push('payment/cash/csuccess')
                    }} className='btn__p w-full flex items-center justify-between'>Перейти к оплате <Icon type='vector_forvard'></Icon></button>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div> 
      </Container>
    </div>
  )
}

export default Payment