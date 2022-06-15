import { useEffect } from 'react';
import React from 'react';
import { useSubscriberContext } from '../context/subscriberContext'
import http from '../http-common'
import { useNavigate } from "react-router-dom"

function Welcome()
{
  const { subscribers,setSubscribers } = useSubscriberContext();
  const navigate = useNavigate();

  useEffect(() => {
    http.get('subscribers').then(response => {
    //  console.log(response)
        setSubscribers(response.data.data);
    }).catch(error => {
       console.log(error);
    });
  },[]);

  const refreshSubscribers = () => {
      http.get('subscribers').then(response => {
      //  console.log(response)
          setSubscribers(response.data.data);
      }).catch(error => {
         console.log(error);
      });
  }

  const handleDelete = (event) => {
    http.delete('subscribers/'+event.target.id).then(response => {
        console.log(response);
        refreshSubscribers();
    }).catch(error => {
        console.log(error);
    })
  }

  const sub_list = subscribers.map(subscriber => 
    <tr key={subscriber.id}>
      <td>{subscriber.id}</td>
      <td>{subscriber.name}</td>
      <td>{subscriber.email}</td>
      <td>{subscriber.state}</td>
      <td><a id={subscriber.id} onClick={handleDelete}>Delete</a></td>
    </tr>);
  return (
    <div className="container my-3">
       <h1>Subscribers List</h1>
       <table className='table table-bordered'>
          <thead>
            <tr>
              <td>ID</td>
              <td>Name</td>
              <td>Email</td>
              <td>State</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
              {sub_list}
          </tbody>
       </table>
    </div>
  );
}

export default Welcome;