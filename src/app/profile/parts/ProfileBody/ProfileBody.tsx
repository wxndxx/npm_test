'use client'

import React, { useEffect, useState } from 'react'
import s from './ProfileBody.module.scss'
import { MyStorage } from '@/utils/MyStorage'
import { authService } from '@/services/auth.service'
import { useTypedDispatch } from '@/store/store'
import { setAuth, setOrders, setUser } from '@/store/Slices/ProfileSlice'
import { IUser } from '@/shared/types/Profile'
import Icon from '@/components/UI/Icon/Icon'
import { useRouter } from 'next/navigation'
import Modal from '@/components/UI/Modal/Modal'
import Input from '@/components/UI/Input/Input'
import SearchSelect from '@/components/UI/SearchSelect/SearchSelect'
import { profileService } from '@/services/profile.service'
import { appointmentService } from '@/services/appointment.service'
import { onChangeBasket, onChangeSum } from '@/store/Slices/BasketSlice'
// import { appointmentService } from '@/services/appointment.service'


type Props = {
}

interface IUserError {
    first_name: [boolean, string],
    gosNum: [boolean, string],
    vinNum: [boolean, string],
    email: [boolean, string]
}

const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

function ProfileBody({}:Props) {
    const dispatch = useTypedDispatch()
    //const user = useTypedSelector(state => state.profile.user)
    const [profile, setProfile] = useState<IUser>()
    const [notificationsData, setNotificationsData] = useState<any>()
    const [notificationsCount, setNotificationsCount] = useState<any>()
    useEffect(() => {

        if(MyStorage.get('accessToken')) {
            authService.getProfile()
            .then((res) => {
                // debugger
                dispatch(setUser(res))
                dispatch(setAuth(true))
                setProfile(res)
                setUserData(res)
                if(res.cars.length > 0) {
                    setSelect(res.cars[0].model.brand.name)
                    setSearchTerm(res.cars[0].model.brand.name)
                    setSearchModel(res.cars[0].model.name)
                    setSelectModel(res.cars[0].model.name)
                    setModelsId(res.cars[0].model.id)
                    setCarsId(res.cars[0].id)
                    setGosValue(res.cars[0].license_plate)
                    setVinValue(res.cars[0].vin)
                }
                appointmentService.getMyOrders()
                .then((res:any) => {
                    dispatch(setOrders(res))
                    setOrdersData(res)
                })
                appointmentService.getAllNotifications()
                .then((res:any) => {
                  if(res) {
                    const countUnread = (arr:any) => {
                        return arr.filter((item:any) => !item.read).length;
                    };
                    
                    const unreadCount = countUnread(res);
                    setNotificationsCount(unreadCount)
                    setNotificationsData(res)
                  }
                })
                .catch((err:any) => {
                  console.log(err)
                })
            })
            .catch((e) => {
                console.log(e)
            })
            
        }

    }, [])
    const {push} = useRouter()

    //const {orders, notifications} = useTypedSelector((state) => state.profile)
    const [ordersData, setOrdersData] = useState<any>()

    function exitFunc() {
        dispatch(onChangeBasket(null))
        dispatch(onChangeSum(0))
        MyStorage.delete('accessToken')
        MyStorage.delete('refreshToken')
        dispatch(setUser(null))
        dispatch(setAuth(false))
        push('/')
    }
    const [modal, setModal] = useState<boolean>(false);

    const [userData, setUserData] = useState<any>({
        first_name: '',
        email: '',
        vinNum: '',
        gosNum: '',
    })
    const [userErr, setUserErr] = useState<IUserError>({
        first_name: [false, ''],
        gosNum: [false, ''],
        vinNum: [false, ''],
        email: [false, '']
    })
    //Загрузка на кнопках
    const [loaded, setLoaded] = useState(false)

    const [modalType, setModalType] = useState<string>('user')

    function onChangeName(e:React.ChangeEvent<HTMLInputElement>) {

        setUserData((prev:any) => ({
            ...prev,
            first_name: e.target.value.replace(/\d/g, '')
        }))
        userErr.first_name = [false, '']
        setUserErr(JSON.parse(JSON.stringify(userErr)))
    }
    
    function onChangeEmail(e:React.ChangeEvent<HTMLInputElement>) {
        setUserData((prev:any) => ({
            ...prev,
            email: e.target.value
        }))
        userErr.email = [false, '']
        setUserErr(JSON.parse(JSON.stringify(userErr)))
    }
    //изменение данных пользователя
    function changeProfileFunc() {
        setLoaded(true)
        profileService.changeProfile(profile?.first_name != userData.first_name && userData.first_name, profile?.email != userData.email && userData.email)
        .then(() => {
            authService.getProfile()
            .then((res) => {
                dispatch(setUser(res))
                dispatch(setAuth(true))
                console.log(res)
                setProfile(res)
                setUserData(res)
                if(res.cars.length > 0) {
                    setSelect(res.cars[0].model.brand.name)
                    setSearchTerm(res.cars[0].model.brand.name)
                    setSearchModel(res.cars[0].model.name)
                    setSelectModel(res.cars[0].model.name)
                    setCarsId(res.cars[0].id)
                    setModelsId(res.cars[0].model.id)
                    setGosValue(res.cars[0].license_plate)
                    setVinValue(res.cars[0].vin)
                }
            })
        })
        .catch((err:any) => {
            alert(err)
        })
    }

    const [brands, setBrands] = useState<any>([])

    const [models, setModels] = useState<any>([])
    const [modelsId, setModelsId] = useState<any>()

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredBrands, setFilteredBrands] = useState<any>(brands);
    const [select, setSelect] = useState<any>()
    const [carsId, setCarsId] = useState<any>()
    // models
    const [searchModel, setSearchModel] = useState('');
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
      
      const setSelected = (val:any) => {
        setSearchTerm(val);
        setSelect(val)
        const brand = brands.find((brand:any) => brand.name.toLowerCase() === val.toLowerCase())?.name;
        authService.getModels(brand)
        .then((res) => {
            setModels(res)
        })
      }

      //model methods
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


    const [gosNum, setGosValue] = useState('');

    async function getBrandsfun() {
        authService.getBrands()
        .then((res:any) => {
            setBrands(res)
        })
    }

    const handleGosChange = (event: any) => {
        console.log(event.target.value.length)
        const input = event.target.value;
        setGosValue(input.toUpperCase());
        // if(event.target.value.length < 10) {
        //     setGosValue(input.toUpperCase());
        // }
      
        // // Проверить, содержит ли строка только цифры и буквы
        const regex = /^[A-Z][0-9]{3}[A-Z]{2}[0-9]{2,3}$/;
        if (!regex.test(input)) {
        // Удалить последний введенный символ, если он не соответствует формату
            userErr.gosNum = [true, 'Введите номер формата B876KU777']
            setUserErr(JSON.parse(JSON.stringify(userErr)))
        } else {
            userErr.gosNum = [false, '']
            setUserErr(JSON.parse(JSON.stringify(userErr)))
        }
      
      };

      const [vinNum, setVinValue] = useState('');
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

      function setCar() {
        // debugger
        if(carsId) {
            authService.editCar({brand: select, model:modelsId, license_plate:gosNum, vin:vinNum}, carsId)
            .then((res:any) => {
                setModels(res)
                authService.getProfile()
                .then((res) => {
                    dispatch(setUser(res))
                    dispatch(setAuth(true))
                    console.log(res)
                    setProfile(res)
                    setUserData(res)
                    if(res.cars.length > 0) {
                        setSelect(res.cars[0].model.brand.name)
                        setSearchTerm(res.cars[0].model.brand.name)
                        setSearchModel(res.cars[0].model.name)
                        setSelectModel(res.cars[0].model.name)
                        setModelsId(res.cars[0].model.id)
                        setCarsId(res.cars[0].id)
                        setGosValue(res.cars[0].license_plate)
                        setVinValue(res.cars[0].vin)
                    }
                })
                    .catch((err:any) => {
                        console.log(err)
                })
            })
        }
        else {
            authService.createCar(select, modelsId, gosNum, vinNum)
            .then((res:any) => {
                setModels(res)
                authService.getProfile()
                .then((res) => {
                    dispatch(setUser(res))
                    dispatch(setAuth(true))
                    console.log(res)
                    setProfile(res)
                    setUserData(res)
                    if(res.cars.length > 0) {
                        setSelect(res.cars[0].model.brand.name)
                        setSearchTerm(res.cars[0].model.brand.name)
                        setSearchModel(res.cars[0].model.name)
                        setSelectModel(res.cars[0].model.name)
                        setModelsId(res.cars[0].model.id)
                        setCarsId(res.cars[0].id)
                        setGosValue(res.cars[0].license_plate)
                        setVinValue(res.cars[0].vin)
                    }
                })
                    .catch((err:any) => {
                        console.log(err)
                })
            })
        }
      }

    const ProfileModal = (type:any) => {
        switch(type) {
            case 'user':
                return (
                    <div className='flex flex-col gap-5'>
                        <h3 className='text-u-h3'>Заполните данные о себе</h3>
                        <div className={s.label}>
                            <p className='text-gray4'>Имя или ФИО</p>
                            <Input placeholder='Введите ваше имя или ФИО' type='default' value={userData.first_name} onChange={(e) => onChangeName(e)}></Input>
                        </div>
                        <div className={s.label}>
                            <p className='text-gray4'>Email</p>
                            <Input placeholder='Введите ваш Email' type='default' value={userData.email} onChange={(e) => onChangeEmail(e)}></Input>
                            <span className='text-gray4 text-i-p4'>Для отправки писем с информацией о заказе или записи</span>
                        </div>
                            <button disabled={userData?.first_name?.length < 3 || !validEmailRegex.test(userData.email)} className='btn__p flex justify-center' onClick={() => {
                                changeProfileFunc()
                                setModal(false)
                            }}>{!loaded ? 'Продолжить' : <div className={s.spin}><svg className={s.spin} width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 1.5V4.5M10 16.5V19.5M4 10.5H1M19 10.5H16M3.63672 4.13672L5.75977 6.25977M14.2422 14.7422L16.3633 16.8633M16.3652 4.13477L14.2441 6.25586M5.75781 14.7422L3.63477 16.8652" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg></div>}</button>
                        </div>
                )
            case 'car':
                return (
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
                            // || profile?.cars[0].vin === vinNum
                        } onClick={() => {
                            setCar()
                        }} className='btn__p flex justify-center'>Применить изменения</button>
                    </div>
                )
            default:
                return
        }
    }

    function parseVal(text:string, num:number) {
        function ender(number:number, {first, second, third}:{first:string, second:string, third:string}) {
            let a = String(number);
            let aEnd = a[a.length - 1];
            switch(aEnd) {
                case "1":
                    if(a[a.length - 2] === "1") {
                        return third
                        
                    } 
                    return first
                case "2":
                case "3":
                case "4":
                    if(a[a.length - 2] === "1") {
                        return third
                    } 
                    return second
                default:
                    return third;
            }
        }
        return `${text}${ender(num, {first:'ь', second:'и', third:'ьей'})}`
    }

    function Card (title: string, onClick:() => void, children:React.ReactNode){
        return (
            <div className='relative min-h-[120px] xs:min-h-[356px] w-full xs:w-[33.333%] h-full cursor-pointer' onClick={onClick}>
                <div className='absolute h-full w-full p-[30px] border border-gray1 rounded-[8px] bg-white hover:bg-prim1 flex flex-col gap-[15px]'>
                    <div className='flex justify-between items-center'>
                        <h4 className='text-u-h4 font-bold'>{title}</h4>
                        <Icon color='rgba(81, 190, 249, 1)' type='uf'/>
                    </div>
                    <div className='leading-5'>
                        {children}
                    </div>
                </div>
            </div>
        )
    }

  return (
    <div className={s.profile}>
        {modal && <Modal onClose={() => {
            document.body.classList.remove("modal-open")
            setModal(false)
        }} isOpen={modal}>{ProfileModal(modalType)}</Modal>}
        {profile ? <div className={s.content}>
            <div className='hidden xs:flex flex-col gap-[10px]'>
                <div className='w-full flex items-center justify-between uppercase'>
                    <div className='flex items-center gap-[10px]'>
                        <h2 className='text-u-h2 font-bold'>{profile && profile?.first_name}</h2>
                        <button onClick={() => {
                            setModalType('user')
                            setModal(true)
                        }} className='btn__s p-[11px_18px]'><Icon type='pen2'/></button>
                    </div>
                    <button onClick={() => exitFunc()} className='btn__s_del p-[11px_15px] gap-[10px]'><Icon type='off'/>Выход</button>
                </div>
                <div>
                    <h4 className='text-u-h4 font-bold text-gray4'>{profile?.email}</h4>
                </div>
            </div>
            <div className='flex xs:hidden flex-col gap-[10px]'>
                <div className='w-full flex flex-col gap-[10px] justify-between uppercase'>
                    <div className='flex flex-col gap-[10px]'>
                        <h2 className='text-u-h2 font-bold'>{profile && profile?.first_name}</h2>
                        <h4 className='text-u-h4 font-bold text-gray4'>{profile?.email}</h4>
                    </div>
                    <div className='xn:w-fit w-full items-center gap-[10px] grid xn:grid-cols-2'>
                        <button onClick={() => {
                            setModalType('user')
                            setModal(true)
                        }} className='btn__s p-[11px_18px] gap-[10px] justify-center flex '><Icon type='pen2'/><p>Изменить</p></button>
                        <button onClick={() => exitFunc()} className='btn__s_del p-[11px_18px] justify-center flex gap-[10px]'><Icon type='off'/>Выход</button>
                    </div>
                </div>

            </div>
            <div className='flex flex-col xs:flex-row items-center gap-[30px] h-full min-h-[auto] xs:min-h-[356px]'>
            {Card('Данные авто', () => {
                getBrandsfun()
                if(searchModel) {
                    authService.getModels(profile.cars[0].model.brand.name)
                    .then((res:any) => {
                        setModels(res)
                        setModalType('car')
                        setModal(true)
                    })
                } else {
                    setModalType('car')
                    setModal(true)
                }
            }, (
                <div >
                    {profile.cars.length === 0 ? <div>Данные не добавлены</div> : 
                    <div className='flex flex-col gap-[10px]'>{profile.cars.map((item:any, index) => (
                        <div className='text-wrap w-full' key={index}>{`${item.model.brand.name} ${item.model.name} ${item.license_plate} (${item.vin})`}</div>
                    ))}</div>
                    }
                </div>
            ))}
            {Card('Записи и заказы', () => {ordersData.length > 0 && push('/profile/appointments')}, (
                <div>
                    {ordersData?.length === 0 ? <div>У вас нет записей или заказов</div> : 
                    <div>{ordersData?.length} {ordersData && parseVal('запис', ordersData.length)}</div>
                    }
                </div>
            ))}
            {Card('Уведомления', () => {notificationsData?.length > 0 && push('/profile/notifications')}, (
                <div>
                    {notificationsData?.length === 0 ? <div>Данные не добавлены</div> : 
                    <div><span className='text-prim4'>{notificationsCount && 'Новое уведомление! '}</span>Всего: {notificationsCount}</div>
                    }
                </div>
            ))}
            </div>
        </div> : 
        <div className='w-full h-screen flex justify-center'><div><svg className={s.spin_m} width="50" height="51" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 1.5V4.5M10 16.5V19.5M4 10.5H1M19 10.5H16M3.63672 4.13672L5.75977 6.25977M14.2422 14.7422L16.3633 16.8633M16.3652 4.13477L14.2441 6.25586M5.75781 14.7422L3.63477 16.8652" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg></div></div>}
    </div>
  )
}

export default ProfileBody