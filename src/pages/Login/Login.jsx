import React, { useContext, useEffect, useState} from "react";
import MyButton from "../../components/UI/MyButton/MyButton";
import MyInput from "../../components/UI/MyInput/MyInput";
import { fetch } from "../../API/api";
import { AuthContext } from "../../context";
import style from './Login.module.css'

const Login = () => {

    //Для простой валидации
    const [isEmailDirty, setIsEmailDirty] = useState(false);
    const [isPasswordDirty, setIsPasswordDirty] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const [emailError, setEmailError] = useState('Поле емейла не может быть пустым');
    const [passwordError, setPasswordError] = useState('Поле пароля не может быть пустым');

    //Для управляемого импута
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {isAuth, setIsAuth} = useContext(AuthContext);

    useEffect(() => {
        if(emailError || passwordError){
            setIsFormValid(false);
        }
        else{
            setIsFormValid(true);
        }
    }, [emailError, passwordError])

    const emailHandler = (e) => {
        let value = e.target.value;
        setEmail(value);
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!value){
            setEmailError('Поле емейла не может быть пустым');
        }
        else if(!re.test(String(value).toLowerCase())){   
            setEmailError('Некорректный емейл');
        }
        else{
            setEmailError('');
        }
    }

    const passwordHanlder = (e) => {
        let value = e.target.value;
        setPassword(value);
        if(value.length <= 3){
            setPasswordError('Пароль должен быть длиннее 3 символов');
            if(!value){
                setPasswordError('Поле пароля не может быть пустым');
            }
        }
        else{
            setPasswordError('');
        }
    }


    const blurHandler = (e) => {
        switch(e.target.type){
            case 'email':
                setIsEmailDirty(true);
                break;
            case 'password':
                setIsPasswordDirty(true);
                break;
        }
    }

    const login = async (e) => {
        e.preventDefault();
        setIsAuth(true);
        localStorage.setItem('auth', 'true');
        fetch('https://jsonplaceholder.typicode.com/todos/1', email, password)
        .then(response => response.json())
        .then(json => alert(JSON.stringify(json, null, 2)) 
        )
    }

    return(
        <div className={style.login__wrapper}>
            <div className={style.login}>
                <h1>Войдите в свой аккаунт</h1>
                <form onSubmit={login}>
                    {(isEmailDirty && emailError) && <div className={style.error}>{emailError}</div>}
                    <MyInput type={'email'} placeholder={'Введите логин'} value={email} onChange={e => emailHandler(e)} onBlur={e => blurHandler(e)}/>
                    {(isPasswordDirty && passwordError) && <div className={style.error}>{passwordError}</div>}
                    <MyInput type={'password'} placeholder={'Введите пароль'} value={password} onChange={(e) => passwordHanlder(e)} onBlur={e => blurHandler(e)}/>
                    <div className={style.button}>
                        <MyButton disabled={!isFormValid}>Войти</MyButton>
                    </div> 
                </form>
            </div>
        </div>
    )
}

export default Login;