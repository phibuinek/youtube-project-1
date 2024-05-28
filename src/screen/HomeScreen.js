import React, { useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import CategoriesBar from '../components/CategoriesBar';
import Video from '../components/Video';
import { useDispatch, useSelector } from 'react-redux';
import { getPopularVideos, getVideosByCategory } from '../redux/actions/videos.action';
import InfiniteScroll from 'react-infinite-scroll-component';
import Skeleton from 'react-loading-skeleton';

const HomeScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPopularVideos());
  }, [dispatch]);

  const { videos, activeCategory, loading } = useSelector(state => state.homeVideos);

  const fetchData = () => {
    if (activeCategory === "All") {
      dispatch(getPopularVideos());
    } else {
      dispatch(getVideosByCategory(activeCategory));
    }
  };

  return (
    <Container className='no-scrollbar scrollbar-y'>
      <CategoriesBar />
      <InfiniteScroll
        dataLength={videos.length}
        next={fetchData}
        hasMore={true}
        loader={<div className='spinner-border text-danger d-block mx-auto '></div>}
        className='row no-scrollbar'
        scrollThreshold={0.9} // Đặt mức độ cuộn để gọi hàm next khi đạt được 90% cuộn
      >
        {!loading
          ? videos.map(video => (
            <Col lg={3} md={4} key={video.id}>
              <Video video={video} />
            </Col>
          ))
          : [...Array(20)].map((_, index) => (
            <Col lg={3} md={4} key={index}>
              <Skeleton />
            </Col>
          ))}
      </InfiniteScroll>
    </Container>
  );
};

export default HomeScreen;
