import { Container, Typography, Box, IconButton, Backdrop } from '@mui/material'
import { BarLoader } from "react-spinners";
// import DrawBlob, { BlobType } from 'node_modules';
import { useState, useEffect } from 'react'
import { Blob } from 'react-blob'
import { CSSTransition } from "react-transition-group";
import logo from "../assets/logo_with_text.svg";

const texts = ["Осталось совсем чуть-чуть", "Скоро случится чудо", "Магия на подходе", 'Ты уже почти у цели!', "Все приходит вовремя для того, кто умеет ждать )"];

const LoadingScreen = () => {
    const [text, setText] = useState("Придется немного подождать)");

    useEffect(() => {
        const interval = setInterval(() => {
            setText(texts[Math.floor(Math.random() * texts.length)]);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    function getRandomNumber(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }

    function createMultipleBlobs(numberOfBlobs: number) {
        let blobs = [];

        for (let i = 0; i < numberOfBlobs; i++) {
            let size = getRandomNumber(25, 35) + 'vh';
            let top = `${getRandomNumber(-5, 8) * i + 50}%`;
            let right = `${23 * i}%`; // shift to the right by a random amount

            blobs.push(<Blob size={size}
                style={{
                    position: 'absolute',
                    top: `${top}`,
                    right: `${right}`,
                    zIndex: 999,
                    backgroundColor: '#F3CF8E',
                    color: 'white',
                    opacity: 0.4,
                    fontSize: `${size}`,
                }}
            />);
        }
        return blobs;
    }
    return (
        <>
            <Container className="gradientSection" fixed={true} style={{ maxWidth: "100%", height: "100%", padding: 0, position: 'relative' }}
                sx={{
                    backgroundImage: 'linear-gradient(184deg, #1F1B4C 9.74%, #0785CE 50.52%, #2091D3 77.08%, #2091D3 96.34%);'
                }}>
                <IconButton href="/"
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2, ml: 1 }}
                >
                    <img width="40px" height="40px" src={logo} alt="logo" style={{ width: '239px', height: '77px' }}/>
                </IconButton>
                <Container sx={{
                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                    mt: 6
                }}>
                    <Box style={{ display: 'flex' }} justifyContent={'center'} flexDirection={'column'} alignItems={'center'}>
                        <Typography
                            variant="h1"
                            component="a"
                            sx={{
                                flexGrow: 1,
                                fontFamily: 'PT Sans Caption',
                                fontWeight: 700,
                                fontSize: 50,
                                letterSpacing: '.3rem',
                                color: '#FFFFFF',
                                textDecoration: 'none',
                            }}
                        >
                            Ошибка Авторизации
                        </Typography>
                        <Box style={{ marginTop: '30px' }}>
                            {/* <BounceLoader aria-setsize={50} color={'#F3CF8E'} /> */}
                            <BarLoader aria-setsize={50} color={'#F3CF8E'} />
                        </Box>
                        <CSSTransition
                            in={true}
                            appear={true}
                            timeout={3000}
                            classNames="fade"
                        >
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
                                {text}
                            </Typography>
                        </CSSTransition>
                        {/* <Typography variant="body1"
                            sx={{
                                flexGrow: 1,
                                fontFamily: 'Noto Sans',
                                fontWeight: 300,
                                fontSize: 16,
                                color: 'white',
                                textDecoration: 'none',
                                mt: 2
                            }}
                            style={{ opacity: index >= 0 && index < texts.length && index % 2 == 0 ? 1 : 0.5, transition: "opacity 0.1s ease" }}
                        >
                            {texts[index]}
                            {/* Осталось совсем чуть-чуть */}
                        {/* </Typography> */}
                        {createMultipleBlobs(6)}
                    </Box>
                </Container>
                {/* <Blob size="50vh"
                    style={{
                        position: 'absolute',
                        top: '80%',
                        right: '20%',
                        zIndex: 999,
                        backgroundColor: '#F3CF8E',
                        color: 'white',
                        opacity: 0.4,
                        fontSize: '50vh',
                    }}
                /> */}
            </Container >
        </>
    )
}

function LoadingWrap() {
    return (
        <Backdrop open={true}
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
            <LoadingScreen/>
        </Backdrop>
    );
}

export default LoadingWrap

// https://dev.to/phandangkhoa96/a-blob-animation-can-make-your-website-more-lively-58p5