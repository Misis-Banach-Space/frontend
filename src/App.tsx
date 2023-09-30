import HomeHeader from "./pages/HomeHeader";
import HomeContent from "./pages/HomeContent";
import AnalysisContent from "./components/AnalysisContent";
import ArticleHeader from "./components/ArticleHeader";
import VideosHeader from "./pages/VideosHeader";
import VideosContent from "./pages/VideosContent";
import Wave from 'react-wavify'
import "./App.css";
import CustomAppBar from "./components/AppBar";
import { Container } from "@mui/material";
import { Routes, Route } from 'react-router-dom';
import backgroundImage from './assets/background_kubes_2.jpg'

function App() {
    return (
        <>
            <Container maxWidth="xl" className="gradientSection" fixed={true} style={{ maxWidth: "100%", height: "735px", padding: 0, position: 'relative' }}
                sx={{
                    // backgroundImage: `linear-gradient(rgba(36, 112, 181, 0.5), rgba(59, 49, 174, 0.5), rgba(85, 12, 100, 0.5), rgba(91, 10, 87, 0.5)), url(${backgroundImage})`,
                    backgroundImage: `linear-gradient(#50B6D7, #BD43B0A6), url(${backgroundImage})`
                }}>
                <CustomAppBar />
                <Routes>
                    <Route path="/" element={<HomeHeader/>}/>
                    <Route path="/article/:id" element={<ArticleHeader/>}/>
                    <Route path="/articlePublic/:id" element={<ArticleHeader/>}/>
                    <Route path="/myVideos" element={<VideosHeader/>}/>
                </Routes>
                <div style={{ margin: 0, padding: 0, position: 'absolute', bottom: 0, width: '100%', borderBottom: 'none', marginBottom: '-5px' }}>
                    <Wave
                        fill="#ffffff"
                        paused={false}
                        style={{ borderBottom: 'none' }}
                        options={{
                            height: 70,
                            amplitude: 50,
                            speed: 0.15,
                            points: 2,
                        }}
                    />
                </div>
            </Container>
            <Container maxWidth="xl" className="whiteSection" style={{ maxWidth: "100%", backgroundColor: "white"}}>
                <Routes>
                    <Route path="/" element={<HomeContent/>}/>
                    <Route path="/article/:id" element={<AnalysisContent/>}/>
                    <Route path="/myVideos" element={<VideosContent/>}/>
                </Routes>
            </Container>
            <Container sx={{ backgroundColor: 'black' }} style={{ maxWidth: "100%", height: "251px", padding: 0, margin: 0, position: 'relative' }}>
                <div style={{ margin: 0, padding: 0, position: 'absolute', top: 0, width: '100%', marginTop: '-5px' }}>
                    <Wave
                        style={{ transform: `rotate(180deg)` }}
                        fill="#ffffff"
                        paused={false}
                        options={{
                            height: 60,
                            amplitude: 30,
                            speed: 0.2,
                            points: 2,
                        }}
                    />
                </div>
            </Container>
        </>
    );
}

export default App;