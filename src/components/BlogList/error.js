import React from 'react'

const Error = ({error, reset}) => {
  return (
    <div>
      {error.message || 'Somthing went wrong, Try again'}
      <button onClick={reset}>Try again</button>
    </div>
  )
}

export default Error
