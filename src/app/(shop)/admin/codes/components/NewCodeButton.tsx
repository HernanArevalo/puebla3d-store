"use client";


import { createCode } from '@/actions'
import React from 'react'

export const NewCodeButton = () => {
  return (
    <button className="btn-dark" onClick={()=> createCode()}>
      Nuevo código
    </button>
  )
}
