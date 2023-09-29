// create a card component for item with fields: name, image, price, and button
// use the card component in the home page
import {
    Button,
    Card as MuiCard,
    CardHeader,
    CardContent,
    CardMedia,
    Typography,
    Avatar,
} from "@mui/material";

interface CardProps {
    key: string;
    id: number;
    name: string;
    description: string;
    logo: string;
    image: string;
}

function Card(props: CardProps) {
    console.log(props);
    return (
        <MuiCard variant="outlined" sx={{ maxWidth: 300 }}>
            <CardHeader
                avatar={
                    <Avatar
                        sx={{}}
                        aria-label={props.name}
                        src={props.logo}
                    ></Avatar>
                }
                title={<Typography variant="h5">{props.name} </Typography>}
            ></CardHeader>
            <CardContent sx={{ m: 2 }}>
                <CardMedia component="img" height="150" image={props.image} />
                <Typography variant="subtitle2">{props.description}</Typography>
                <Typography>{props.id}</Typography>
            </CardContent>
            {/* center Button inside MuiCard */}
            <Button
                onClick={() => console.log("clicked")}
                variant="contained"
                sx={{ m: 2 }}
            >
                Add to Cart
            </Button>
        </MuiCard>
    );
}

export default Card;
