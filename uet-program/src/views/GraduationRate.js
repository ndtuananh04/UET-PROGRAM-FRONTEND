import React, { useEffect, useState } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { request, setAuthHeader } from '../helpers/axios_helper';
import Select from 'react-select';

export default function GraduationRate() {
  const [data, setData] = useState([])
  const [input, setInput] = useState('')
  const [status, setStatus] = useState('unload')
  const [listCohort, setListCohort] = useState([])

  useEffect(() => {
    request(
    "GET",
    'classrooms/listCohort',
    {}).then(
    (response) => {
      console.log(response.data)
      setListCohort(response.data)
    }).catch(
    (error) => {
        if (error.response.status === 401) {
            // setAuthHeader(null);
        } else {
            this.setState({data: error.response.code})
        }
    }
  );
},[]);

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
          <div className="form-group">
              <label>Cohort:</label>
              <Select
                  name="gender"
                  options={listCohort.map(t=>({value: t, label: t}))}
                  placeholder='None Selected'
                  onChange={e => setInput(e.value)}
                  className='form-control'
              >
              </Select><br></br>
            </div>
          <button type="submit" className='btn btn-primary'>Search</button>
        </form>
        {
          status === 'loading' ?
          <div class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
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
      <Bar dataKey="grad" stackId="a" fill="#275cd9" />
      <Bar dataKey="total" stackId="a" fill="#2786d9" />
      </BarChart>
      <h4 className='text-center'>Graduation Rate of {input}</h4>
      </div>
      : ''
        }
      </div>
    );
}
