import { Paper, TextField, Typography, Box, Button, InputAdornment } from "@mui/material";
import { useState } from 'react'
import ApiService from "../services/api";
import DownloadIcon from '@mui/icons-material/Download';
import { useNavigate } from "react-router-dom";

const VideoForm = () => {
    const navigate = useNavigate();
    const [linkArr, setLinkArr] = useState<string[]>([]);
    const [siteRequest, setSiteRequest] = useState<string[]>([]);
    const [pageRequest, setPageRequest] = useState<string[]>([]);

    // const [lengthAnnotation, setLengthAnnotation] = useState("");
    // const [lengthArticle, setLengthArticle] = useState("");
    // const [timingScreenshot, setTimingScreenshot] = useState("");

    const [error3, setError3] = useState(false);
    const [helperText3, setHelperText3] = useState('');

    function isDomainOnlyUrl(url: string): boolean {
        const pattern = /^(http|https):\/\/[^\/]*\/?$/;
        return pattern.test(url);
    }

    const handleMultipleLinksChange = (event: any) => {
        const inputText = event.target.value;
        const lines = inputText.split('\n')
        let linkArr = [];

        const urlRegex = /^(https?|http):\/\/[^\s/$.?#].[^\s]*$/i;
        for (let line of lines) {
            if (
                urlRegex.test(
                    line
                ) && line.match(/http/g).length === 1
            ) {
                setError3(false);
                setHelperText3('');
                linkArr.push(line);

            } else {
                setError3(true);
                setHelperText3('Неверный формат ввода ссылки. Вводите каждую ссылку с новой строки');
            }
        }
        setLinkArr(linkArr);
    }

    // handle submit
    async function handleSubmit() {
        let errorEmpty = false;
        // check if link valid
        if (!linkArr) {
            setError3(true);
            errorEmpty = true;
            setHelperText3("Введите ссылки на сайты. Каждая ссылка в новой строке");
        } else {
            setError3(false);
            errorEmpty = false;
            setHelperText3("");
        }


        if (!error3 && !errorEmpty) {
            let sites = [];
            let pages = [];
            for(let i = 0; i < linkArr.length; i++){
                if (isDomainOnlyUrl(linkArr[i])) {
                    if (linkArr[i].endsWith("/")) {
                        linkArr[i] = linkArr[i].slice(0, -1);
                    }
                    try {
                        let response = await ApiService.createSite({
                            url: linkArr[i],
                        });
                        console.log(response)
                        if (response.status === 201) {
                            console.log("siteeeeeee", response.data);
                        } 
                        sites.push(response.data);
                    } catch (error) {
                        setError3(true);
                        errorEmpty = true;
                        setHelperText3(`Повторная отправка ссылки ${linkArr[i]}`);
                        console.log(error)
                    }
                }
                else {
                    if (linkArr[i].endsWith("/")) {
                        linkArr[i] = linkArr[i].slice(0, -1);
                    }
                    try {
                        let response = await ApiService.createSubPage({
                            url: linkArr[i],
                        });
                        console.log(response)
                        if (response.status === 201) {
                            console.log("paaaaaaage", response.data);
                        } 
                        pages.push(response.data);
                    } catch (error) {
                        setError3(true);
                        errorEmpty = true;
                        setHelperText3(`Повторная отправка ссылки ${linkArr[i]}`);
                        console.log(error)
                    }
                }
            }
            // if(sites.length + pages.length === linkArr.length && linkArr.length !== 0) navigate(`myVideos`);
            if(sites.length + pages.length === linkArr.length) navigate(`myVideos`);
            setSiteRequest(sites);
            setPageRequest(pages);
        }
    }


    return (
        <Box flexDirection={'column'} alignItems='center' justifyContent="center" sx={{ display: 'flex' }}>
            <Paper elevation={6}
                sx={{ mt: 15, ml: 2 }}
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
                    <TextField multiline rows={6} onChange={handleMultipleLinksChange} error={error3} helperText={helperText3}
                        id="outlined-basic" label="Ввелите ссылки(каждая ссылка с новой строки)" variant="outlined" sx={{ mt: 1, width: '460px' }}

                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <DownloadIcon sx={{ color: '#1F1B4C' }} />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>
            </Paper>
            <Button disabled={error3} onClick={handleSubmit} className="gradientButton" style={{ borderRadius: '20px', color: 'white' }} sx={{ mt: 2, ml: 'auto', mr: 'auto' }}>Сгенерировать</Button>
        </Box>
    )
}

export default VideoForm
