'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchBar from '../Searchbar/Searchbar';
import './AllGamesList.css';

interface Game {
  id: string;
  name: string;
  category: string;
  image: string;
  votes: Array<{ user: { name: string; id: string } }>;
}

const AllGameList = () => {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get<Game[]>(process.env.NEXT_PUBLIC_API_URL + '/games');
        setGames(response.data);
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };
  
    fetchGames();
  }, []);

  return (
    <div className='AllGameList'>
      <SearchBar />
      <div className='games-container'>
      {games.map((game) => (
        <div key={game.id} className='game-card'>
          <img src={game.image} alt={game.name} />
          <h2>{game.name}</h2>
          <p>{game.category}</p>
        </div>
      ))}
      </div>
    </div>
  );
};

export default AllGameList;