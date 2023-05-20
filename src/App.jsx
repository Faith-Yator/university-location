import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const App =() => {
  const [searchParam,setSearchParam] =useState('');
  const [universities,setUniversities] =useState([]);
  const[loading,setLoading]=useState(false);
  const[error,setError]=useState(null);

  useEffect(()=>{
    const fetchUniversities= async() =>{
      if(searchParam){
        setLoading(true);
        setError(null);

        try{
          const response = await fetch('http://universities.hipolabs.com/search?country=${searchParam}');
          const data =await response.json();
          setUniversities(data);
        }
        catch(error){
          setError('Ooop!! Error fetching universities.Try again later!!');
        }
        setLoading(false)
      }
    };
    fetchUniversities();
  },[searchParam]);
  const handleSearch = ()=>{
    setUniversities([]);
    setError(null);
  };
  
  return (
    <div className='form'>
    <h1 className='header'>University Placement and Location Form.</h1>
    <input className='input'  type= 'text' value={searchParam} onChange={(e) => setSearchParam(e.target.value)} placeholder='Enter country name'/>

      <button className='btn' onClick={handleSearch}>search</button>
      {loading ?(
        <p>Loading</p>
      ):error?(
        <p>{error}</p>
      ): universities.length>0?(
        <ul>
          {universities.map((university) =>(
            <li key={university.name}>
              <h3>{university.name}</h3>
          <p>{university.country}</p>
          <p>{university.weblink}</p>
          </li>
          ))}
        </ul>
      ):(
        <p> Ooop!!! No universities found.</p>
      )
      }
    
    </div>
  );
};

export default App;
