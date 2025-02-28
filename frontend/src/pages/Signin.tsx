import Heading from '../components/Heading';
import SubHeading from '../components/SubHeading';
import InputBox from '../components/InputBox';
import Button from '../components/Button';
import BottomWarning from '../components/BottomWarning';
import { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Appbar from '../components/Appbar';

export default function Signin(){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return<div>
        <Appbar/>
     <div className='bg-gradient-to-r from-[#0F172A] to-[#37309b] h-screen flex justify-center transition-colors duration-300 ' >
        <div className='flex flex-col justify-center pb-15'>
        <div className='bg-white   rounded-lg h-max text-center p-2 px-4'>
        <Heading label={"Sign In"}/>
        <SubHeading text={"Enter your credentials to access your account"} />
        <InputBox type={"email"} onChange={e=>setUsername(e.target.value)} label={"Username"} placeholder={"abuzerexe"}/>
        <InputBox type={"password"} onChange={e=>setPassword(e.target.value)} label={"Password"} />
        <div className='pt-5'>
        <Button variant='primary' text='Sign In' fullwidth={true} />
        </div>
            
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign Up"} to={"/signup"}/>
        </div>
        </div>
    </div>
    </div>
}