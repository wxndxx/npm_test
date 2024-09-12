'use client'

import Container from '../../components/UI/Container/Container'
import Icon from '../../components/UI/Icon/Icon'
import Input from '../../components/UI/Input/Input'
import Modal from '@/components/UI/Modal/Modal'
import OrderCard from '@/components/UI/OrderCard/OrderCard'
import SearchSelect from '@/components/UI/SearchSelect/SearchSelect'
import { authService } from '@/services/auth.service'
import { basketService } from '@/services/busket.service'
import { IBasket } from '@/shared/types/Basket'
import { onChangeBasket, onChangeSum } from '@/store/Slices/BasketSlice'
import s from './style.module.scss'
import { useTypedDispatch } from '@/store/store'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type Props = {}

interface IErrors {
  appointment: [boolean, string]
}

interface IUserError {
  first_name: [boolean, string],
  gosNum: [boolean, string],
  vinNum: [boolean, string],
  email: [boolean, string]
}

function Basket({}: Props) {

  const [userErr, setUserErr] = useState<IUserError>({
    first_name: [false, ''],
    gosNum: [true, ''],
    vinNum: [true, ''],
    email: [false, '']
})

  const [_errors, setErrors] = useState<IErrors>({
    appointment: [false, '']
  })

  const dispatch = useTypedDispatch()

  const [change, setChange] = useState<boolean>()
  //const {basket, status} = useTypedSelector((state) => state.basket)

  useEffect(() => {
    basketService.getBusket()
    .then((res:any) => {
      setSum(res.appointments_sum + res.products_sum)
      dispatch(onChangeBasket(res))
      dispatch(onChangeSum(res.appointments_sum + res.products_sum))
      setBasketData(res)
      setAppointmentsData(JSON.parse(JSON.stringify([...res.appointments])))
      setProductsData(JSON.parse(JSON.stringify([...res.products])))

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
      setSelectedSum(sum)
    })
    .catch((err:any) => {
      console.log(err)
    })
  }, [change])
  const [basketData, setBasketData] = useState<IBasket>()
  const [appointmentsData, setAppointmentsData] = useState<any>()
  const [productsData, setProductsData] = useState<any>()
  const [sum, setSum] = useState<number>()
  
  function insertSpaces(number:string) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  const [car, setCar] = useState<any>(null)

  useEffect(() => {
    authService.getProfile()
    .then((res:any) => {
      setCar(res.cars)
    })
    .catch((err:any) => {
      console.log(err)
    })
  }, [])

  // const [sumOrders, setSumOrders] = useState<number>()

  // function sumQuantityOfTrueOrders(orders:any) {
  //   let sum = 0;
  //   for (let i = 0; i < orders.length; i++) {
  //     if (orders[i].order_true) {
  //       sum += orders[i].quantity;
  //     }
  //   }
  //   return sum;
  // }

  function changeAppointment(index:number, obj:any) {
    basketService.patchNewProduct(obj, appointmentsData[index].id)
    .then(() => {
      setChange(!change)
    })
    .catch(() => {
      setErrors((prev:any) => ({
        ...prev,
        appointment: [true, 'Нельзя добавить больше одной одинаковой услуги']
      }))
    })
  }

  function changeProduct(index:number, obj:any) {
    basketService.patchNewProduct(obj, productsData[index].id)
    .then(() => {
      setChange(!change)
    })
    .catch((err:any) => {
      console.log(err)
    })
  }

  const [selectedSum, setSelectedSum] = useState<any>()

  function selectAll() {
    basketService.pinAllProducts()
    .then((res:any) => {
      setChange(!change)
      console.log(res)
    })
  }

  function clearBasket() {
    basketService.clearBasket()
    .then((res:any) => {
      setChange(!change)
      console.log(res)
    })
  }

  const [searchTerm, setSearchTerm] = useState('');
  const [modal, setModal] = useState<boolean>(false)
  const [brands, setBrands] = useState<any>([])
  const [filteredBrands, setFilteredBrands] = useState<any>(brands);
  const [select, setSelect] = useState<any>()
  const [models, setModels] = useState<any>([])
  const [searchModel, setSearchModel] = useState('');
  const [modelsId, setModelsId] = useState<any>()
  const [filteredModels, setFilteredModels] = useState<any>(models);
  const [selectModel, setSelectModel] = useState<any>()

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
  
    // // Проверить, содержит ли строка только цифры и буквы
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

  const {push} = useRouter()

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
                setCar(res.cars)
                setModal(false)
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
        <div className='grid grid-cols-5 w-[95%] xs:w-[83%] gap-[20px] xs:gap-[30px] p-[30px_0px_200px_0px] xs:p-[40px_0px_40px_0px]'>
          <div className='col-span-5 xs:col-span-3'>
            <div className='flex flex-col gap-[20px] xs:gap-[30px]'>
              <div className='flex m:flex-row flex-col justify-between m:items-center'>
                <h1 className='text-u-h1 font-bold uppercase'>Корзина</h1>
                <div className='flex m:justify-start justify-between items-center gap-[10px]'>
                  <button className='btn__s p-[3px_15px]' onClick={() => selectAll()}>Выбрать все</button>
                  <button className='btn__d p-[6px_15px]' onClick={() => clearBasket()}><Icon type='trash'></Icon></button>
                </div>
              </div>
              <div className='flex flex-col gap-[10px] mb-[10px]'>
                {basketData?.appointments?.map(({service}:any, index:number) => {
                  return(
                  <OrderCard
                    key={index}
                    quantity={appointmentsData[index].quantity}
                  minusFunc={() => {
                    if(appointmentsData[index].quantity > 0) {
                      if(appointmentsData[index].quantity > 1) {
                        appointmentsData[index].quantity = appointmentsData[index].quantity - 1;
                        changeAppointment(index, {
                          quantity: appointmentsData[index]?.quantity,
                          service_id:appointmentsData[index]?.id,
                          type_product: 'appointments',
                        })
                      setAppointmentsData(JSON.parse(JSON.stringify(appointmentsData)))
                      } else {
                        appointmentsData[index].order_true = false,
                        appointmentsData[index].quantity = appointmentsData[index].quantity - 1;
                        changeAppointment(index, {
                          order_true: appointmentsData[index]?.order_true,
                          quantity: appointmentsData[index]?.quantity,
                          service_id:appointmentsData[index]?.id,
                          type_product: 'appointments',
                        })
                        setAppointmentsData(JSON.parse(JSON.stringify(appointmentsData)))
                      }
                    }
                  }}

                    plusFunc={() => {
                      if(appointmentsData[index].quantity < 1){
                        if(appointmentsData[index].quantity < 100) {
                          appointmentsData[index].quantity = appointmentsData[index].quantity + 1
                          appointmentsData[index].order_true = true,
                          setAppointmentsData(JSON.parse(JSON.stringify(appointmentsData)))
                          changeAppointment(index, {
                            order_true: appointmentsData[index]?.order_true,
                            quantity: appointmentsData[index]?.quantity,
                            service_id:appointmentsData[index]?.id,
                            type_product: 'appointments',
                          })
                        }
                      } else {
                        alert('Нельзя добавить больше одной одинаковой услуги')
                      }
                    }}

                    toggleFunc={() => {
                      //console.log(productsData[index].id)
                      if(appointmentsData[index].quantity === 0 && !appointmentsData[index].order_true){
                        appointmentsData[index].quantity = 1;
                        setAppointmentsData(JSON.parse(JSON.stringify(appointmentsData)))
                      }
                      appointmentsData[index].order_true = !appointmentsData[index].order_true;
                      setAppointmentsData(JSON.parse(JSON.stringify(appointmentsData)))
                      changeAppointment(index, {
                        order_true: appointmentsData[index].order_true,
                        service_id:appointmentsData[index]?.id,
                        type_product: 'appointments',
                      })
                      //appointmentsData[index].order_true = !appointmentsData[index].order_true
                    }}

                    isChecked={appointmentsData[index].order_true}
                    type='basket' 
                    total_amount={service?.sum_work} 
                    service={service}
                  />
                )})}
              </div>
            </div>
            <div className='flex flex-col gap-[10px]'>
            {productsData?.map(({sklad}:any, index:number) => {
                  return(
                  <OrderCard
                  key={index}
                  quantity={productsData[index].quantity}
                  minusFunc={() => {
                    if(productsData[index].quantity > 0) {
                      if(productsData[index].quantity > 1) {
                        productsData[index].quantity = productsData[index].quantity - 1;
                        changeProduct(index, {
                          quantity: productsData[index]?.quantity,
                          service_id:productsData[index]?.id,
                          type_product: 'products',
                        })
                      setProductsData(JSON.parse(JSON.stringify(productsData)))
                      } else {
                        productsData[index].order_true = false,
                        productsData[index].quantity = productsData[index].quantity - 1;
                        changeProduct(index, {
                          order_true: productsData[index]?.order_true,
                          quantity: productsData[index]?.quantity,
                          skld_id:productsData[index]?.id,
                          type_product: 'products',
                        })
                        setProductsData(JSON.parse(JSON.stringify(productsData)))
                      }
                    }
                  }}
                  plusFunc={() => {
                      if(productsData[index].quantity < productsData[index].sklad.quantity) {
                        productsData[index].quantity = productsData[index].quantity + 1
                        productsData[index].order_true = true,
                        setProductsData(JSON.parse(JSON.stringify(productsData)))
                        changeProduct(index, {
                          order_true: productsData[index]?.order_true,
                          quantity: productsData[index]?.quantity,
                          skld_id:productsData[index]?.id,
                          type_product: 'products',
                        })
                      } else {
                        alert('Выбранно максимальное кол-во товаров')
                      }
                  }}
                    toggleFunc={() => {
                      //console.log(productsData[index].id)
                      if(productsData[index].quantity === 0 && !productsData[index].order_true){
                        productsData[index].quantity = 1;
                        setProductsData(JSON.parse(JSON.stringify(productsData)))
                      }
                      productsData[index].order_true = !productsData[index].order_true;
                      setProductsData(JSON.parse(JSON.stringify(productsData)))
                      changeProduct(index, {
                        order_true: productsData[index].order_true,
                        skld_id:productsData[index]?.id,
                        type_product: 'products',
                      })
                      productsData[index].order_true = !productsData[index].order_true
                    }}
                    isChecked={productsData[index].order_true}
                    type='basket' 
                    total_amount={sklad?.sum} 
                    service={sklad}
                  />
                )})}
            </div>
          </div>
          <div className='col-span-2 h-full relative'>
            <div className='w-full fixed xs:sticky bottom-0 xs:top-0 left-0 xs:pt-[90px]'>
              <div className='w-full shadow-[0_-5px_9px_0_#080b261c] h-[170px] xxs:h-[190px] xs:h-[400px] m:h-[500px] m:rounded-[8px] rounded-[8px_8px_0px_0px] card p-[20px] xs:p-[30px] flex flex-col justify-between'>
                <div className='flex flex-col gap-[10px] w-full'>
                  <p className='text-i-p3 text-gray4' onClick={() => {}}>Выбрано деталей: {selectedSum && selectedSum}</p>
                  <p className={sum && sum > 0 ? 'text-u-h3 font-bold' : 'text-gray4 text-u-h3 font-bold'}>Итого: {sum ? insertSpaces(`${sum}`) : 0} ₽</p>
                </div>
                <button disabled={sum && sum > 0 && car ? false : true} onClick={() => {
                  if(car.length > 0) {
                    push('/payment')
                  } else {
                    getBrandsfun()
                    setModal(true)
                  }
                  }} className='btn__p w-full flex items-center justify-between'>Оформить заказ <Icon type='vector_forvard'></Icon></button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Basket