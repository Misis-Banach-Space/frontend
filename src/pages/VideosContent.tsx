import { Container, Box, Button } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import VideoCard from "../components/VideoCard";
import { Pagination } from "@mui/material";
import LocalStorage from '../LocalStorage';
import ApiService from "../services/api";
// import { autorun } from 'mobx';
import { toJS } from 'mobx';
import { sessionArray1, sessionArray2 } from '../SessionStorage';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx'


const article = {
    title: 'Запрос',
    video_link: 'https://misis.ru/',
    date: '30.09.2023',
    html_data: '',
    id: 3,
}

interface MyObject {
    title: string;
    video_link: string;
    date: string;
    html_data: string;
    id: number,
}

const day = [article]
const videosPerPage = 3;

function getSiteFromPage(page: string) {
    let parsedUrl = new URL(page);
    return parsedUrl.origin
}

function VideoContent() {
    const [page, setPage] = useState(1);
    const [updateRequest, setUpdateRequest] = useState(false);
    const [siteRecords, setSiteRecords] = useState<any[]>([]); 
    const [pageRecords, setPageRecords] = useState<any[]>([]);
    const [pageRecordsCount, setPageRecordsCount] = useState(0);
    const [siteRecordsCount, setSiteRecordsCount] = useState(0); 
    const [siteRequest, setSiteRequest] = useState<{ data: any; timestamp: string; url: string }[]>(LocalStorage.array1);
    const [pageRequest, setPageRequest] = useState<{ data: any; timestamp: string; url: string }[]>(LocalStorage.array2);
    const isFirstRender = useRef(true);




    
    useEffect(() => {
        // Retrieve data from session storage
        const storedArray1 = sessionArray1.get();
        const storedArray2 = sessionArray2.get();

        setSiteRequest(toJS(storedArray1));
        setPageRequest(toJS(storedArray2));
    }, []);

    useEffect(() => {
        let timerId: any;
        if (typeof (EventSource) !== "undefined") {
            var source = new EventSource("http://larek.itatmisis.ru:12347/api/v1/websites/sse_update");
            source.onmessage = function (event) {
                console.log(event.data);
                clearTimeout(timerId);
                timerId = setTimeout(() => {
                    console.log('timeout')
                    console.log(updateRequest)
                    setUpdateRequest(prevValue => {
                        return !prevValue;
                    });
                }, 2000);
            };
        }
        return () => clearTimeout(timerId);
    }, []);
    

    useEffect(() => {
        
        let sites: any = [];
        let pages: any = [];
        let allSitesFromPages: any = [];

        let set = new Set<string>();

        for (let i = 0; i < pages.length; i++) {
            let site = getSiteFromPage(pages[i].url);
            set.add(site);
        }
        allSitesFromPages = Array.from(set);

        // if (typeof (EventSource) !== "undefined") {
        //     var source = new EventSource("http://larek.itatmisis.ru:12347/api/v1/websites/sse_update");
        //     source.onmessage = function (event) {
        //         console.log(event.data)
        //         // setUpdateRequest(true);
        //     };
        // }
        console.log('HEREEEEE')
        const fetchData1 = async () => {
            const storedArray1 = sessionArray1.get();
            for (let i = 0; i < storedArray1.length; i++) {
                let id = Number(String(storedArray1[i].data));
                        
                try {
                    let response = await ApiService.getWebsiteById(id);
                    sites.push(response.data);
                } catch (error) {
                    console.log(error);
                }
            }
            setSiteRecords(sites);
        };
        fetchData1();

        const fetchData2 = async () => {
            const storedArray2 = sessionArray2.get();
            for (let i = 0; i < storedArray2.length; i++) {
                let id = Number(String(storedArray2[i].data));
                try {
                    let response = await ApiService.getPageById(id);
                    pages.push(response.data);
                } catch (error) {
                    console.log(error);
                }
            }
            setPageRecords(pages);
        };
        fetchData2();
    }, [updateRequest]);

    //making CombinedData
    const newData = [...siteRecords, ...pageRecords]
    const combinedData = newData.map(it => [
        it.url, 
        it.category, 
        it.theme
    ])
    console.log(combinedData)
    //making CombinedData

    //Downloading
    const handleDownload = (format: 'csv' | 'json' | 'xlsx') => {
        if (format === 'csv') {
            const csvContent = combineDataToCSV(combinedData);
            downloadFile(csvContent, 'data.csv', 'text/csv');
        } else if (format === 'json') {
            const jsonData = combineDataToJSON(combinedData);
            downloadFile(JSON.stringify(jsonData, null, 2), 'data.json', 'application/json');
        } else if (format === 'xlsx') {
            const workbook = XLSX.utils.book_new();
            const worksheet = XLSX.utils.json_to_sheet(combinedData);
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
            const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
            const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            saveAs(data, 'data.xlsx');
        }
    };
    const combineDataToCSV = (data: string[][]) => {
        return data.map((row) => row.join(',')).join('\n');
    };
    const combineDataToJSON = (data: string[][]) => {
        return data.map((row) => ({ url: row[0], category: row[1], theme: row[2] }));
    };
    const downloadFile = (content: string, fileName: string, mimeType: string) => {
        const blob = new Blob([content], { type: mimeType });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
    }
    //Downloading

    return (
        <>
            <Container>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2, mb: 4}}>
                    <Button variant="contained" color="secondary" onClick={() => handleDownload('csv')} >CSV</Button>
                    <Button variant="contained" color="secondary" onClick={() => handleDownload('json')} >JSON</Button>
                    <Button variant="contained" color="secondary" onClick={() => handleDownload('xlsx')}>XLSX</Button>
                </Box>
                {siteRecords.map((site: any) => {
                    let siteObj = siteRequest.find(obj => obj.data === site.id);
                    let timestamp = siteObj ? siteObj.timestamp : '';

                    return (
                        <VideoCard
                            link={site.url}
                            title={''}
                            category={site.category}
                            site_id={site.id}
                            page_id={0}
                            time={timestamp}
                            theme={site.theme}
                        />
                    );
                })}

                {pageRecords.map((site: any) => {
                    let siteObj = pageRequest.find(obj => obj.data === site.id);
                    let timestamp = siteObj ? siteObj.timestamp : '';

                    return (
                        <VideoCard
                            link={site.url}
                            title={''}
                            category={site.category}
                            site_id={site.websiteId}
                            page_id={site.id}
                            time={timestamp}
                            theme={site.theme}
                        />
                    );
                })}

            </Container>
        </>
    );
}

export default VideoContent;