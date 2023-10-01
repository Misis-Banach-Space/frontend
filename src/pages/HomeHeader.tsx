import { Button, Typography, Box } from "@mui/material";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";


import VideoForm from "../components/VideoForm";

function Home() {
    const [isBoxVisible, setIsBoxVisible] = useState(true);
    const navigate = useNavigate();


    const handleClick = () => {
      setIsBoxVisible(false);
    };

    return (
        <>
            <Box maxWidth="1200px" sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' }, justifyContent: 'flex-start' , margin: '0 auto'}}>
            {isBoxVisible ? (
                <Box sx={{ width: '760px' }} mt={15} ml={10}>
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
                        Узнай всё о сайте <br></br>в один клик
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
                            Платформа позволяет по ссылке на сайт определять <br></br>
                            его пренадлежность к категории и получать детальный анализ
                        </Typography>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } , margin: '0 auto', width: '700px', position: 'absolute', left: 0, right: 0}}>
                        <Button className="gradientButton" style={{ borderRadius: '20px', color: 'white', fontWeight: '700'}} sx={{ mt: 5 , mr: 5}} onClick={handleClick}>Анализ сайтов</Button>
                        <Button className="gradientButton" style={{ borderRadius: '20px', color: 'white', fontWeight: '700'}} sx={{ mt: 5 }} onClick={() => navigate(`categories`)}>Сайты по категории</Button>
                    </Box>
                </Box> ) : (<VideoForm />) }
            </Box>
        </>
    );
}

export default Home;

