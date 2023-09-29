import { Box, Button, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import ApiService from "../services/api";
import { useParams } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import PublicIcon from '@mui/icons-material/Public';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import VerifiedIcon from '@mui/icons-material/Verified';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import React from 'react'
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { saveAs } from 'file-saver';

// quill.clipboard.dangerouslyPasteHTML(5, '&nbsp;<b>World</b>');
function Article() {
    const [content, setContent] = useState('');
    const [showEditor, setShowEditor] = useState(false);
    const [showComponent, setShowComponent] = useState(true);

    const [isPublished, setIsPublished] = useState(false);
    const [ArticleId, setArticleId] = useState(0);
    const [dateString, setDateString] = useState('');
    // const [linkVideo, setLinkVideo] = useState('');

    //get data article from server
    // const [dataArticle, setDataArticle] = useState('')
    const [dataArticleEdit, setDataArticleEdit] = useState('')
    let { id } = useParams();

    function parseDate(dateString: string) {
        const date = new Date(Date.parse(dateString));
        return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
    }

    useEffect(() => {
        if (id) {
            let responseArticle = ApiService.getArticle(parseInt(id))
            responseArticle.then((data) => {
                // setDataArticle(data.data.body);
                setContent(data.data.body);
                setDataArticleEdit(data.data.body);
                setDateString(data.data.created_at);
                setArticleId(data.data.id);
            })
            if (ArticleId !== 0) {
                let responseRecord = ApiService.getRecordByArticleId(ArticleId)
                responseRecord.then((data) => {
                    setIsPublished(data.data.published);
                    // setLinkVideo(data.data.video_link);
                })
            }
        }
    }, []);

    // const [dataArticle, setDataArticle] = useState('<div><p>Paragraph</p><img src="image.png" alt="Image" /><h1>Heading</h1></div>')
    // let { id } = useParams();

    // useEffect(() => {
    //     if (id) {
    //         setIsLoading(true);
    //         console.log('isloading', isLoading)
    //         let responseArticle = ApiService.createArticle({ body: "", record_id: parseInt(id) })
    //         responseArticle.then((data) => { setDataArticle(data.data.body) })
    //         setIsLoading(false);
    //         console.log('isloading', isLoading)

    //         console.log('article', dataArticle);
    //     }
    // }, []);

    const HtmlComponent = ({ htmlString }: { htmlString: string }) => (
        <div dangerouslySetInnerHTML={{ __html: htmlString }} />
    );

    //publish article
    async function handleSubmit() {
        //send data to server
        if (!isPublished) {
            setIsPublished(true);
            let response = ApiService.setPublishedStatus(
                {
                    record_id: parseInt(id || ''),
                    published: true
                }
            );
            let result = await response;
            console.log(result);
        }
        else {
            setIsPublished(false);
            let response = ApiService.setPublishedStatus(
                {
                    record_id: parseInt(id || ''),
                    published: false
                }
            );
            let result = await response;
            console.log(result);
        }
    }

    const handleSave = (stringHtml: string) => {
        const file = new Blob([stringHtml], { type: 'text/html' });
        saveAs(file, 'index.html');
    };

    interface MyObject {
        [key: string]: any;
    }

    const myObj: MyObject = {};
    const prop = 'propname';
    myObj[prop] = 'string';


    const modules = {
        toolbar: [
            [{ font: [] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ color: ['black'] }, { background: [] }],
            [{ script: "sub" }, { script: "super" }],
            ["blockquote", "code-block"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image", "video"],
            ["clean"],
        ]
    };

    //React-Quill

    function handleChange(value: string) {
        setContent(value);
    }

    function removeSubstring(str: string): string {
        return str.replace(/<p><br><\/p><p><br><\/p>|<p><br><\/p>/g, '');
    }

    function toggleEditor() {
        if (showEditor) {
            setDataArticleEdit(removeSubstring(content));
        }
        setShowComponent(!showComponent);
        setShowEditor(!showEditor);
    }
    function getContentToSave() {
        handleSave(removeSubstring(content));
        // console.log(content);
    }
    //React-Quill


    //Dialog
    const [openDialog, setOpenDialog] = React.useState(false);

    const handleClickOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialogYes = () => {
        setOpenDialog(false);
        if (id) {
            let responseArticle = ApiService.createArticle({ body: dataArticleEdit, record_id: parseInt(id) })
            responseArticle.then((data) => { setDataArticleEdit(data.data.body) })
        }
    };

    const handleCloseDialogNo = () => {
        setOpenDialog(false);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    //Dialog


    //checkbox and save
    return (
        <>
            <Box className="ArticleContainer" mt={10} ml={20} mr={20} sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}>
                {/* <Editor3 initialValue={dataArticle} /> */}
                {showComponent && <HtmlComponent htmlString={dataArticleEdit} />}

                {showEditor && (
                    <ReactQuill modules={modules} value={content} onChange={handleChange} />
                )}
                <Box className="Button-Container" width="700px" mt={4}
                    sx={{ display: 'grid', gridTemplateColumns: "repeat(4, 1fr)", gridGap: 4, alignItems: 'center' }}
                >
                    <Button className="gradientButton" onClick={toggleEditor} sx={{
                        backgroundColor: 'white',
                        display: "flex", justifyContent: "spaceBetween", alignItems: "center", marginBottom: '40px',
                        boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.25)', color: "white"
                    }}
                        style={{
                            width: '200px', height: '54px', borderRadius: '15px'
                        }}><IconButton>
                            <EditIcon sx={{ color: '#ffffff' }} />
                        </IconButton>
                        Редактировать</Button>
                    <Button className="gradientButton" onClick={getContentToSave} sx={{
                        backgroundColor: 'white',
                        display: "flex", justifyContent: "spaceBetween", alignItems: "center", marginBottom: '40px',
                        boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.25)', color: "white"
                    }}
                        style={{
                            width: '230px', height: '54px', borderRadius: '15px'
                        }}><IconButton>
                            <SaveAltIcon sx={{ color: '#ffffff' }} />
                        </IconButton>
                        Скачать Статью</Button>

                    <Button className="gradientButton" onClick={handleSubmit} sx={{
                        backgroundColor: 'white',
                        display: "flex", justifyContent: "spaceBetween", alignItems: "center", marginBottom: '40px',
                        boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.25)', color: "white"
                    }}
                        style={{
                            width: '210px', height: '54px', borderRadius: '15px'
                        }}>
                        <IconButton>
                            {!isPublished ? (
                                <PublicIcon sx={{ color: "#ffffff" }} />
                            ) : (
                                <VerifiedIcon sx={{ color: "#ffffff" }} />
                            )}
                        </IconButton>
                        {!isPublished ? ('Опубликовать') : ('Опубликовано')}
                    </Button>
                </Box>
                <Box display='flex' alignItems='center' justifyContent='space-between' width={700}>
                    <Typography variant="body1"
                        sx={{
                            flexGrow: 1,
                            fontFamily: 'Noto Sans',
                            fontWeight: 300,
                            fontSize: 16,
                            color: 'black',
                            textDecoration: 'none',

                        }}
                    >
                        дата создания: {parseDate(dateString)}
                    </Typography>

                    <Button className="gradientButton" onClick={handleClickOpenDialog} sx={{
                        backgroundColor: 'white',
                        display: "flex", justifyContent: "spaceBetween", alignItems: "center", marginBottom: '40px',
                        boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.25)', color: "white"
                    }}
                        style={{
                            width: '200px', height: '54px', borderRadius: '15px'
                        }}><IconButton>
                            <BookmarksIcon sx={{ color: '#ffffff' }} />
                        </IconButton>
                        Сохранить
                    </Button>
                </Box>
            </Box>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Диалоговое окно</DialogTitle>
                <DialogContent>
                    <p>Вы хотите сохранить отредактированную статью?</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleCloseDialogYes()}>Да</Button>
                    <Button onClick={() => handleCloseDialogNo()}>Нет</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
export default Article;