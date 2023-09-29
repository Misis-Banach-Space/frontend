import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from "react"

const imgLink = "/src/assets/background_card.jpg";

interface Props {
    link: string;
    title: string;
    status: string;
    id: number;
    isPublic: boolean;
}

export default function VideoCard(props: Props) {
    const [isReady, setIsReady] = useState(true);
    const { link, title, status, id, isPublic } = props;


    useEffect(() => {
        if (status === "processing") setIsReady(false);
    }, []);

    let source = ''
    if (!isPublic) source = `/article/${id}`;
    else source = `/articlePublic/${id}`;

    return (
        <Card sx={{ maxWidth: 700, boxShadow: '0px 0px 10px 5px rgba(0,0,0,0.3)', borderRadius: '15px', mt: 2, mb: 10, ml: 'auto', mr: 'auto' }} >
            <CardMedia
                sx={{ height: 400 }}
                image={imgLink}
                title="green iguana"
            />
            <CardContent style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                <Typography
                    variant="h1"
                    component="a"
                    sx={{
                        flexGrow: 1,
                        fontFamily: 'PT Sans Caption',
                        fontWeight: 700,
                        fontSize: 32,
                        letterSpacing: '.3rem',
                        color: '#550C64',
                        textDecoration: 'none',
                    }}
                >
                    {title}
                </Typography>
                <Link to={link} target="_blank">
                    <Typography variant="body1"
                        sx={{
                            flexGrow: 1,
                            fontFamily: 'Noto Sans',
                            fontWeight: 300,
                            fontSize: 16,
                            color: '#333',
                            textDecoration: 'none',
                            mt: 2,
                            ml: 2
                        }}
                    >
                        {link}
                    </Typography>
                </Link>
                <Typography variant="body1"
                    sx={{
                        flexGrow: 1,
                        fontFamily: 'Noto Sans',
                        fontWeight: 400,
                        fontSize: 25,
                        color: '#333',
                        textDecoration: 'none',
                        mt: 2,
                        ml: 2
                    }}
                >
                    {status === "processing" && 'Видео находится в обработке'}
                    {status === "ready" && 'Статья сгенерирована'}
                </Typography>
            </CardContent>
            {isReady &&
                (<CardActions style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                    <Button className="gradientButton" href={source} style={{ borderRadius: '20px', color: 'white' }} sx={{ mt: 'auto', mb: 2, ml: 1, mr: 1 }}>Подробнее</Button>
                </CardActions>)
            }
        </Card>
    );
}
