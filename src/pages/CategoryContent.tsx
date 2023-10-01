import { Box, Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useState } from "react";
import ApiService from "../services/api";
import CategoryTable from '../components/CategoryTable'


const options = ['Бизнес', 'Бытовая техника', 'Еда и напитки', 'Животные', 'Канцелярские товары', 'Красота и здоровье', 'Недвижимость', 'Образование', 'Одежда, обувь и аксессуары', 'Отдых и путешествия', 'Подарки и цветы', 'Работа', 'Развлечения и досуг', 'Сельскохозяйственное оборудование и техника', 'Семья и дети', 'Спорт', 'Строительство, обустройство и ремонт', 'Телеком', 'Транспорт', 'Финансы', 'Электроника']

function Home() {
    const [value, setValue] = useState<string | null>(options[0]);
    const [inputValue, setInputValue] = useState('');
    const [dataFetched, setDataFetched] = useState(false);
    const [websiteCategory, setwebsiteCategory] = useState('')
    const [websiteTheme, setwebsiteTheme] = useState('')
    const [websiteUrl, setwebsiteUrl] = useState('')

    const combinedData: string[][] = [];
    if (websiteTheme !== 'unmatched') {
      combinedData.push([websiteUrl, websiteCategory, websiteTheme])
    }

    async function handleSubmit() {
        if(value){
            try {
                let response = await ApiService.getWebsiteByCategory(value);
                setDataFetched(true)
                setwebsiteUrl(response.data.url)
                setwebsiteCategory(response.data.category)
                setwebsiteTheme(response.data.theme)
                console.log(response.data)
            } catch (error) {
                console.log(error)
            }
        }
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
            {dataFetched &&
                            <Box>
                            <CategoryTable data={combinedData}/>
                        </Box>}
        </>
    );
}

export default Home;