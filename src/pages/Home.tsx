import HomeHeader from "./HomeHeader";
import HomeContent from "./HomeContent";
import { Box } from '@mui/material'

function Home() {
    return (
        <>
            <Box style={{ position: 'relative', top: '-650px', height: '400px'}}>
                <HomeHeader />
                <HomeContent />
            </Box>
        </>
    )
}

export default Home

