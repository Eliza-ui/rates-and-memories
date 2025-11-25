import Header from "../src/components/Header.jsx";
import { useState } from "react";

function App() {
  const [name, setName] = useState('');
  const [listOfNames, setListOfNames] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newName = { name: name };
    setListOfNames([...listOfNames, newName]);
    console.log([...listOfNames, newName]);
    setName(''); 
  };

  return (
    <>
      <Header name="Rates and Memories For Beaches" />

      <h1>Sample</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter a name..."
        />
        <button type="submit">Search</button>
      </form>

     
      <div>
        <h2>Submitted Names:</h2>
        <ul>
          {listOfNames.map((item, index) => (
            <li key={index}>{item.name}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;