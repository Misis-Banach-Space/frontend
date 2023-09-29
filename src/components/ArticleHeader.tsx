import { useParams } from "react-router-dom";
import ApiService from "../services/api";
import { useEffect, useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import YouTubeIcon from '@mui/icons-material/YouTube';

const article = {
    title: 'Сгенерированная Статья',
    video_link: 'https://www.youtube.com/watch?v=Ta6pNPK3wig&t=2s',
    date: '24.06.2023',
    html_data: ''
}

function ArticleHeader() {

    return (
        <>
            <Box sx={{margin: '0 auto', width: 'fit-content'}}>
                <Typography
                            variant="h2"
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
                            Анализ сайта
                </Typography>
            </Box>
        </>
    );
}

export default ArticleHeader;