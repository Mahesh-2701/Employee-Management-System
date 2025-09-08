import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link,useParams } from 'react-router-dom';

export default function Empview() {
   
    const {emp_id} = useParams();

    const [employee,setEmployee]=useState({});

    useEffect(()=>{
         axios.get("http://localhost:3006/emp/view/"+emp_id).then((res)=>setEmployee(...res.data)).catch((err)=>console.log(err));
    },[])

  return (
    <div>

       <div className='d-flex gap-2 align-items-center'>
               <Link to="/" className="btn btn-light rounded-50"><h4>&lt;</h4></Link>
               <h4>View Details</h4>
             </div>
             
             <h6 className='text-primary mt-2 d-flex gap-2 align-items-center'>
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                 <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
               </svg>
               Personal Details
             </h6>
             <hr></hr>
        <div className='row'>
            
            <label className='fw-bold form-label'>Image</label>
            <div className='col-12'>
              <img src={ employee.image && employee.image !== "null"? "http://localhost:3006"+employee.image : "https://i.pinimg.com/736x/14/90/37/14903760921cb84b305290a3ad4f596c.jpg"} alt='image' className='img-fluid rounded-3' width="60px"></img>
            </div>

            <div className='col-6 mt-2'>
              <label className=' form-label'>Name</label>
              <h6>{employee.name}</h6>
              <hr></hr>
              <label className=' form-label'>Department</label>
              <h6>{employee.department}</h6>
              <hr></hr>
              <label className=' form-label'>Project</label>
              <h6>{employee.project}</h6>
              <hr></hr>
              <label className=' form-label'>Status</label>
              <h6>{employee.status}</h6>
              <hr></hr>
            </div>
            <div className='col-6'>
              <label className=' form-label'>ID</label>
              <h6>{employee.emp_id}</h6>
              <hr></hr>
              <label className=' form-label'>Designation</label>
              <h6>{employee.designation}</h6>
              <hr></hr>
              <label className=' form-label'>Type</label>
              <h6>{employee.type}</h6>
              <hr></hr>
            </div>

        </div>
    </div>
  )
}
