import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  
  useEffect(() => {
      axios.get("http://localhost:5000/api/emails").then((res) => {
        console.log(res.data);
      })
  }, []);

  return (
    <div className="App">
      <header className="App-header">
      My Emails:
      </header>
    </div>
  );
}

export default App;
