import './App.css';
// import React, {useState, useEffect} from 'react';
import Sitebar from './Components/Navbar';

// const [sessionToken, setSessionToken] = useState('');

// useEffect(() => {
//   if (localStorage.getItem('token')) {
//     setSessionToken(localStorage.getItem('token'));
//   }
// }, [])

// const updateToken = (newToken) => {
//   localStorage.setItem('token', newToken);
//   setSessionToken(newToken);
//   console.log(sessionToken);
// }

function App() {
  return (
    <div>
      <Sitebar />
    </div>
  );
}

export default App;
