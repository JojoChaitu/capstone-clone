import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../context'

const  Signup = () => {

    const navigate = useNavigate()
    const { userRole,changeRole } = useGlobalContext()
    const [user,setUser] = useState({
        username:'',
        email:'',
        password:'',
        role:'user'
    })

    const handleSubmit = async (e) =>{
        e.preventDefault()
        changeRole(user.role)
        let result;
            if (user.role === "user") {
                result = await axios.post("http://localhost:3004/create", {
                name: user.username,
                email: user.email,
                password: user.password,
                });
            } else {
                result = await axios.post("http://localhost:3003/create", {
                name: user.username,
                email: user.email,
                password: user.password,
                });
            }

        navigate('/login')
    }

  return (
    <div className='signup-container'>

        <div className='title'>
                <h1>Signup Form</h1>
                <div className='title-underline'></div>
        </div>
        <div className='form-container'>
            <form className='form-signup' onSubmit={handleSubmit}>
                <div className='input-container'>
                    <label>Name</label>
                    <input type="text" name='name' className='input-box' 
                        onChange={(e)=>{setUser({...user,username:e.target.value})}}></input>
                </div>
                <div className='input-container'>
                    <label>Email</label>
                    <input type="text" name='Email' className='input-box' 
                    onChange={(e)=>{setUser({...user,email:e.target.value})}}></input>
                </div>
                <div className='input-container'>
                    <label>Password</label>
                    <input type="password" name='password' className='input-box' 
                    onChange={(e)=>{setUser({...user,password:e.target.value})}}></input>
                </div>
                <div className='input-container'>
                    <div className="form-check form-check-inline">
                        <input onChange={(e)=>{setUser({...user,role:e.target.value})}} className="form-check-input" type="radio" name="inlineRadioOptions" id="user" value="user"/>
                        <label className="form-check-label" htmlFor="inlineRadio1">User</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input onChange={(e)=>{setUser({...user,role:e.target.value})}} className="form-check-input" type="radio" name="inlineRadioOptions" id="admin" value="admin"/>
                        <label className="form-check-label" htmlFor="inlineRadio2">Admin</label>
                    </div>
                </div>

                <button type='submit' className='btn btn-dark'>submit</button>
            </form>
        </div>
    </div>
  )
}


export default Signup;