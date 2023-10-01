import { Typography, Box, Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useState } from "react";
import ApiService from "../services/api";


const options = ['Бизнес', 'Бытовая техника', 'Еда и напитки', 'Животные', 'Канцелярские товары', 'Красота и здоровье', 'Недвижимость', 'Образование', 'Одежда, обувь и аксессуары', 'Отдых и путешествия', 'Подарки и цветы', 'Работа', 'Развлечения и досуг', 'Сельскохозяйственное оборудование и техника', 'Семья и дети', 'Спорт', 'Строительство, обустройство и ремонт', 'Телеком', 'Транспорт', 'Финансы', 'Электроника']

function Home() {
    const [value, setValue] = useState<string | null>(options[0]);
    const [inputValue, setInputValue] = useState('');


    async function handleSubmit() {
        // let errorEmpty = false;
        // let Urls = [];
        // if (selectedFile) Urls = uploadedFiles;
        // else Urls = linkArr;
        // // check if link valid
        // if (!linkArr) {
        //     setError3(true);
        //     errorEmpty = true;
        //     console.log('klfsfl')
        //     setdisableButton(true)
        //     setHelperText3("Введите ссылки на сайты. Каждая ссылка в новой строке");
        // } else {
        //     setError3(false);
        //     errorEmpty = false;
        //     setHelperText3("");
        //     setdisableButton(false);
        // }
        // if (!error3 && !errorEmpty) {
        //     let sites = [];
        //     let pages = [];
        //     for (let i = 0; i < Urls.length; i++) {
        //         if (isDomainOnlyUrl(Urls[i])) {
        //             if (Urls[i].endsWith("/")) {
        //                 Urls[i] = Urls[i].slice(0, -1);
        //             }
        //             Urls[i] = Urls[i].trim();
        //             try {
        //                 let response = await ApiService.createSite({
        //                     url: Urls[i],
        //                 });
        //                 sites.push({ data: response.data, timestamp: formatTime(new Date()), url: Urls[i] });
        //             } catch (error) {
        //                 let response = await ApiService.checkSiteUrl({
        //                     url: Urls[i],
        //                 });
        //                 sites.push({ data: response.data.id, timestamp: formatTime(new Date()), url: Urls[i] });
        //             }
        //         }
        //         else {
        //             if (Urls[i].endsWith("/")) {
        //                 Urls[i] = Urls[i].slice(0, -1);
        //             }
        //             Urls[i] = Urls[i].trim();
        //             try {
        //                 let response = await ApiService.createSubPage({
        //                     url: Urls[i],
        //                 });

        //                 pages.push({ data: response.data, timestamp: formatTime(new Date()), url: Urls[i] });
        //             } catch (error) {
        //                 let response = await ApiService.checkPageUrl({
        //                     url: Urls[i],
        //                 });

        //                 pages.push({ data: response.data.id, timestamp: formatTime(new Date()), url: Urls[i] });

        //             }
        //         }
        //     }
        // }
    }
    return (
        <>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' }, justifyContent: 'space-evenly', width: '700px', margin: '0 auto' }} m={15}>
                <Box sx={{mr: 7}}>
                    <Autocomplete
                        value={value}
                        onChange={(_: any, newValue: string | null) => {
                            setValue(newValue);
                        }}
                        inputValue={inputValue}
                        onInputChange={(_, newInputValue) => {
                            setInputValue(newInputValue);
                        }}
                        id="controllable-states-demo"
                        options={options}
                        sx={{ width: 500 }}
                        renderInput={(params) => <TextField {...params} style={{ backgroundColor: 'white', borderRadius: '5px' }} InputLabelProps={{ shrink: false }} />}
                    />
                </Box>
                    <Button onClick={handleSubmit} className="gradientButton" style={{ borderRadius: '20px', color: 'white' }} sx={{ mt: 0.5, ml: 'auto', mr: 'auto', mb: 2 }}>Найти</Button>
            </Box>
        </>
    );
}

export default Home;