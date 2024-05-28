import React, { useEffect, useState } from 'react'

import { AiFillEye } from 'react-icons/ai'
import request from '../api'

import moment from 'moment'
import numeral from 'numeral'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const VideoHorizontal = ({ video, searchScreen, subScreen }) => {
   const {
      id,
      snippet: {
         channelId,
         channelTitle,
         description,
         title,
         publishedAt,
         thumbnails: { medium },
         resourceId,
      },
   } = video

   const isVideo = !(id.kind === 'youtube#channel' || subScreen)

   const [views, setViews] = useState(null)
   const [duration, setDuration] = useState(null)
   const [channelIcon, setChannelIcon] = useState(null)

   useEffect(() => {
      const get_video_details = async () => {
         const {
            data: { items },
         } = await request('/videos', {
            params: {
               part: 'contentDetails,statistics',
               id: id.videoId,
            },
         })
         setDuration(items[0].contentDetails.duration)
         setViews(items[0].statistics.viewCount)
      }
      if (isVideo) get_video_details()
   }, [id, isVideo])

   useEffect(() => {
      const get_channel_icon = async () => {
         const {
            data: { items },
         } = await request('/channels', {
            params: {
               part: 'snippet',
               id: channelId,
            },
         })
         setChannelIcon(items[0].snippet.thumbnails.default)
      }
      get_channel_icon()
   }, [channelId])

   const seconds = moment.duration(duration).asSeconds()
   const _duration = moment.utc(seconds * 1000).format('mm:ss')

   const navigate = useNavigate()

   const _channelId = resourceId?.channelId || channelId

   const handleClick = () => {
      isVideo
         ? navigate(`/watch/${id.videoId}`)
         : navigate(`/channel/${_channelId}`)
   }

   const thumbnail = !isVideo && 'videoHorizontal__thumbnail-channel'

   return (
      <Row
         className='py-2 m-1 cursor-pointer mt-24'
         onClick={handleClick}>
         {/* //TODO refractor grid */}
         <Col
            xs={6}
            md={searchScreen || subScreen ? 5 : 6}
            className='relative items-center'>
            <LazyLoadImage
               src={medium.url}
               effect=''
               className={` w-[496px] h-[275px] rounded-lg ${thumbnail} `}
               wrapperClassName='w-[100%]'
            />
            {isVideo && (
               <span className='absolute bottom-[1.5rem] right-[3rem] text-[0.9rem] p-[0.2rem] bg-[#000000] text-white rounded-md'>{_duration}</span>
            )}
            {/* <div className='absolute top-[-10px] right-[-40px]'>
            <p className='mb-10 text-3xl line-clamp-2'>{title}</p>
            <div>
            {isVideo && (
               <div className='text-[0.9rem]'>
                  <AiFillEye /> {numeral(views).format('0.a')} Views •
                  {moment(publishedAt).fromNow()}
               </div>
            )}
            </div>
            </div> */}
         </Col>
         <Col
            xs={6}
            md={searchScreen || subScreen ? 7 : 6}
            className='text-white'>
            <div className='text-3xl line-clamp-2 font-semibold'>{title}</div>

            {isVideo && (
               <div className='text-[0.9rem] mt-2'>
                  {numeral(views).format('0.a')} Views • 
                  {moment(publishedAt).fromNow()}
               </div>
            )}

            {(searchScreen || subScreen) && (
               <p className='mt-1 line-clamp-2'>{description}</p>
            )}

            <div className='my-1 d-flex items-center mt-4'>
               {isVideo && (
                  <LazyLoadImage className='w-[36px] h-[36px] rounded-[50%] mr-[0.5rem] cursor-pointer' src={channelIcon?.url} effect='' />
               )}
               <p className='mb-0 text-sm line-clamp-1'>{channelTitle}</p>
            </div>
            {subScreen && (
               <p className='mt-2'>
                  {video.contentDetails.totalItemCount} Videos
               </p>
            )}
         </Col>
      </Row>

      
   )
}

export default VideoHorizontal