import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component"; 
import { useNavigate } from 'react-router-dom'

const columns = [
  {
    name: "Name",
    selector: "name",
    sortable: true,
  },
  
  {
    name: "Age/Sex",
    selector: "age/sex",
    format: (row) => `${row.age} years/${row.sex}`,
    sortable: true
  },
  {
    name: "Mobile",
    selector: "mobile",
  },
  {
    name: "Address",
    selector: "address",
  },
  {
    name: "Govt ID",
    selector: "id",
    format: (row) => `${row.id}/${row.idType}`,
  },
  {
    name: "Guardian Details",
    selector: "guardianName",
    format: (row) => `${row.guardianName}/${row.guardian}`,

  },
  {
    name: "Nationality",
    selector: "nationality",
  },

];



const Dashboard = () => {
  const [details, setDetails] = useState([]);
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate()

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const filteredData = details.filter((item) => 
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  useEffect(() => {
    axios.get('http://localhost:8080/formData')
      .then((res) => {
          setDetails(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  },[searchText])
  return (
    <div className="w-full">
      <div className="w-full flex justify-between pt-8">
        <button className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-md" onClick={() => navigate('/form')} >New</button>
        <input type="text" className="border rounded-md mr-6 h-8 pl-1" value={searchText} onChange={handleSearch} placeholder="Search Here..." />
      </div>
      <DataTable columns={columns} data={filteredData} pagination />
    </div>
  );
};

export default Dashboard;
