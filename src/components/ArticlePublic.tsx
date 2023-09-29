import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import ApiService from "../services/api";
import { useParams } from "react-router-dom";

function Article() {
    const [dataArticle, setDataArticle] = useState("")
    let { id } = useParams();

    useEffect(() => {
        if (id) {
            let responseArticle = ApiService.getArticle(parseInt(id))
            responseArticle.then((data) => { setDataArticle(data.data.body) })
        }
    }, []);

    const HtmlComponent = ({ htmlString }: { htmlString: string }) => (
        <div dangerouslySetInnerHTML={{ __html: htmlString }} />
    );

    return (
        <>
            <Box mt={10} ml={20} mr={20}>
                <HtmlComponent htmlString={dataArticle} />
            </Box>

        </>
    );
}

export default Article;