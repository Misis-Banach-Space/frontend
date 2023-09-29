import { Button, Typography, Box, Paper } from "@mui/material";
import imgLink from "../assets/whitesection-img.svg";
import { useParams } from "react-router-dom";
import ApiService from "../services/api";
import { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import LineChart from "./LineChart";

Chart.register(CategoryScale);

const dataExsample = {
    'title': 'Университет науки и технологий МИСИС — официальный сайт',
    'description': 'Университет науки и технологий МИСИС в Москве: информация для поступающих, новости, институты, программы подготовки',
    'vozrast': '23 года 364 дня',
    'page_size': '50.38 КБ',
    'page_load_time': '2100 сек',
    'ip': '5.253.61.53',
    'yandex_iks': '6600',
    'competitiors': ['msph.ru', 'abit.etu.ru', 'kopernikfitness.ru', 'sf.misis.ru', 'hse.ru', 'ucheba.ru', 'ranepa.ru', 'vuzopedia.ru', 'mirea.ru', 'miit.ru'],
    'yandex_request': [['мисис', 'https://misis.ru/', '2380'], ['миссис', 'https://misis.ru/', '1600'], ['горный', 'https://misis.ru/university/struktura-universiteta/instituty/gi/', '1971'], ['горный университет', 'https://misis.ru/university/struktura-universiteta/instituty/gi/', '1175'], ['ниту мисис', 'https://misis.ru/', '559'], ['мисис официальный сайт', 'https://misis.ru/', '247'], ['ниту мисис официальный сайт', 'https://misis.ru/', '234'], ['горный институт', 'https://misis.ru/university/struktura-universiteta/instituty/gi/', '233'], ['бизнес информатика', 'https://misis.ru/applicants/admission/baccalaureate-and-specialty/faculties/bi/', '381'], ['национальный исследовательский технологический университет мисис', 'https://misis.ru/', '187']],
    'requests': {'Август': [298, 11256], 'Сентябрь': [224, 11027], 'Октябрь': [231, 11397], 'Ноябрь': [282, 10524], 'Декабрь': [274, 10685], 'Январь': [211, 8427], 'Февраль': [287, 12327], 'Март': [304, 10272], 'Апрель': [27, 8059], 'Май': [31, 7814], 'Июнь': [12, 196], 'Июль': [230, 806], 'Title': ['Количество запросов', 'Количество эффективных показов']},
    'visits_by_month': {'Июнь': [582958], 'Июль': [486935], 'Авг': [352382], 'Title': ['Количество заходов']},

    'visits_by_country': {'Russia': [91.08], 'France': [1.63], 'Uzbekistan': [0.98], 'Japan': [0.64], 'Georgia': [0.62], 'Title': ['Посещаемость, %']},
}

const Data = [
    {
      id: 1,
      year: 2016,
      userGain: 80000,
      userLost: 823
    },
    {
      id: 2,
      year: 2017,
      userGain: 45677,
      userLost: 345
    },
    {
      id: 3,
      year: 2018,
      userGain: 78888,
      userLost: 555
    },
    {
      id: 4,
      year: 2019,
      userGain: 90000,
      userLost: 4555
    },
    {
      id: 5,
      year: 2020,
      userGain: 4300,
      userLost: 234
    }
  ];
  



function AnalysisContent() {
    let { id } = useParams();
    const [data, setData] = useState();

    useEffect(() => {
        if (id) {
            let responseArticle = ApiService.getArticle(parseInt(id))
            responseArticle.then((data) => {
                setData(data.data)
            })
        }
    }, []);

    const [chartData, setChartData] = useState({
        labels: Data.map((data) => data.year), 
        datasets: [
          {
            label: "Users Gained ",
            data: Data.map((data) => data.userGain),
            backgroundColor: [
              "rgba(75,192,192,1)",
              "#ecf0f1",
              "#50AF95",
              "#f3ba2f",
              "#2a71d0"
            ],
            borderColor: "black",
            borderWidth: 2
          }
        ]
      });

    return (
        <>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' }, justifyContent: 'space-evenly', position: 'absolute', top: 100, right: 0, left: 0}} mt={10} ml={5}>
                <Paper elevation={3} style={{ borderRadius: 20, padding: '20px' }} sx={{display: 'flex', justifyContent: 'space-between', width: '1000px'}}>
                    <Box>
                        <img src={imgLink} alt="AI generating summary from video" width="500px" height="400px"></img>
                    </Box>
                    <Box>
                        <Typography>
                            Teeeeext
                        </Typography>
                    </Box>
                </Paper>
            </Box>
            <Box>
                <img src={imgLink} alt="AI generating summary from video" width="500px" height="400px"></img>
                <LineChart />
            </Box>

        </>
    );
}

export default AnalysisContent;