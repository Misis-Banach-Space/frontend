import { Typography, Box } from "@mui/material";
// import main from "../assets/myVideos-img.svg";
// import TextField from '@mui/material/TextField';
// import Autocomplete from '@mui/material/Autocomplete';
// import { useState } from "react";

function Home() {
    // const [value, setValue] = useState<string | null>(options[0]);
    // const [inputValue, setInputValue] = useState('');
    return (
        <>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' }, justifyContent: 'space-evenly' }} mt={6} ml={15}>
                <Box sx={{ width: '500px' }} mt={20} >
                    <Typography
                        variant="h1"
                        component="a"
                        sx={{
                            flexGrow: 1,
                            fontFamily: 'PT Sans Caption',
                            fontWeight: 700,
                            fontSize: 50,
                            letterSpacing: '.3rem',
                            color: 'white',
                            textDecoration: 'none',
                        }}
                    >
                        Сайт по категории
                    </Typography>
                    <Box>
                        <Typography variant="body1"
                            sx={{
                                flexGrow: 1,
                                fontFamily: 'Noto Sans',
                                fontWeight: 300,
                                fontSize: 16,
                                color: 'white',
                                textDecoration: 'none',
                                mt: 2
                            }}
                        >
                            Получите список сайтов соответствующий выбранной категории
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{mr: 7}}>

                </Box>
            </Box>
        </>
    );
}

export default Home;