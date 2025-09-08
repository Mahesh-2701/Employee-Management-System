import React,{useState,useEffect} from 'react'
import Sidebar from './sidebar'
import EmpTable from './empTable'
import Settings from './settings'
import axios from 'axios'

export default function App() {
    
  return (
    <div className='container-fluid'>
     <div className='row'>
        <div className='col-2'>
          <Sidebar></Sidebar>
        </div>
        <div className='col-10'>
           <Settings></Settings>
           <hr></hr>
           <EmpTable ></EmpTable>
        </div>

     </div>
    </div>
  )
}
