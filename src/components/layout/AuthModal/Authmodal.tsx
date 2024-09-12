'use client'

import Modal from '@/components/UI/Modal/Modal'
import { setModal } from '@/store/Slices/ProfileSlice'
import { useTypedDispatch, useTypedSelector } from '@/store/store'
import React from 'react'
import Auth from '../Header/parts/Auth/Auth'

type Props = {}

function Authmodal({}: Props) {
    const dispatch = useTypedDispatch()
    const {modal} = useTypedSelector((state) => state.profile)
  return (
    <div>
        {modal && <Modal isOpen={modal} onClose={() => {
            dispatch(setModal(false));
            document.body.classList.remove("modal-open")
        }}><Auth onClose={() => {
            dispatch(setModal(false))
            document.body.classList.remove("modal-open")
        }}/></Modal>}
    </div>
  )
}

export default Authmodal