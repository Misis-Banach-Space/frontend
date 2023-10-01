import { Button, Typography, Box, Paper, Grid } from "@mui/material";
import imgLink from "../assets/whitesection-img.svg";
import { useParams } from "react-router-dom";
import ApiService from "../services/api";
import { useState, useEffect } from "react"
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import LineChart from "./LineChart";
import MapChart from "./MapChart";
// import dataExample from './data'
import DataTable from './DataTable';
import PageTable from './PageTable';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx'

Chart.register(CategoryScale);
interface PageDataItem {
  id: number;
  url: string;
  category: string;
  theme: string;
  websiteId: number;
}

function AnalysisContent() {
  const [websiteCategory, setwebsiteCategory] = useState('')
  const [websiteTheme, setwebsiteTheme] = useState('')
  const [websiteUrl, setwebsiteUrl] = useState('')
  const [websiteStats, setwebsiteStats] = useState<any>(null)
  const [pageUrls, setPageUrls] = useState<string[]>([]);
  const [pageThemes, setPageThemes] = useState<string[]>([])
  const [pageCategories, setPageCategories] = useState<string[]>([])
  const [dataFetched, setDataFetched] = useState(false);
  const [isOtherStats, setIsOtherStats] = useState(false);

  const [competitiors, setCompetitors] = useState([]);
  const [visitsMonth, setVisitsMonth] = useState<{ [month: string]: number[]; }>();
  const [visistsCountry, setVisitsCountry] = useState<{ [country: string]: number[]; }>();
  const [yandex, setYandex] = useState<{ [country: string]: number[]; }>();

  
  
  let { id } = useParams<{ id: string }>();
  const rawData: any = (competitiors);
  const generateCompetitorPapers = () => {
    return rawData.map((competitor : any, index : any) => (
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

  //Fetching Data





  useEffect(() => {
    const fetchSiteData = async () => {
      try {
        const response = await ApiService.getWebsiteById(Number(id));
        if (response.status === 200) {
          console.log(response.data);
          setwebsiteUrl(response.data.url)
          setwebsiteCategory(response.data.category)
          setwebsiteTheme(response.data.theme)
          setwebsiteStats(response.data.stats)
          if (Object.keys(response.data.stats).length > 2) {
            setIsOtherStats(true);
            setCompetitors(response.data.stats.competitiors)
            setVisitsMonth(response.data.stats.visits_by_month)
            setVisitsCountry(response.data.stats.visits_by_country)
            setYandex(response.data.stats.yandex_request)
          }
        }
      }
      catch (error) {
        console.log(error)
      }
    };
    fetchSiteData();

    const fetchPageData = async () => {
      try {
        const response = await ApiService.getAllPagesBySiteId(Number(id));
        if (response.status === 200) {
          const extractedUrls = response.data.map((it: PageDataItem) => it.url)
          setPageUrls(extractedUrls)
          const extractedThemes = response.data.map((it: PageDataItem) => it.theme)
          setPageThemes(extractedThemes)
          const extractedCat = response.data.map((it: PageDataItem) => it.category)
          setPageCategories(extractedCat)
          setDataFetched(true)
        }
      }
      catch (error) {
        console.log(error)
      }
    }
    fetchPageData();

  }, []);
  const combinedData: string[][] = [];
  if (websiteTheme !== 'unmatched') {
    combinedData.push([websiteUrl, websiteCategory, websiteTheme])
  }

  for (let i = 0; i < pageUrls.length; i++) {
    const url = pageUrls[i];
    const category = pageCategories[i] || '';
    const theme = pageThemes[i] || '';
    combinedData.push([url, category, theme]);
  }
  console.log(competitiors)

  //Downloading
  const handleDownload = (format: 'csv' | 'json' | 'xlsx') => {
    if (format === 'csv') {
      const csvContent = combineDataToCSV(combinedData);
      downloadFile(csvContent, 'data.csv', 'text/csv');
    } else if (format === 'json') {
      const jsonData = combineDataToJSON(combinedData);
      downloadFile(JSON.stringify(jsonData, null, 2), 'data.json', 'application/json');
    } else if (format === 'xlsx') {
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(combinedData);
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(data, 'data.xlsx');
    }
  };
  const combineDataToCSV = (data: string[][]) => {
    return data.map((row) => row.join(',')).join('\n');
  };
  const combineDataToJSON = (data: string[][]) => {
    return data.map((row) => ({ url: row[0], category: row[1], theme: row[2] }));
  };
  const downloadFile = (content: string, fileName: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  }
  //Downloading
  return (
    <>
      <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' }, justifyContent: 'space-evenly', position: 'absolute', top: 100, right: 0, left: 0 }} mt={10} ml={5}>
        <Paper elevation={3} style={{ borderRadius: 20, padding: '20px' }} sx={{ display: 'flex', justifyContent: 'space-between', width: '1000px' }}>
          <Box>
            <img src={imgLink} alt="AI generating summary from video" width="300px" height="200px"></img>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box>
              <Typography
                variant="h1"
                component="a"
                sx={{
                  flexGrow: 1,
                  mt: 2,
                  fontFamily: 'PT Sans Caption',
                  fontWeight: 700,
                  fontSize: 40,
                  letterSpacing: '.3rem',
                  color: '#4094AC',
                  textDecoration: 'none',
                }}
              >
                {websiteUrl}
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
                {websiteStats ? websiteStats.title : ''}
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
                {websiteStats ? websiteStats.description : ''}
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
                    {websiteTheme !== '' && websiteTheme !== 'unmatched' ? 'Категория' : ''}
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
                    {websiteTheme !== '' && websiteTheme !== 'unmatched' ? websiteCategory : ''}
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
                    {websiteTheme !== '' && websiteTheme !== 'unmatched' ? 'Тематика' : ''}
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
                    {websiteTheme !== '' && websiteTheme !== 'unmatched' ? websiteTheme : ''}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Button className="gradientButton" style={{ borderRadius: '20px', color: 'white', lineHeight: 'inherit', width: '176px' }} sx={{ mt: 5, ml: 20 }} href={websiteUrl} target="_blank">На Сайт Компании</Button>
          </Box>
        </Paper>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
        {dataFetched ? (
          <>
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
                Страницы по данному домену
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
                  mb: 2,
                }}
              >
                Узнайте категорию запрашиваемых вами страниц, по данному домену
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2, }}>
                <Button variant="contained" color="primary" onClick={() => handleDownload('csv')}>CSV</Button>
                <Button variant="contained" color="primary" onClick={() => handleDownload('json')}>JSON</Button>
                <Button variant="contained" color="primary" onClick={() => handleDownload('xlsx')}>XLSX</Button>
              </Box>
              <PageTable data={combinedData} />
            </Box>
          </>
        ) :
          ('')
        }

      </Box>
      {isOtherStats &&
        <>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-evenly', }}>
              <Paper elevation={6} sx={{ mt: 4, display: 'flex', alignItems: 'center' }} style={{ borderRadius: 20, padding: '20px' }}>
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
                  <LineChart data={visitsMonth || {}} />
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
            <Box sx={{ width: '1200px' }} mb={5}>
              <MapChart data={visistsCountry || {}} />
            </Box>
          </Box>
          <Box sx={{ width: '1300px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }} mb={5}>
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
            <DataTable data={yandex} />
          </Box>

        </>}
    </>
  );
}

export default AnalysisContent;