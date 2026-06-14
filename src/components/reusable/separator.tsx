import React from 'react'

const Separator = () => {
  return (
    <div className="flex flex-row items-center my-6 gap-4">
      <hr className="w-full" />
      <span className="text-gray-500">or</span>
      <hr className="w-full" />
    </div>
  )
}

export default Separator
