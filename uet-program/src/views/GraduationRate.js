import React, { useEffect, useState } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { request, setAuthHeader } from '../helpers/axios_helper';

export default function GraduationRate() {
  const [data, setData] = useState([])
  const [input, setInput] = useState('')
  const [count, setCount] = useState(0)
  const [status, setStatus] = useState('unload')

  const handleInput = (event) => {
    setInput(event.target.value)
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(input)
    console.log(input)
    request(
    "GET",
    `statistic/graduation?cohort=${input}`,
    {}).then(
    (response) => {
      console.log(response.data)
      setData(response.data)
    }).catch(
    (error) => {
        if (error.response.status === 401) {
            // setAuthHeader(null);
        } else {
            this.setState({data: error.response.code})
        }
    }
  );
  // setCount(count + 1);
  setStatus('loading')
  }

  useEffect(() => {
    if(status==='loading') {
      setStatus('loaded')
    }
  },[data])
    return (
      <div className='container pt-5'>
        <br></br>
          <div>
            <h1 className="text-center">Graduation Rate</h1>
          </div>
        <form onSubmit={handleSubmit}> 
          <div className='form-group'>
            <label>Cohort:</label>
            <input type="text" className="form-control" onChange={handleInput} ></input><br></br>
          </div>
        <button type="submit" className='btn btn-primary'>Search</button>
        </form>
        {
          status === 'loading' ?
          <div className="row text-center">
             <h1>Loading...</h1>
          </div>
          : ''
        }
        {
          status === 'loaded' ?
          <div>
          <BarChart
          width={1300}
          height={600}
          data={data}
          margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="grad" stackId="a" fill="#8884d8" />
      <Bar dataKey="total" stackId="a" fill="#82ca9d" />
      </BarChart>
      <h4 className='text-center'>Graduation Rate of {input}</h4>
      </div>
      : ''
        }
      </div>
    );
}
