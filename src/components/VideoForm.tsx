import { Paper, TextField, Typography, Box, Button, InputAdornment } from "@mui/material";
import { useState } from 'react'
import ApiService from "../services/api";
import DownloadIcon from '@mui/icons-material/Download';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useNavigate } from "react-router-dom";
import { observer } from 'mobx-react';
import LocalStorage from '../LocalStorage';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
// import ArrayStore from "../ArrayStore";
import { sessionArray1, sessionArray2 } from '../SessionStorage';

const VideoForm = observer(() => {
    const navigate = useNavigate();
    const [linkArr, setLinkArr] = useState<string[]>([]);
    const [error3, setError3] = useState(false);
    const [helperText3, setHelperText3] = useState('');
    const [diasableButton, setdisableButton] = useState(false)

    function isDomainOnlyUrl(url: string): boolean {
        const pattern = /^(http|https):\/\/[^\/]*\/?$/;
        return pattern.test(url);
    }
    const handleMultipleLinksChange = (event: any) => {
        const inputText = event.target.value;
        const lines = inputText.split('\n')
        let linkSet = new Set<string>();

        const urlRegex = /^(https?|http):\/\/[^\s/$.?#].[^\s]*$/i;
        for (let line of lines) {
            line = line.trim()
            if (
                urlRegex.test(
                    line
                ) && line.match(/http/g).length === 1
            ) {
                setError3(false);
                setHelperText3('');
                setdisableButton(false)
                console.log(line)
                linkSet.add(line);

            } else {
                setError3(true);
                setdisableButton(true);
                setHelperText3('Неверный формат ввода ссылки. Вводите каждую ссылку с новой строки');
            }
        }
        setLinkArr(Array.from(linkSet));
    }

    function formatTime(date: any) {
        let localDate = date.toLocaleString();
        let parts = localDate.split(/[\s,\/:]+/);
        let day = parts[1].padStart(2, '0');
        let month = parts[0].padStart(2, '0');
        let year = parts[2].substr(-2);
        let hours = parts[3].padStart(2, '0');
        let minutes = parts[4];
        let formattedDate = `${day}.${month}.${year} ${hours}:${minutes}`;
        return formattedDate;
    }

    // handle submit
    async function handleSubmit() {
        let errorEmpty = false;
        // check if link valid
        if (!linkArr) {
            setError3(true);
            errorEmpty = true;
            setdisableButton(true)
            setHelperText3("Введите ссылки на сайты. Каждая ссылка в новой строке");
        } else {
            setError3(false);
            errorEmpty = false;
            setHelperText3("");
            setdisableButton(false);
        }
        if (!error3 && !errorEmpty) {
            let sites = [];
            let pages = [];
            for (let i = 0; i < linkArr.length; i++) {
                if (isDomainOnlyUrl(linkArr[i])) {
                    if (linkArr[i].endsWith("/")) {
                        linkArr[i] = linkArr[i].slice(0, -1);
                    }
                    linkArr[i] = linkArr[i].trim();
                    console.log(linkArr[i], '12345678')
                    try {
                        let response = await ApiService.createSite({
                            url: linkArr[i],
                        });
                        console.log(response)
                        if (response.status === 201) {
                            console.log("siteeeeeee", response.data);
                        }
                        sites.push({ data: response.data, timestamp: formatTime(new Date()), url: linkArr[i] });
                    } catch (error) {
                        let response = await ApiService.checkSiteUrl({
                            url: linkArr[i],
                        });
                        console.log(response)
                        if (response.status === 200) {
                            console.log("siteeeeeee exists", response.data);
                        }
                        sites.push({ data: response.data.id, timestamp: formatTime(new Date()), url: linkArr[i] });
                        console.log(error)
                    }
                }
                else {
                    if (linkArr[i].endsWith("/")) {
                        linkArr[i] = linkArr[i].slice(0, -1);
                    }
                    linkArr[i] = linkArr[i].trim();
                    try {
                        let response = await ApiService.createSubPage({
                            url: linkArr[i],
                        });
                        console.log(response)
                        if (response.status === 201) {
                            console.log("paaaaaaage", response.data);
                        }
                        pages.push({ data: response.data, timestamp: formatTime(new Date()), url: linkArr[i] });
                    } catch (error) {
                        let response = await ApiService.checkPageUrl({
                            url: linkArr[i],
                        });
                        console.log(response)
                        if (response.status === 200) {
                            console.log("page exists", response.data);
                        }
                        pages.push({ data: response.data.id, timestamp: formatTime(new Date()), url: linkArr[i] });
                        console.log(error)
                    }
                }
            }
            if(sites.length + pages.length === linkArr.length && linkArr.length !== 0) navigate(`myVideos`);
            // if (sites.length + pages.length === linkArr.length) navigate(`myVideos`);
            LocalStorage.updateArrays(sites, pages);
            // ArrayStore.updateArraysLater(sites, pages)
            sessionArray1.set(sites);
            sessionArray2.set(pages);
        }
    }

    const [selectedFile, setSelectedFile] = useState(null);
    const [errorText, setErrorText] = useState('');
    const [textFieldDisabled, setTextFieldDisabled] = useState(false);

    const handleFileInputChange = (e: any) => {
        const file = e.target.files[0];
        if (!file) {
            setSelectedFile(null);
            setErrorText('');
            return;
        }
        const allowedExtensions = ['.csv', '.xlsx', '.xlsm'];
        const fileExtension = file.name.split('.').pop();
        if (!allowedExtensions.includes(`.${fileExtension}`)) {
            setSelectedFile(null);
            setErrorText('Неверный формат, пожалуйста загрузите файл типа: .csv, .xlsx, or .xlsm');
            return;
        }
        setSelectedFile(file);
        setErrorText('');
        setTextFieldDisabled(true)
        setdisableButton(false)
    }
    // async function handleFileUpload(event: any){
    //     const file = event.target.files[0];
    //     if (file) {
    //         const fileExtension = file.name.split('.').pop().toLowerCase();
        
    //         if (fileExtension === 'csv' || fileExtension === 'xlsx') {
    //           try {
    //             const urls = await parseFileAndGetUrls(file, fileExtension);
    //             if (urls.length > 0) {
    //               await processUrls(urls);
    //             } else {
    //               console.error('No valid URLs found in the file.');
    //             }
    //           } catch (error) {
    //             console.error('Error parsing the file:', error);
    //           }
    //         } else {
    //           console.error('Unsupported file format. Please select a .csv or .xlsx file.');
    //         }
    //       }
    // }
    // async function parseFileAndGetUrls(file, fileExtension) {
    //     if (fileExtension === 'csv') {
    //       const csvData = await parseCsv(file);
    //       return csvData.map((row) => row.url);
    //     } else if (fileExtension === 'xlsx') {
    //       const xlsxData = await parseXlsx(file);
    //       return xlsxData.map((cell) => cell.url);
    //     }
    //   }

    //   async function parseCsv(file) {
    //     return new Promise((resolve, reject) => {
    //       const results = [];
      
    //       fs.createReadStream(file)
    //         .pipe(csv())
    //         .on('data', (row) => {
    //           // Assuming your CSV file has a header row with a column named 'url'
    //           const url = row.url;
    //           if (url && isURLValid(url)) { // You can implement isURLValid to check if the URL is valid
    //             results.push({ url });
    //           }
    //         })
    //         .on('end', () => {
    //           resolve(results);
    //         })
    //         .on('error', (error) => {
    //           reject(error);
    //         });
    //     });
    //   }


    return (
        <Box flexDirection={'column'} alignItems='center' justifyContent="center" sx={{ display: 'flex' }}>
            <Paper elevation={6}
                sx={{ mt: 5, ml: 8 }}
                style={{
                    width: '600px', minHeight: '310px', borderRadius: '30px'
                }}>
                <Typography variant="h2"
                    sx={{
                        textAlign: 'center',
                        mr: 2,
                        mt: 1,
                        pt: 4,
                        flexGrow: 1,
                        fontFamily: 'PT Sans Caption',
                        fontWeight: 700,
                        fontSize: '28px',
                        color: '#4094AC',
                        textDecoration: 'none',
                    }}
                >
                    Определите категорию сайтов
                </Typography>
                <Box display="flex" alignItems="center" justifyContent="center" flexDirection={'column'} sx={{ mt: 3 }}>
                    <TextField multiline rows={6} onChange={handleMultipleLinksChange} error={error3} helperText={helperText3} disabled={textFieldDisabled}
                        id="outlined-basic" label="Ввелите ссылки(каждая ссылка с новой строки)" variant="outlined" sx={{ mt: 1, width: '460px' }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <DownloadIcon sx={{ color: '#4094AC' }} />
                                    <input
                                        type="file"
                                        id="fileInput"
                                        style={{ display: 'none' }}
                                        accept=".csv, .xlsx, .xlsm"
                                        onChange={handleFileInputChange}
                                    />
                                </InputAdornment>
                            ),
                        }} />
                    <label htmlFor="fileInput">
                        <Button sx={{ mt: 1, mb: 2 }}
                            component="span"
                            variant="outlined"
                            color="secondary"
                            startIcon={<CloudUploadIcon />}

                        >
                            Upload Files
                        </Button>
                    </label>
                    <Typography variant="body2" color="error">
                        {errorText}
                    </Typography>
                    {selectedFile && (
                        <Paper elevation={3} sx={{ mb: 2, padding: '10px', display: 'flex', alignItems: 'center' }}>
                            <InsertDriveFileIcon sx={{ fontSize: 20, marginRight: '10px', color: '#4094AC' }} />
                            <Typography variant="body2">Выбранный файл: {selectedFile.name}</Typography>
                        </Paper>
                    )}
                </Box>
            </Paper>
            <Button disabled={diasableButton} onClick={handleSubmit} className="gradientButton" style={{ borderRadius: '20px', color: 'white' }} sx={{ mt: 2, ml: 'auto', mr: 'auto' }}>Сгенерировать</Button>
        </Box>
    )
});

export default VideoForm
