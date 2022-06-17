import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { useSubscriberContext } from '../context/subscriberContext'

function AddSubscriber(){
    const { addSubscriber } = useSubscriberContext();
    const [fields, setFields] = useState({
        name:'',
        email:'',
        state:'active',
        error:'',
        haserror:false
    });

    const navigate = useNavigate();

    const handleInputChange = (event) => {
         setFields({
            ...fields,
            [event.target.name]:event.target.value
         })
    }

    const handleSubmit = (event) => {
        if(fields.name ===  '')
        {
            setFields({
                ...fields,
                'error':'Name is required','haserror':true
            });
            event.preventDefault();
            return false;
        }
        if(fields.email ===  '')
        {
            setFields({
                ...fields,
                'error':'Email is required','haserror':true
            });
            event.preventDefault();
            return false;
        }
        if(fields.state ===  '')
        {
            setFields({
                ...fields,
                'error':'State is required','haserror':true
            });
            event.preventDefault();
            return false;
        }
        const data = {
            name:fields.name,
            email:fields.email,
            state:fields.state
        }

        addSubscriber(data).then(() => {
            navigate('/');
        }).catch(error => {
            console.log(error);
        })
    }

    return(
        <div className="container my-5">
            <div className="row justify-content-md-center">
            <form className="col-md-5 border border-primary p-3">
                {fields.haserror === true &&
                <p className="text-danger">{fields.error}</p>
                }
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" name="name" className="form-control" onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" className="form-control" onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label>State</label>
                    <select className="form-select" onChange={handleInputChange} name="state">
                        <option value="active">Active</option>
                    </select>
                </div>                
                <button onClick={handleSubmit} type="button" className="btn btn-primary w-100 mt-3">Add Subscriber</button>
            </form>
            </div> 
        </div>
    );
}

export default AddSubscriber;