import { useEffect } from 'react';
import React from 'react';
import { useSubscriberContext } from '../context/subscriberContext'
import { Link } from "react-router-dom"
import swal from 'sweetalert2'

function Welcome()
{
  const { subscribers,getAllSubscribers,deleteSubscriber,refreshSubscribers } = useSubscriberContext();
  
  useEffect(() => {
    getAllSubscribers();
  },[]);
  
  const handleDelete = (event) => {
    swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this record!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    })
    .then((willDelete) => {
      if (willDelete.value) {
        deleteSubscriber(event.target.id).then(response => {
          swal.fire("Poof! record has been deleted!", {
            icon: "success",
          });
          refreshSubscribers();
        }).catch(error => {
          console.log(error)
        })
      } else {
        swal.fire("Your record is safe!");
      }
    });

    
  }

  const sub_list = subscribers.map(subscriber => 
    <tr key={subscriber.id}>
      <td>{subscriber.id}</td>
      <td>{subscriber.name}</td>
      <td>{subscriber.email}</td>
      <td>{subscriber.state}</td>
      <td>
        <a id={subscriber.id} onClick={handleDelete}>Delete</a>
        <Link to={"subscriber/edit/"+subscriber.id}>Edit</Link>
      </td>
    </tr>);
  return (
    <div className="container my-3">
       <h1>Subscribers List</h1>
       <Link to="/subscriber/add" type='button' className='btn btn-success mb-3'>Add Subscriber</Link>
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