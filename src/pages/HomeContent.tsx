import { Button, Typography, Box } from "@mui/material";
import imgLink from "../assets/siteanalysis.jpg";

function HomeContent() {

    return (
        <>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' }, justifyContent: 'space-evenly' }} mt={10} ml={5}>
                <Box>
                    <img src={imgLink} alt="Kokos Hackathon" width="600px" height="400px"></img>
                </Box>
                <Box sx={{ width: '760px' }} mt={5}>
                    <Typography
                        variant="h1"
                        component="a"
                        sx={{
                            flexGrow: 1,
                            fontFamily: 'PT Sans Caption',
                            fontWeight: 700,
                            fontSize: 50,
                            letterSpacing: '.3rem',
                            color: '#1F1B4C',
                            textDecoration: 'none',
                        }}
                    >
                        О KOKOC GROUP
                    </Typography>
                    <Box>
                        <Typography variant="body1"
                            sx={{
                                flexGrow: 1,
                                fontFamily: 'Noto Sans',
                                fontWeight: 300,
                                fontSize: 16,
                                color: '#151515',
                                textDecoration: 'none',
                                mt: 2
                            }}
                        >
                           <b>Kokoc Group </b>‒ это группа компаний, объединяющая агентства и сервисы интернет-маркетинга. Мы развиваем проекты в формате <b>360°</b> digital. Когда-то мы начинали с одного лишь Kokoc.com и занимались <b>SEO</b>-оптимизацией. Став экспертами в поисковом трафике, мы принялись осваивать другие направления интернет-маркетинга. На сегодня практически весь digital покрывается продуктами группы компаний. Мы всегда находимся в поиске новых областей и новых знакомств.
                            {/* Компания ПРОФБУХ с 2011 года занимается методологической разработкой обучающих и консультирующих онлайн-систем по ведению учёта в программах 1С. За 12 лет работы, обучение по онлайн-курсам прошло 10 000+ бухгалтеров из 6 000+ компаний. */}
                        </Typography>
                    </Box>
                    <Button className="gradientButton" style={{ borderRadius: '20px', color: 'white', lineHeight: 'inherit', width: '176px' }} sx={{ mt: 5 }} href="https://kokocgroup.ru" target="_blank">На Сайт Компании</Button>
                </Box>
            </Box>
        </>
    );
}

export default HomeContent;