import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const DataTable = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [debounceTimer, setDebounceTimer] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setData(response.data); 
        setFilteredData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);



  const handleSearch = event => {
    const searchValue = event.target.value.toLowerCase();
    setSearchTerm(searchValue);

    clearTimeout(debounceTimer);

    // const filteredResults = data.filter(item =>
    //   item.title.toLowerCase().includes(searchValue)
    // );
    // setFilteredData(filteredResults);
    // console.log(filteredResults);


    const timer = setTimeout(() => {
       const filteredResults = data.filter(item =>
      item.title.toLowerCase().includes(searchValue)
    );
    setFilteredData(filteredResults);
    console.log(filteredResults);
    }, 3000);

    setDebounceTimer(timer);
  };

  return (
    <div className='container'>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search..."
      />

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Body</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.body}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
