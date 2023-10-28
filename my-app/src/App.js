import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import Home from './components/Home';

function App() {
  const [selectedTheme, setSelectedTheme] = useState('light');

  const toggleTheme = () => {
    setSelectedTheme(selectedTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className= {`App ${selectedTheme === 'dark' ? 'dark-theme' : ''}`}>
      <div className=" ">
        <button
          onClick={toggleTheme}
          className="bg-[grey] shadow-xl m-5 text-white font-bold py-2 px-4 rounded focus:outline-none"
        >
          <FontAwesomeIcon
          className='text-red-200'
            icon={selectedTheme === 'dark' ? faSun : faMoon}
            style={{ marginRight: '8px' }}
          />
           Theme
          <FontAwesomeIcon
          className='text-orange-500'
            icon={selectedTheme === 'dark' ? faSun : faMoon}
            style={{ marginLeft: '8px' }}
          />
        </button>
        <Home className="red" />

      </div>

    </div>
  );
}

export default App;
