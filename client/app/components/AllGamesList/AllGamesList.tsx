// AllGamesList.tsx
'use client'

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
  const [searchFilter, setSearchFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [voteOrder, setVoteOrder] = useState(''); // Agrega esta línea

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

  let filteredGames = games.filter(game => 
    game.name.toLowerCase().includes(searchFilter.toLowerCase()) &&
    (categoryFilter === '' || game.category === categoryFilter)
  );

  // Agrega este bloque
  if (voteOrder === 'Most Voted') {
    filteredGames = filteredGames.sort((a, b) => b.votes.length - a.votes.length);
  } else if (voteOrder === 'Least Voted') {
    filteredGames = filteredGames.sort((a, b) => a.votes.length - b.votes.length);
  }

  return (
    <div className='AllGameList'>
      <SearchBar onSearch={setSearchFilter} onCategoryChange={setCategoryFilter} onVoteOrderChange={setVoteOrder} />
      <div className='games-container'>
      {filteredGames.map((game) => (
        <div key={game.id} className='game-card'>
          <img src={game.image} alt={game.name} />
          <div className='game-info'>
            <h2>{game.name}</h2>
            <h4>{game.category}</h4>
            <p>Votes: {game.votes.length}</p>
            <button className='vote-button'>Like</button>
            <button className='vote-button'>Dislike</button>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
};

export default AllGameList;