import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Button, Typography, Box, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import Divider from '@mui/material/Divider';
const publicLink = "/src/assets/publication.jpg";

interface Props {
    link: string;
    title: string;
    category: string;
    site_id: number;
    page_id: number;
    theme: string;
    time: string;
}

export default function VideoCard(props: Props) {
    const [isReady, setIsReady] = useState(false);
    const { link, title, category, site_id, page_id, theme, time } = props;


    useEffect(() => {
        if (status === "processing") setIsReady(false);
    }, []);

    let source = `/article/${site_id}`;
    return (
        <Card sx={{ maxWidth: 1000, boxShadow: '0px 0px 10px 5px rgba(0,0,0,0.3)', borderRadius: '15px', mt: 2, mb: 10, ml: 'auto', mr: 'auto' }} >
            <CardContent style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box style={{ display: "flex", flexDirection: "column", flexWrap: 'wrap' }}>
                    <Box display='flex' justifyContent={'center'} alignItems='center' sx={{maxWidth: '240px', mb: 2,}}>
                        <Typography
                            variant="h2"
                            component="a"
                            sx={{
                                flexGrow: 1,
                                fontFamily: 'PT Sans Caption',
                                fontWeight: 400,
                                ml: 2,
                                mr: 2,
                                fontSize: 12,
                                color: '#333',
                                textDecoration: 'none',
                            }}
                        >
                            Время создания</Typography>
                        |
                        <Typography
                            variant="h2"
                            component="a"
                            sx={{
                                flexGrow: 1,
                                fontFamily: 'PT Sans Caption',
                                fontWeight: 400,
                                ml: 2,
                                fontSize: 12,
                                color: '#333',
                                textDecoration: 'none',
                            }}
                        >
                            {time}
                        </Typography>
                    </Box>
                    <Typography
                        variant="h1"
                        component="a"
                        sx={{
                            flexGrow: 1,
                            fontFamily: 'PT Sans Caption',
                            fontWeight: 600,
                            fontSize: 24,
                            ml: 2,
                            letterSpacing: '.3rem',
                            backgroundImage:
                                'linear-gradient(178deg, #FD749B -13.56%, #281AC8 158.3%)',
                            WebkitBackgroundClip: 'text',
                            color: 'transparent',
                            textDecoration: 'none',
                            flexWrap: 'wrap',
                            maxWidth: '600px',
                            wordWrap: 'break-word',
                        }}>
                        {link}
                    </Typography>
                    <Box sx={{display: 'flex', justifyContent: 'space-evenly'}}>

                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="h2"
                                sx={{
                                textAlign: 'center',
                                mr: 2,
                                mt: 1,
                                pt: 4,
                                flexGrow: 1,
                                fontFamily: 'PT Sans Caption',
                                fontWeight: 700,
                                fontSize: '18px',
                                color: '#281ac8',
                                textDecoration: 'none',
                                }}
                            >
                                Категория
                            </Typography>
                            <Typography variant="h2"
                                sx={{
                                textAlign: 'center',
                                mr: 2,
                                pt: 2,
                                flexGrow: 1,
                                fontFamily: 'PT Sans Caption',
                                fontWeight: 700,
                                fontSize: '18px',
                                color: '#585757',
                                textDecoration: 'none',
                                }}
                            >
                                {category}
                            </Typography>
                        </Box>


                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="h2"
                                sx={{
                                textAlign: 'center',
                                mr: 2,
                                mt: 1,
                                pt: 4,
                                flexGrow: 1,
                                fontFamily: 'PT Sans Caption',
                                fontWeight: 700,
                                fontSize: '18px',
                                color: '#281ac8',
                                textDecoration: 'none',
                                }}
                            >
                                Тематика
                            </Typography>
                            <Typography variant="h2"
                                sx={{
                                textAlign: 'center',
                                mr: 2,
                                pt: 2,
                                flexGrow: 1,
                                fontFamily: 'PT Sans Caption',
                                fontWeight: 700,
                                fontSize: '18px',
                                color: '#585757',
                                textDecoration: 'none',
                                }}
                            >
                                {theme}
                            </Typography>
                        </Box>
                    </Box>

                    {category === "" &&
                              <Typography variant="body1"
                              sx={{
                                  flexGrow: 1,
                                  fontFamily: 'Noto Sans',
                                  fontWeight: 400,
                                  fontSize: 14,
                                  color: '#151515',
                                  textDecoration: 'none',
                                  mt: 2,
                                  ml: 2,
                              }}
                          >
                    Запрос находится в обработке
                    </Typography>}
                </Box>
                <Box sx={{ pt: 4 }}>
                    <img src={publicLink} alt="Kokos Hackathon" width="166px"></img>
                </Box>
            </CardContent>
            {isReady &&
                (<CardActions style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                    <Button className="gradientButton" href={source} style={{ borderRadius: '20px', color: 'white' }} sx={{ mt: 'auto', mb: 2, ml: 1, mr: 1 }}>Подробнее</Button>
                </CardActions>)
            }
        </Card>
    );

}
