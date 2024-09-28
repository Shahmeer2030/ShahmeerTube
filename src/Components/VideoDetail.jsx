import { Box, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { Link, useParams } from 'react-router-dom';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import { CheckCircle } from '@mui/icons-material';
import Videos from './Videos';
const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const { id } = useParams();
  const [video,  setVideo]= useState([])
  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
      .then((data) => setVideoDetail(data.items[0]))
      .catch((error) => console.error('Error fetching video details:', error));
    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`).then((data)=> setVideo(data.items))  
  }, [id]);

  if (!videoDetail) return <Typography>Loading...</Typography>; // Handle loading state

  const { snippet: { title, channelId, channelTitle } = {}, statistics: { viewCount, likeCount } = {} } = videoDetail || {};

  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: 'column', md: 'row' }}>
        <Box flex={1}>
          <Box sx={{ width: '100%', position: 'sticky', top: '86px' }}>
            <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} className="react-player" controls />
            <Typography variant="h5" fontWeight="bold" p={2} color='white'>
              {title}
            </Typography>
            <Stack direction='row' justifyContent='space-between' sx={{color:'white'}} py={1} px={2}>
              <Link to={`/channel/${channelId}`}>
              <Typography variant={{sm: "subtitle1" ,md:'h6'}} color="white" >
              {channelTitle}
              <CheckCircle sx={{ fontSize:'12px', color:'gray', ml:'5px'}}/>
            </Typography>
              </Link>
              <Stack direction="row" gap="20px" alignItems='center'>
              <Typography variant="body1" sx={{ opacity: 0.7}}>{parseInt(viewCount).toLocaleString()} views</Typography>
              <Typography variant="body1" sx={{ opacity: 0.7}}>{parseInt(likeCount).toLocaleString()} likes

              </Typography>
            </Stack>
           </Stack>
          </Box>
        </Box>
        <Box  px={2} py={{ md: 1,xs:5}} justifyContent='center' alignItems='center'>
        <Videos videos={video} direction='column'/>
      </Box>
      </Stack>
     
    </Box>
  );
};

export default VideoDetail;
