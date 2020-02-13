import React, {useState} from 'react';
import StartButton from './StartButton'

export default function Login() {
    const initialState = {
        username :'',
        password : ''
    }

    const handleChange = (e) => {
        let {name,value} = e.target;
      
        setInput({...input, [name] : value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(input)
        setInput(initialState)
    }

   const [input, setInput] = useState(initialState)
    return (
        <form onSubmit = {handleSubmit}>
            <input name = "username" value = {input.username} onChange = {handleChange}  placeholder = "Username...."/>
            <input name = "password" value = {input.password} onChange = {handleChange}  placeholder = "Password...."/>
            <StartButton callback = {handleSubmit}>Login</StartButton>
        </form>
    )
}
