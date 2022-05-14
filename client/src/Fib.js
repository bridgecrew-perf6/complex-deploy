import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Fib = () => {
  const [seenIndexes, setSeenIndexes] = useState([]);
  const [values, setValues] = useState({});
  const [index, setIndex] = useState('');

  useEffect(() => {
    if(index === '') {
      fetchValues();
      fetchIndexes();
    }
  }, [index])

  const fetchValues = async () => {
    const {data} = await axios.get('/api/values/current');
    setValues(data);
  }

  const fetchIndexes = async () => {
    const {data} = await axios.get('/api/values/all');
    setSeenIndexes(data);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    await axios.post('/api/values', {
      index: index,
    });
    setIndex('');
  };

  const renderValues = () => {
    const entries = [];
  
    for (let key in values) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {values[key]}
        </div>
      );
    }
  
    return entries;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter your index:</label>
        <input
          value={index}
          onChange={({target: {value}}) => setIndex(value)}
        />
        <button>Submit</button>
      </form>

      <h3>Indexes I have seen:</h3>
      {seenIndexes.map(({ number }) => number).join(', ')}

      <h3>Calculated Values:</h3>
      {renderValues()}
    </div>
  );
}

export default Fib;