import { Container } from "@mui/material";
import { useState, useEffect } from "react";
import VideoCard from "../components/VideoCard";
import { Pagination } from "@mui/material";
// import ApiService from "../services/api";


const article = {
    title: 'Запрос',
    video_link: 'https://www.youtube.com/watch?v=Ta6pNPK3wig&t=2s',
    date: '24.06.2023',
    html_data: ''
}

interface MyObject {
    title: string;
    video_link: string;
    date: string;
    html_data: string;
  }
  

const day = [ article ]

const videosPerPage = 3;

function VideoContent() {
    const [page, setPage] = useState(1);
    const [dataRecords, setDataRecords] = useState<MyObject[]>([]);
    // const [count, setCount] = useState(0)

    const handlePageChange = (
        event: React.ChangeEvent<unknown>,
        value: number
    ) => {
        setPage(value);
        console.log(event)
    };

    useEffect(() => {
        setDataRecords(day)
        // const fetchData = async () => {
        //   const data: any = await ApiService.getAllRecords({ limit: 100, offset: 0 });
        //   setDataRecords(data);
        // };
        // fetchData();
        // const interval = setInterval(() => {
        //   fetchData();
        //   setCount(count + 1);
        // }, 5000);
        // return () => clearInterval(interval);
      }, []);

    return (
        <>
            <Container>
                {dataRecords.map((video: any) => (
                    <VideoCard link={video.video_link} title={video.title} status={video.status} id={video.id} isPublic={false}/>
                ))}
                <Pagination
                    count={Math.ceil(dataRecords.length / videosPerPage)}
                    page={page}
                    onChange={handlePageChange}
                    sx={{ pl: 'auto', pb: 'auto' }}
                />
            </Container>
        </>
    );
}

export default VideoContent;