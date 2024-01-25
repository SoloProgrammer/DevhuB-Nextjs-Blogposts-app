"use client"
import React from 'react'

const Error = ({error, reset}) => {
  return (
    <div>
      {error.message || 'Somthing went wrong, Try again'}
      <button onClick={window.location.reload()}>Try again</button>
    </div>
  )
}

export default Error
