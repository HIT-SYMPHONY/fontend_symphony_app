import React from 'react'

function SeparateDiv() {
  return (
    <div
      className="
      w-[2px]
      bg-[#ccc]
  relative 
  before:content-[''] before:absolute before:left-1/2 before:-translate-x-1/2 before:w-[10px] before:h-[10px] before:bg-[#ccc] before:rounded-full before:top-0 
  after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:w-[10px] after:h-[10px] after:bg-[#ccc] after:rounded-full after:bottom-0
"></div>
  )
}

export default SeparateDiv
