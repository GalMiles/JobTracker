import React from 'react'
import { useState, useEffect } from 'react';

function Emails() {

    const [emails, setEmails] = useState([]);
    useEffect(() => {
        fetchEmails();
    }, []);

    const fetchEmails = () => {
        fetch("http://localhost:5000/api/emails")
            .then((res) => res.json())
            .then((data) => setEmails(data.message));
    };

    return (
        <div>
            <h1>{emails}</h1>
        </div>
    )
}

export default Emails