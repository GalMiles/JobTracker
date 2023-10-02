import './App.css';
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
      <div className='column'>
      <label> Email Title: </label>
      <input type="text" onChange={event => {setEmailTitle(event.target.value);}} />
      <label> Email body: </label>
      <input type="text" onChange={event => {setEmailBody(event.target.value);}}/>
      </div>

      <div className='column'>
      <label> Job Title: </label>
      <input type="text" onChange={event => {setJoblTitle(event.target.value);}} />
      <label> Job Company: </label>
      <input type="text" onChange={event => {setJobCompany(event.target.value);}} />
      </div>
      </div>
      <button onClick={addToList}> Add To List</button>

      

      <h1> Emails List </h1>

      {emailsList.map((val,key)=>{
        return (
        <div key={key} className='job'>
          <h4> {val.jobTitle}</h4>
          <p> {val.jobCompany}</p> 
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
      })}

    </div>

  );
}
export default App;

// Components
// import Navbar from './components/Navbar';

// function App() {

//   const [listOfEmails, setListOfEmails] = useState([]);
  
//   useEffect(() => {
//       axios.get("http://localhost:5000/api/emails").then((res) => {
//         console.log(res.data);
//         setListOfEmails(res.data);
//       })
//   }, []);

//   return (
    
//     <div className="App"> 
    
//     <header className="App-header">
//       My Emails:
//       </header>
      
      
//       {listOfEmails.map((value, key)=> {
//         return <div> {value} </div>;
//         })}
      
//     </div>
//   );
// }

// export default App;
