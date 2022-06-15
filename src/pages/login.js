import React, {useState} from 'react'
import http from '../http-common'
import { useNavigate } from "react-router-dom"
function Login()
{
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [fields,setFields] = useState({
        error:'',
        message:'',
        isloading:false,
        disab:false,
        haserror:false
    });
    const navigate = useNavigate()

    const handleEmaiChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event) =>{
        setPassword(event.target.value);
    }

    const handleSubmit = async(event) => {
        if(email === '')
        {
            setFields({'error':'Email is required','haserror':true});
            event.preventDefault();
            return false;
        }
        if(password === '')
        {
            setFields({'error':'Password is required','haserror':true});
            event.preventDefault();
            return false;
        }
        fields.disab = true;
        await http.post('login',{email:email,password:password}).then(response=>{
            localStorage.setItem('token',response.data.token);
            navigate('/');
        }).catch(error => {
            fields.disab = false;
            console.log(error);
        });
    }

    return(
        <div className="container my-5">
            <div className="row justify-content-md-center">
            <form className="col-sm-5 border border-primary p-3">
                {fields.haserror === true &&
                <p className='text-danger'>{fields.error}</p>
                }
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" className="form-control" onChange={handleEmaiChange} />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" className="form-control" onChange={handlePasswordChange} />
                </div>
                <button type='button' className="btn btn-primary w-100 mt-3" onClick={handleSubmit} disabled={fields.disab ? 'disabled':''}>Login</button>
            </form>
            </div>
        </div>
    );
}

export default Login;