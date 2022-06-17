import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSubscriberContext } from '../context/subscriberContext'

function EditSubscriber(){
    const { getaSubscriber,updateSubscriber } = useSubscriberContext();
    const params = useParams();
    const navigate = useNavigate();
    const [subscriber, setSubscriber] = useState({
        name:'',
        email:'',
        state:''
    });

    const [fields,setFields] = useState({
        error:'',
        haserror:false
    });

    useEffect(() => {
        getaSubscriber(params.id).then(response => {
            setSubscriber({
                ...subscriber,
                name:response.data.data.name,email:response.data.data.email,state:response.data.data.state
            });
        }).catch(error => {
            console.log(error);
        })
    },[]);

    const handleInputChange = (event) => {
        setSubscriber({
           ...subscriber,
           [event.target.name]:event.target.value
        })
   }

   const handleSubmit = (event) => {
        if(subscriber.name === '')
        {
            setFields({
                ...fields,
                'error':'Name is required field','haserror':true
            });
            event.preventDefault();
            return false;
        }
        if(subscriber.state === '')
        {
            setFields({
                ...fields,
                'error':'State is required field','haserror':true
            });
            event.preventDefault();
            return false;
        }
        const data = {
            name:subscriber.name,
            email:subscriber.email,
            state:subscriber.state
        }
        updateSubscriber(params.id,data).then(() => {
            navigate('/');
        }).catch(error => {
            console.log(error)
        })
   }

    return(
        <div className="container my-5">
            <div className="row justify-content-md-center">
            <form className="col-md-5 border border-primary p-3">
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" name="name" className="form-control" onChange={handleInputChange} value={subscriber.name} />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" className="form-control" onChange={handleInputChange} value={subscriber.email} disabled="disabled" />
                </div>
                <div className="form-group">
                    <label>State</label>
                    <select className="form-select" onChange={handleInputChange} name="state">
                        <option value="active">Active</option>
                    </select>
                </div>                
                <button onClick={handleSubmit} type="button" className="btn btn-primary w-100 mt-3">Update Subscriber</button>
            </form>
            </div> 
        </div>
    );
}

export default EditSubscriber;