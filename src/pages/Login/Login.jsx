import React, { useContext, useEffect, useState} from "react";
import MyButton from "../../components/UI/MyButton/MyButton";
import { AuthContext } from "../../context";
import MyInput from "../../components/UI/MyInput/MyInput";
import style from './Login.module.css'
import { authAPI } from "../../API/api";


const Login = () => {

    const {isAuth, setIsAuth} = useContext(AuthContext);

    //Для управляемого импута
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //Для простой валидации
    const [emailDirty, setEmailDirty] = useState(false);
    const [passwordDirty, setPasswordDirty] = useState(false);
    const [emailError, setEmailError] = useState('Поле емейла не может быть пустым');
    const [passwordError, setPasswordError] = useState('Поле пароля не может быть пустым');
    const [formValid, setFormValid] = useState(false);

    useEffect(() => {
        if(emailError || passwordError){
            setFormValid(false);
        }
        else{
            setFormValid(true);
        }
    }, [emailError, passwordError])

    const emailHandler = (e) => {
        setEmail(e.target.value);
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if(!re.test(String(e.target.value).toLowerCase())){   
            setEmailError('Некорректный емейл');
            if(!e.target.value){
                setEmailError('Поле емейла не может быть пустым');
            }
        }
        else{
            setEmailError('');
        }
    }

    const passwordHanlder = (e) => {
        setPassword(e.target.value);

        if(e.target.value.length <= 3){
            setPasswordError('Пароль должен быть длиннее 3 символов')
            if(!e.target.value){
                setPasswordError('Поле пароля не может быть пустым');
            }
        }
        else{
            setPasswordError('');
        }
    }

    const login = async (e) => {
        e.preventDefault();
        setIsAuth(true);
        localStorage.setItem('auth', 'true');
    }

    const blurHandle = (e) => {
        switch(e.target.type){
            case 'email':
                setEmailDirty(true);
                console.log('попал')
                break;
            case 'password':
                setPasswordDirty(true);
                break;
        }
    }


    return(
        <div className={style.login__wrapper}>
            <div className={style.login}>
                <h1>Войдите в свой аккаунт</h1>
                <form onSubmit={login}>
                    {(emailDirty && emailError) && <div style={{color:'red'}}>{emailError}</div>}
                    <MyInput type={'email'} placeholder={'Введите логин'} value={email} onChange={e => emailHandler(e)} onBlur={e => blurHandle(e)}/>
                    {(passwordDirty && passwordError) && <div style={{color:'red'}}>{passwordError}</div>}
                    <MyInput type={'password'} placeholder={'Введите парль'} value={password} onChange={(e) => passwordHanlder(e)} onBlur={e => blurHandle(e)}/>
                    <MyButton style={{width:'100%', marginTop:'10px'}} disabled={!formValid} >Войти</MyButton>
                </form>
            </div>
        </div>
    )
}

export default Login;