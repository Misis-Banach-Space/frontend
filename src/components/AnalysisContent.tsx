import { Button, Typography, Box, Paper, Grid } from "@mui/material";
import imgLink from "../assets/whitesection-img.svg";
// import { useParams} from "react-router-dom";
// import ApiService from "../services/api";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import LineChart from "./LineChart";
import MapChart from "./MapChart";
import dataExample from './data'
import DataTable from './DataTable';

Chart.register(CategoryScale);

function AnalysisContent() {
  const rawData = (dataExample.competitiors);
  const generateCompetitorPapers = () => {
    return rawData.map((competitor, index) => (
      <Paper sx={{ mb: 2 }} key={index}>
         <a href={`https://${competitor}`} target="_blank" style={{ textDecoration: 'none' }}>
        <Typography
          sx={{
            flexGrow: 1,
            fontFamily: 'Noto Sans',
            fontWeight: 300,
            fontSize: 16,
            color: '#4094AC',
            textDecoration: 'none',
            textAlign: 'center',
          }}
        >
          {competitor}
        </Typography>
      </a>
      </Paper>
    ));
  };

  // const [data, setData] = useState();

  // useEffect(() => {
  //     if (id) {
  //         let responseArticle = ApiService.getArticle(parseInt(id))
  //         responseArticle.then((data) => {
  //             setData(data.data)
  //         })
  //     }
  // }, []);

  // const [chartData, setChartData] = useState({
  //     labels: Data.map((data) => data.year), 
  //     datasets: [
  //       {
  //         label: "Users Gained ",
  //         data: Data.map((data) => data.userGain),
  //         backgroundColor: [
  //           "rgba(75,192,192,1)",
  //           "#ecf0f1",
  //           "#50AF95",
  //           "#f3ba2f",
  //           "#2a71d0"
  //         ],
  //         borderColor: "black",
  //         borderWidth: 2
  //       }
  //     ]
  //   });

  return (
    <>
      <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' }, justifyContent: 'space-evenly', position: 'absolute', top: 100, right: 0, left: 0 }} mt={10} ml={5}>
        <Paper elevation={3} style={{ borderRadius: 20, padding: '20px' }} sx={{ display: 'flex', justifyContent: 'space-between', width: '1000px' }}>
          <Box>
            <img src={imgLink} alt="AI generating summary from video" width="500px" height="400px"></img>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex' }}>
              <Typography
                variant="h1"
                component="a"
                sx={{
                  flexGrow: 1,
                  mt: 2,
                  fontFamily: 'PT Sans Caption',
                  fontWeight: 700,
                  fontSize: 50,
                  letterSpacing: '.3rem',
                  color: '#4094AC',
                  textDecoration: 'none',
                }}
              >
                misis.ru
              </Typography>
              <Typography variant="h2"
                sx={{
                  textAlign: 'center',
                  mt: 1,
                  flexGrow: 1,
                  fontFamily: 'PT Sans Caption',
                  fontWeight: 600,
                  fontSize: '20px',
                  color: '#3E6874',
                  textDecoration: 'none',
                }}
              >
                {dataExample.title}
              </Typography>
            </Box>
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
                {dataExample.description}
              </Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="h2"
                    sx={{
                      textAlign: 'center',
                      mr: 2,
                      pt: 4,
                      flexGrow: 1,
                      fontFamily: 'PT Sans Caption',
                      fontWeight: 700,
                      fontSize: '28px',
                      color: '#3B92AC',
                      textDecoration: 'none',
                    }}
                  >
                    Количество просмотров
                  </Typography>
                  <Typography variant="h2"
                    sx={{
                      textAlign: 'center',
                      mr: 2,
                      pt: 2,
                      flexGrow: 1,
                      fontFamily: 'PT Sans Caption',
                      fontWeight: 700,
                      fontSize: '28px',
                      color: '#585757',
                      textDecoration: 'none',
                    }}
                  >
                    {dataExample.yandex_iks}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
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
                      fontSize: '28px',
                      color: '#3B92AC',
                      textDecoration: 'none',
                    }}
                  >
                    Возраст домена
                  </Typography>
                  <Typography variant="h2"
                    sx={{
                      textAlign: 'center',
                      mr: 2,
                      mt: 1,
                      pt: 4,
                      flexGrow: 1,
                      fontFamily: 'PT Sans Caption',
                      fontWeight: 700,
                      fontSize: '28px',
                      color: '#585757',
                      textDecoration: 'none',
                    }}
                  >
                    {dataExample.vozrast}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Button className="gradientButton" style={{ borderRadius: '20px', color: 'white', lineHeight: 'inherit', width: '176px' }} sx={{ mt: 5, ml: 20 }} href="https://buhexpert8.ru" target="_blank">На Сайт Компании</Button>
          </Box>
        </Paper>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-evenly', }}>
          <Paper elevation={6} sx={{ mt: 4, display: 'flex', alignItems: 'center' }} style={{ borderRadius: 20, padding: '20px'}}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="h2"
                sx={{
                  textAlign: 'center',
                  mr: 2,
                  mt: 1,
                  flexGrow: 1,
                  fontFamily: 'PT Sans Caption',
                  fontWeight: 700,
                  fontSize: '28px',
                  color: '#141416',
                  textDecoration: 'none',
                }}
              >
                График посещаемости
              </Typography>
              <Typography variant="body1" style={{ width: '572px' }}
                sx={{
                  flexGrow: 1,
                  fontFamily: 'Noto Sans',
                  fontWeight: 300,
                  fontSize: 16,
                  color: '#585757',
                  textDecoration: 'none',
                  textAlign: 'center',
                  mt: 2,
                  mb: 5
                }}
              >
                Посмотрите график посещаемости за последние три месяца
              </Typography>
              <LineChart data={dataExample.visits_by_month}/>
            </Box>
          </Paper>
          <Paper elevation={6} sx={{ ml: 3 }} style={{ borderRadius: 20, padding: '20px' }}>
            <Typography variant="h2"
              sx={{
                textAlign: 'center',
                flexGrow: 1,
                fontFamily: 'PT Sans Caption',
                fontWeight: 700,
                fontSize: '28px',
                color: '#141416',
                textDecoration: 'none',
                mb: 2,
              }}
            >
              Конкуренты
            </Typography>
            {generateCompetitorPapers()}
          </Paper>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h2"
            sx={{
              textAlign: 'center',
              mr: 2,
              mt: 1,
              pt: 4,
              flexGrow: 1,
              fontFamily: 'PT Sans Caption',
              fontWeight: 700,
              fontSize: '28px',
              color: '#141416',
              textDecoration: 'none',
            }}
          >
            Таргетинг по регионам и странам
          </Typography>
          <Typography variant="body1" style={{ width: '572px' }}
            sx={{
              flexGrow: 1,
              fontFamily: 'Noto Sans',
              fontWeight: 300,
              fontSize: 16,
              color: '#585757',
              textDecoration: 'none',
              textAlign: 'center',
              mt: 2,
              mb: 5
            }}
          >
            Определяйте географическое положение основной аудитории веб-сайта за последний месяц
          </Typography>

        </Box>
        <Box sx={{width: '1200px'}} mb={5}>
          <MapChart data={dataExample.visits_by_country}/>
        </Box>
      </Box>
      <Box sx={{width: '1300px', margin: '0 auto' , display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection:'column'}} mb={5}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h2"
            sx={{
              textAlign: 'center',
              mr: 2,
              mt: 1,
              pt: 4,
              flexGrow: 1,
              fontFamily: 'PT Sans Caption',
              fontWeight: 700,
              fontSize: '28px',
              color: '#141416',
              textDecoration: 'none',
            }}
          >
            Запросы
          </Typography>
          <Typography variant="body1" style={{ width: '572px' }}
            sx={{
              flexGrow: 1,
              fontFamily: 'Noto Sans',
              fontWeight: 300,
              fontSize: 16,
              color: '#585757',
              textDecoration: 'none',
              textAlign: 'center',
              mt: 2,
              mb: 5
            }}
          >
            Определяйте по каким запросом из Яндекса пользователи переходили на сайтов
          </Typography>

        </Box>
          <DataTable data={dataExample.yandex_request}/>
      </Box>

    </>
  );
}

export default AnalysisContent;