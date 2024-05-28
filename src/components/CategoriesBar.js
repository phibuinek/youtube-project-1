import React, { useState, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getPopularVideos, getVideosByCategory } from '../redux/actions/videos.action'

const keyBar = [
  'Tất cả',
  'Trò chơi',
  'Trực tiếp',
  'Danh sách kết hợp',
  'Âm nhạc',
  'Tin tức',
  'Trò chơi hành động phiêu lưu',
  'Trò chơi điện tử chủ đề thể thao',
  'Hoạt hình',
  'Mới tải lên gần đây',
  'Đã xem',
  'Đề xuất mới',
]

const CategoriesBar = () => {
  const [activeElement, setActiveElement] = useState('Tất cả')
  const [isScrolledToEnd, setIsScrolledToEnd] = useState(false)
  const [isScrolledToStart, setIsScrolledToStart] = useState(true)
  const scrollRef = useRef(null)
  
  const dispatch = useDispatch()
  const handleClick = (value) => {
    setActiveElement(value)
    if(value ==='All') {
      dispatch(getPopularVideos())
    }
    else {
      dispatch(getVideosByCategory(value))
    }
  }

  const scroll = (direction) => {
    const { current } = scrollRef
    if (direction === 'left') {
      current.scrollLeft -= 100
    } else {
      current.scrollLeft += 100
    }
  }

  useEffect(() => {
    const { current } = scrollRef
    const handleScroll = () => {
      const isEnd = current.scrollLeft >= current.scrollWidth - current.clientWidth
      const isStart = current.scrollLeft === 0
      setIsScrolledToEnd(isEnd)
      setIsScrolledToStart(isStart)
    }

    handleScroll() // Initial check in case the content is already scrolled to the end or start
    current.addEventListener('scroll', handleScroll)

    return () => {
      current.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className='relative mt-[95px] py-[0.5rem]  mb-3'>
      {!isScrolledToStart && (
        <button
          className='absolute left-[-24px] z-10 p-2 border-none text-white'
          onClick={() => scroll('left')}
        >
          &#9664;
        </button>
      )}
      <div
        ref={scrollRef}
        className='text-[0.9rem] font-semibold flex overflow-x-scroll no-scrollbar'
      >
        {keyBar.map((value, i) => (
          <span
            onClick={() => handleClick(value)}
            key={i}
            className={`hover:bg-[#3F3F3F] cursor-pointer mr-4 p-2 whitespace-nowrap border-[1.5px] border-[#272727] bg-[#272727]  rounded-xl ${
              activeElement === value ? 'active bg-white text-black' : 'text-white'
            }`}
          >
            {value}
          </span>
        ))}
      </div>
      {!isScrolledToEnd && (
        <button
          className='absolute right-[-24px] top-2 z-10 p-2 text-white rounded-full'
          onClick={() => scroll('right')}
        >
          &#9654;
        </button>
      )}
    </div>
  )
}

export default CategoriesBar
