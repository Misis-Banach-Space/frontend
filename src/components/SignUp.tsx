import { useState, useEffect } from "react";
import ApiService from "../services/api";
import { Paper, TextField, Typography, Box, Button, InputAdornment, Alert } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const SignUpForm = () => {

    const [isAuthorized, setAuthorized] = useState(false);

    useEffect(() => {
      }, [isAuthorized]);

    const [email, setEmail] = useState("");
    const [fio, setFio] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPasswod, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const [showPassword2, setShowPassword2] = useState(false);
    const handleTogglePasswordVisibility2 = () => {
        setShowPassword2(!showPassword2);
    };

    const [error1, setError1] = useState(false);
    const [helperText1, setHelperText1] = useState('');
    const [error2, setError2] = useState(false);
    const [helperText2, setHelperText2] = useState('');
    const [error3, setError3] = useState(false);
    const [helperText3, setHelperText3] = useState('');
    const [error4, setError4] = useState(false);
    const [helperText4, setHelperText4] = useState('');

    // handle fio field changes
    const handleFioChange = (event: any) => {
        // check if fio contains three words (name, surname, patronymic)
        if (event.target.value.split(" ").length !== 3) {
            setError1(true);
            setHelperText1('Введите ФИО в три слова через пробел');
        }
        else {
            setError1(false);
            setHelperText1('');
        }
        setFio(event.target.value);
    };

    //handle email field changes
    const handleEmailChange = (event: any) => {
        // check if email is valid
        if (
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                event.target.value
            )
        ) {
            setError2(false);
            setHelperText2('');
        } else {
            setError2(true);
            setHelperText2('Неверный формат ввода email');
        }
        setEmail(event.target.value);
    };

    // handle password field changes
    const handlePasswordChange = (event: any) => {
        if (event.target.value.length < 8) {
            setError3(true);
            setHelperText3('Пароль должен содержать минимум 8 символов');
        }
        else {
            setError3(false);
            setHelperText3('');
        }
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event: any) => {
        if (password !== event.target.value) {
            setError4(true);
            setHelperText4('Пароли не совпадают');
        }
        else {
            setError4(false);
            setHelperText4('');
        }
        setConfirmPassword(event.target.value);
    };

    // handle submit
    const handleSubmit = (event: any) => {
        event.preventDefault();
        let errorEmpty = false;
        // check if passwords match
        if (password !== confirmPasswod || !password || !confirmPasswod) {
            setError4(true);
            console.log(error4);
            errorEmpty = true;
            setHelperText4('Пароли не совпадают');
        }
        else {
            setError4(false);
            errorEmpty = false;
            setHelperText4('');
        }

        //check if password valid
        if (!password) {
            setError3(true);
            errorEmpty = true;
            console.log(error3)
            setHelperText3('Введите пароль');
        }
        else {
            setError3(false);
            errorEmpty = false;
            setHelperText3('');
        }

        // check if email is valid and not empty string
        if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            setError2(false);
            errorEmpty = false;
            console.log(error2)
            setHelperText2('');
        } else {
            setError2(true);
            errorEmpty = true;
            setHelperText2('Неверный формат ввода email');
        }

        // check if fio contains three words (name, surname, patronymic) and fio != undefined
        if (fio.split(" ").length !== 3 || !fio) {
            setError1(true);
            errorEmpty = true;
            console.log(error1)
            setHelperText1('Введите ФИО в три слова через пробел');
        }
        else {
            setError1(false);
            errorEmpty = false;
            setHelperText1('');
        }

        console.log(errorEmpty, error1, error2, error3, error4, email, password, fio)

        if ((!error1 && !error2 && !error3 && !error4 && !errorEmpty)) {
            //send data to server
            let result = ApiService.createUser({
                email: email,
                password: password,
                fio: fio,
            });

            //handle success
            result.then(response => {
                console.log(response)
                setAuthorized(true);
            });

            //handle error 400
            result.catch(error => {
                if (error.response.status === 400) {
                    alert('Такой email уже существует');
                }
            });
        }
    };

    return (
        <Paper
            onClick={(e) => e.stopPropagation()}
            elevation={6}
            style={{
                width: "500px",
                minHeight: "560px",
                borderRadius: "30px",
            }}
        >
            <Typography
                variant="h2"
                sx={{
                    textAlign: "center",
                    mr: 2,
                    mt: 4,
                    flexGrow: 1,
                    fontFamily: "PT Sans Caption",
                    fontWeight: 700,
                    fontSize: "24px",
                    color: "#1F1B4C",
                    textDecoration: "none",
                }}
            >
                Зарегистрироваться
            </Typography>
            <Typography
                variant="body1"
                sx={{
                    textAlign: "center",
                    mr: 2,
                    mt: 2,
                    flexGrow: 1,
                    fontFamily: "PT Sans Caption",
                    fontWeight: 400,
                    fontSize: "16px",
                    textDecoration: "none",
                    color: '1F1B4C'
                }}
            >
                Введите свои данные для регистрации на сайте
            </Typography>
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDirection={"column"}
                sx={{ mt: 4 }}
            >
                <TextField
                    id="outlined-basic"
                    label="Фамилия Имя Отчество"
                    error={error1}
                    helperText={helperText1}
                    variant="outlined"
                    sx={{ width: "300px" }}
                    value={fio}
                    onChange={handleFioChange}
                />
                <TextField
                    id="outlined-basic"
                    label="Email"
                    error={error2}
                    helperText={helperText2}
                    variant="outlined"
                    sx={{ mt: 3, width: "300px" }}
                    value={email}
                    onChange={handleEmailChange}
                />
                <TextField type={showPassword ? 'text' : 'password'}
                    id="outlined-basic"
                    label="Пароль"
                    error={error3}
                    helperText={helperText3}
                    variant="outlined"
                    sx={{ mt: 3, width: "300px" }}
                    value={password}
                    onChange={handlePasswordChange}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                {!showPassword ? <VisibilityOffIcon onClick={handleTogglePasswordVisibility} sx={{ color: '#1F1B4C' }} /> : <VisibilityIcon onClick={handleTogglePasswordVisibility} sx={{ color: '#1F1B4C' }} />}
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField type={showPassword2 ? 'text' : 'password'}
                    id="outlined-basic"
                    label="Подтверждение Пароля"
                    error={error4}
                    helperText={helperText4}
                    variant="outlined"
                    sx={{ mt: 3, width: "300px" }}
                    value={confirmPasswod}
                    onChange={handleConfirmPasswordChange}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                {!showPassword2 ? <VisibilityOffIcon onClick={handleTogglePasswordVisibility2} sx={{ color: '#1F1B4C' }} /> : <VisibilityIcon onClick={handleTogglePasswordVisibility2} sx={{ color: '#1F1B4C' }} />}
                            </InputAdornment>
                        ),
                    }}
                />
                <Typography
                    variant="body1"
                    sx={{
                        textAlign: "center",
                        mr: 2,
                        mt: 2,
                        flexGrow: 1,
                        fontFamily: "Noto Sans",
                        fontWeight: 300,
                        fontSize: "14px",
                        textDecoration: "none",
                        color: '1F1B4C'
                    }}
                >
                    Для закрытия формы,<br></br> нажмите вне ее области
                </Typography>
                <Button disabled={Boolean(isAuthorized)}
                    className="gradientButton RegisterButton"
                    style={{ borderRadius: "20px", color: "white" }}
                    sx={{ mt: 2, mb: 2, ml: 1, mr: 1 }}
                    onClick={handleSubmit}
                >
                    Регистрация
                </Button>
                {isAuthorized && <Alert variant="outlined" severity="success" sx={{mb:2}}>
                    Вы успешно зарегистрировались!
                </Alert>}
            </Box>
        </Paper>
    );
};

export default SignUpForm;
