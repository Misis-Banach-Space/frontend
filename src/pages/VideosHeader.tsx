import { Typography, Box } from "@mui/material";
import main from "../assets/myVideos-img.svg";

function Home() {
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
                        Мои Видео
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
                            Каталог статей, сгенерированных вами по видео
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{mr: 7}}>
                    <img src={main} alt="AI generating summary from video" width="458px" height="465px"></img>
                </Box>
            </Box>
        </>
    );
}

export default Home;