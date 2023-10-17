import React from 'react'
import { useState, useEffect } from 'react';
import axios from "axios";
import { DataGrid } from '@mui/x-data-grid';



function Table() {

    const [jobsList, setJobsList] = useState([]);


    useEffect(() => {
        axios.get("http://localhost:5000/read").then((response) => {
            const dataWithId = response.data.map((item) => ({
                id: item._id,
                jobTitle: item.jobTitle,
                jobCompany: item.jobCompany,
                date: item.date
              }));
            setJobsList(dataWithId);
            console.log(dataWithId);
        });
    }, []);


    const columns = [
        // { field: 'id', headerName: 'ID', width: 90 },
        { field: 'date', headerClassName: 'custom-header', headerName: 'Date', width: 200 },
        { field: 'jobCompany', headerClassName: 'custom-header', headerName: 'Company', width: 300 },
        { field: 'jobTitle', headerClassName: 'custom-header', headerName: 'Position', width: 300 }

    ];

    return (
        <div>
            <DataGrid
                rows={jobsList}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10, 25, 50]}
                disableSelectionOnClick
                sx={{
                    fontFamily: 'Poppins', // Change the font family
                    fontSize: '15px', // Change the font size

                
                }}
            />
        </div>
    )
}

export default Table

            {/* <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Company</th>
                        <th>Position</th>
                    </tr>
                </thead>
                <tbody>
                    {jobsList.map((job) => (
                        <tr key={job.id}>
                            <td>{job.date}</td>
                            <td>{job.jobCompany}</td>
                            <td>{job.jobTitle}</td>
                        </tr>
                    ))}
                </tbody>
            </table> */}