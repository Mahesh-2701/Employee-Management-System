import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Link} from "react-router-dom"

export default function Empinsert() {

  const [employee,setEmployee]=useState({
      name:"",
      emp_id:"",
      department:"design",
      designation:"lead",
      project:"",
      type:"office",
      status:"temporary"
  });

  const [fileimage,setFileimage]=useState(null);

  function updat(eve){
        setEmployee({...employee,[eve.target.name]:eve.target.value})
  }

  function fileupload(eve){
         setFileimage(eve.target.files[0])
  }

  

  function inserting(eve){

    eve.preventDefault();

    const formdata=new FormData();
    formdata.append("image",fileimage);
    formdata.append("name",employee.name);
    formdata.append("emp_id",employee.emp_id);
    formdata.append("department",employee.department);
    formdata.append("designation",employee.designation);
    formdata.append("project",employee.project);
    formdata.append("status",employee.status);
    formdata.append("type",employee.type);

    axios.post("http://localhost:3006/emp/insert",formdata)
    .then((res)=>{

      if(res.data.success){
      alert("inserted succesfully")
      }
    })
    .catch((err)=>{
       if(err.response){
        alert(err.response.data.message || "Something went wrong");
      }
      else{
        alert("Server not reachable. Try again later.");
      }
  })
  }
 
  console.log(employee)
  return (
    <div className='container-fluid'>
      <div className='d-flex gap-2 align-items-center'>
        <Link to="/" className="btn btn-light rounded-50"><h4>&lt;</h4></Link>
        <h4>Employee Details</h4>
      </div>
      
      <h6 className='text-primary mt-2 d-flex gap-2 align-items-center'>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
          <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
        </svg>
        Personal Details
      </h6>
      <hr></hr>

      <form onSubmit={inserting} encType='multipart/form-data'>
      <div className='row'>
         <label className='fw-bold form-label'>Image</label>
         <div className='col-12 p-2'><input type="file" className='form-control w-50' name="image" onChange={fileupload}/></div>
         <div className='col-6 p-2'>
            

            <label className='fw-bold form-label'>Name *</label>
            <input type="text" placeholder='Name' className='form-control mb-2' name="name" onChange={updat} required></input>
           
            <label className='fw-bold form-label'>Department *</label>
            <select className="form-select mb-2" aria-label="Default select example" name="department" onChange={updat} required>
                <option value="design">Design</option>
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
                <option value="UI">UI/UX</option>
            </select>

            <label className='fw-bold form-label'>Project *</label>
            <input type="text" placeholder='Project' className='form-control mb-2' name="project" onChange={updat} required></input>

            <label className='fw-bold form-label'>Status *</label>
            <select class="form-select mb-2" aria-label="Default select example" name="status" onChange={updat} required>
                <option value="permanent">Permanent</option>
                <option value="temporary">Temporary</option>

            </select>
            
            
         </div>
         <div className='col-6 p-2'>
            
             <label className='fw-bold form-label'>Employee ID *</label>
            <input type="text" placeholder='Employee ID' className='form-control mb-2' name="emp_id" onChange={updat} required></input>

            <label className='fw-bold form-label'>Designation *</label>
            <select class="form-select mb-2" aria-label="Default select example" name='designation' onChange={updat} required>
                <option value="lead">Lead</option>
                <option value="manager">Manager</option>
                <option value="tester">Tester</option>
            </select>

            <label className='fw-bold form-label'>Type *</label>
            <select class="form-select mb-2" aria-label="Default select example" name="type" onChange={updat} required>
                <option value="office">Office</option>
                <option value="remote">Remote</option>
                <option value="hybrid">Hybrid</option>
            </select>

         </div>
        <div className=' col-12 my-2 d-flex justify-content-end gap-2'>
                <Link to="/" className='btn btn-danger'>Close</Link>
                <button type="submit" className='btn btn-primary'>Confirm</button>
        </div>
      </div>
      </form>
    </div>
  )
}
