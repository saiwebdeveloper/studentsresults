import React, { useState } from 'react';

function App() {
  const [hallTicketNumber, setHallTicketNumber] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3001/student-result', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ hallTicketNumber }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.message) {
          setError(data.message);
          setResult(null);
        } else {
          setResult(data);
          setError(null);
        }
      })
      .catch(err => {
        setError('An error occurred');
        setResult(null);
      });
  };

  return (
    <div>
      <h1>Check Student Results</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Hall Ticket Number:
          <input
            type="text"
            value={hallTicketNumber}
            onChange={(e) => setHallTicketNumber(e.target.value)}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      {error && <p>{error}</p>}
      {result && (
        <div>
          <h2>Result</h2>
          <p>Name: {result.name}</p>
          <p>Age: {result.age}</p>
          <p>Grade: {result.grade}</p>
          <p>Status: {result.status}</p>
        </div>
      )}
    </div>
  );
}

export default App;
