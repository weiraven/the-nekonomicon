import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import CatCard from './components/CatCard';
import BanList from './components/BanList';

const API_KEY = import.meta.env.VITE_CAT_API_KEY;

function App() {
  const [history, setHistory] = useState([]);
  const [cat, setCat] = useState(null);
  const [banList, setBanList] = useState({
    breeds: [],
    origins: [],
    temperaments: []
  });
  

  const fetchCat = async () => {
    let newCat = null;
    let attempts = 0;
  
    while (!newCat && attempts < 30) {
      const response = await axios.get("https://api.thecatapi.com/v1/images/search?include_breeds=1", {
        headers: {
          "x-api-key": API_KEY
        }
      });
  
      const result = response.data[0];
      const breed = result.breeds[0];
  
      if (!breed) {
        attempts++;
        continue;
      }
      
      const name = breed.name.trim().toLowerCase();
      const origin = breed.origin.trim().toLowerCase();
      const temperamentTraits = breed.temperament
      ? breed.temperament.split(',').map(t => t.trim().toLowerCase())
      : [];

      console.log("Checking cat:", {
        name: breed.name,
        origin: breed.origin,
        temperamentTraits
      });
      console.log("Ban list:", banList);
      
      const isBanned =
        banList.breeds.includes(name) ||
        banList.origins.includes(origin) ||
        temperamentTraits.some(trait => banList.temperaments.includes(trait));
      
  
      console.log("Is banned?", isBanned);

      if (isBanned) {
        console.log(`🚫 Cat "${breed.name}" banned due to:`, {
          breedMatch: banList.breeds.includes(name),
          originMatch: banList.origins.includes(origin),
          temperamentMatches: temperamentTraits.filter(trait => banList.temperaments.includes(trait))
        });
        attempts++;
        console.log(`❌ Attempt ${attempts} rejected. Trying again...`);
        continue;
      }    
  
      newCat = {
        image: result.url,
        name: breed.name,
        origin: breed.origin,
        temperament: breed.temperament
      };
    }
  
    if (newCat) {
      setCat(newCat);
      setHistory(prev => [...prev, newCat]);
    } else {
      alert("🕯️ The void echoes with silence. No cats remain unbanished.");
    }
  };

  const recallCat = (index) => {
    const recalledCat = history[index];
    setCat(recalledCat);
  };  

  const toggleBanAttribute = (type, value) => {
    const normalized = value.trim().toLowerCase();
  
    setBanList((prev) => {
      const list = prev[type];
      const updatedList = list.includes(normalized)
        ? list.filter(item => item !== normalized)
        : [...list, normalized];
  
      return {
        ...prev,
        [type]: updatedList
      };
    });
  };  

  return (
    <div className="app">
    <h1>🕯️ The Nekonomicon 🕯️</h1>
    <div className="summon-wrapper" onClick={fetchCat}>
      <img
        src="images/cat_pentagram.png"
        alt="Cat Summoning Circle"
        className="summon-circle"
      />
      <span className="summon-text">Summon</span>
    </div>
    <div className="main-columns">
      <div className="history-container">
        <h3>Recall</h3>
        <ul>
          {history.map((pastCat, index) => (
            <li key={index} onClick={() => recallCat(index)} className="recall-item">
              {pastCat.name}
            </li>
          ))}
        </ul>
      </div>

      {cat && <CatCard cat={cat} onBanClick={toggleBanAttribute} />}

      <BanList banList={banList} onRemove={toggleBanAttribute} />
    </div>
  </div>
  );
}

export default App;
