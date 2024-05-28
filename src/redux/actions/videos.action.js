import {
    HOME_VIDEOS_FAIL,
    HOME_VIDEOS_REQUEST,
    HOME_VIDEOS_SUCCESS,
    SEARCH_VIDEOS_FAIL,
    SEARCH_VIDEOS_REQUEST,
    SEARCH_VIDEOS_SUCCESS,
 } from '../actionType'
 
 import request from '../../api'
 
 export const getPopularVideos = () => async (dispatch, getState) => {
    try {
       dispatch({
          type: HOME_VIDEOS_REQUEST,
       })
       const { data } = await request('/videos', {
          params: {
             part: 'snippet,contentDetails,statistics',
             chart: 'mostPopular',
             regionCode: 'US',
             maxResults: 20,
             pageToken: getState().homeVideos.nextPageToken,
          },
       })
 
       dispatch({
          type: HOME_VIDEOS_SUCCESS,
          payload: {
             videos: data.items,
             nextPageToken: data.nextPageToken,
             category: 'All',
          },
       })
    } catch (error) {
       console.log(error.message)
       dispatch({
          type: HOME_VIDEOS_FAIL,
          payload: error.message,
       })
    }
 }
 
 export const getVideosByCategory = keyword => async (dispatch, getState) => {
    try {
       dispatch({
          type: HOME_VIDEOS_REQUEST,
       })
       const { data } = await request('/search', {
          params: {
             part: 'snippet',
             maxResults: 20,
             pageToken: getState().homeVideos.nextPageToken,
             q: keyword,
             type: 'video',
          },
       })
 
       dispatch({
          type: HOME_VIDEOS_SUCCESS,
          payload: {
             videos: data.items,
             nextPageToken: data.nextPageToken,
             category: keyword,
          },
       })
    } catch (error) {
       console.log(error.message)
       dispatch({
          type: HOME_VIDEOS_FAIL,
          payload: error.message,
       })
    }
 }

 export const getVideosBySearch = keyword => async (dispatch, getState) => {
    try {
       dispatch({
          type: SEARCH_VIDEOS_REQUEST,
       })
       const { data } = await request('/search', {
          params: {
             part: 'snippet',
 
             maxResults: 20,
             q: keyword,
             type: 'video,channel',
          },
       })
 
       dispatch({
          type: SEARCH_VIDEOS_SUCCESS,
          payload: data.items
       })
    } catch (error) {
       console.log(error.message)
       dispatch({
          type: SEARCH_VIDEOS_FAIL,
          payload: error.message,
       })
    }
 }