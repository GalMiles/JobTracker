import './App.css';
import Table from './components/Table';
import { useState, useEffect } from 'react';
import axios from "axios";

// Brit Try
function App(){

  const [emailTitle, setEmailTitle] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [jobTitle, setJoblTitle] = useState('');
  const [jobCompany, setJobCompany] = useState('');

  const[emailsList,setEmailsList] = useState([]);
  const [newJobTitle, setNewJobTitle] = useState('');

  useEffect(()=>{
    axios.get("http://localhost:5000/read").then((response)=>{
      setEmailsList(response.data);
      console.log('');
    });
  },[]);


  // insert new information
  const addToList = async () => {
    try {
      const response = await axios.post("http://localhost:5000/insert", {
        emailTitle,
        emailBody,
        jobTitle,
        jobCompany,
      });

      if (response.status === 200) {
        // Print to the console when data is successfully added to the database.
        console.log('Email added successfully!');
      } else {
        // Handle any errors that may occur.
        console.error('Error adding email:', response.status);
      }
    } catch (error) {
      // Handle any errors that may occur.
      console.error('Error adding email:', error);
    }
  };

  const updatejobtitle = (id) => {
    axios.put("http://localhost:5000/update", {
      id: id, 
      newJobTitle: newJobTitle,
    });
  };

  const deleteJob = (id) => {
    axios.delete(`http://localhost:5000/delete/${id}`)
    
  };

  return(
    <div className ="App">
      <div className='header'>
      <img src='/app-logo1.png' alt='app-logo' className='img-logo' height={120} />
      </div>

      <div className='input-container'> 
      <div className='row'>
      <label> Job Title: </label>
      <input type="text" onChange={event => {setJoblTitle(event.target.value);}} />
      <label> Job Company: </label>
      <input type="text" onChange={event => {setJobCompany(event.target.value);}} />
      </div>
      </div>
      <button onClick={addToList}> Add To List</button>

      

      <h1> Emails List </h1>
      <Table />
{/* 
      {emailsList.map((val,key)=>{
        return (
        <div key={key} className='job'>
          <h4> {val.jobCompany}</h4>
          <h1> {val.jobTitle}</h1>
          <p>{val.date}</p>
          <input 
          type="text" 
          placeholder='New job title...' 
          onChange={(event) => {
            setNewJobTitle(event.target.value);
            }}
          />
          <button onClick={() => updatejobtitle(val._id)}> Update </button>
          <button onClick={() => deleteJob(val._id)}> Delete</button>
          </div>
        );
      })} */}

    </div>

  );
}
export default App;

