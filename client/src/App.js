import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  const [listOfEmails, setListOfEmails] = useState([]);
  
  useEffect(() => {
      axios.get("http://localhost:5000/api/emails").then((res) => {
        console.log(res.data);
        setListOfEmails(res.data);
      })
  }, []);

  return (
    <div className="App"> 
      {listOfEmails.map((value, key)=> {
        return <div> {value} </div>;
        })}
      <header className="App-header">
      My Emails:
      </header>
    </div>
  );
}

export default App;
