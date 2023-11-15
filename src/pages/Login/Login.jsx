import React, { useContext, useEffect, useState} from "react";
import MyButton from "../../components/UI/MyButton/MyButton";
import { AuthContext } from "../../context";
import MyInput from "../../components/UI/MyInput/MyInput";
import style from './Login.module.css'
import { authAPI } from "../../API/api";
import { fetch } from "../../API/api";


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
                    {(emailDirty && emailError) && <div style={{color:'red'}}>{emailError}</div>}
                    <MyInput style={{fontFamily:'monospace', border:'1px white solid', borderRadius:'10px'}} type={'email'} placeholder={'Введите логин'} value={email} onChange={e => emailHandler(e)} onBlur={e => blurHandle(e)}/>
                    {(passwordDirty && passwordError) && <div style={{color:'red'}}>{passwordError}</div>}
                    <MyInput style={{marginTop:'15px' , fontFamily:'monospace', border:'1px white solid', borderRadius:'10px'}} type={'password'} placeholder={'Введите пароль'} value={password} onChange={(e) => passwordHanlder(e)} onBlur={e => blurHandle(e)}/>
                    <div className={style.button}>
                        <MyButton disabled={!formValid} style={{color:'black', textAlign: 'center', width:'250px', marginTop:'30px', fontFamily:'monospace', backgroundColor:'white', border:'1px white solid', borderRadius:'10px', letterSpacing:'1px', fontWeight:'200'}} >Войти</MyButton>
                    </div> 
                </form>
            </div>
        </div>
    )
}

export default Login;