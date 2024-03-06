// AllGamesList.tsx
'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchBar from '../Searchbar/Searchbar';
import './AllGamesList.css';
import { toast } from 'react-hot-toast';
import { useUser } from '@auth0/nextjs-auth0/client';
import { getUserByEmail } from '../../services/user.services';
import voteArrow from '../../assets/arrow-big-up-filled.svg'
import Image from 'next/image';

interface Game {
  id: string;
  name: string;
  category: string;
  image: string;
  votes: Array<{ user: { name: string; id: string } }>;
}

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  votes: Array<{ game: { id: string } }>;
  
}

const AllGameList = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [searchFilter, setSearchFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [voteOrder, setVoteOrder] = useState('');
  const { user, isLoading } = useUser();
  const [userData, setUserData] = useState<User | null>(null);

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

  if (voteOrder === 'Most Voted') {
    filteredGames = filteredGames.sort((a, b) => b.votes.length - a.votes.length);
  } else if (voteOrder === 'Least Voted') {
    filteredGames = filteredGames.sort((a, b) => a.votes.length - b.votes.length);
  }

  useEffect(() => {
    const fetchUser = async () => {
      if (user?.email) {
        const fetchedUser = await getUserByEmail(user.email);
        console.log('Fetched user:', fetchedUser); 
        setUserData(fetchedUser);
      }
    };
  
    fetchUser();
  }, [user]);

  const handleVoteClick = async (gameId: string) => {
    if (!user || !user.name || !userData?.id) { 
      toast.error('You need to login to vote.');
      return;
    }
  
    const userName = user.name || '';
    const userId = userData.id || ''; 
  
    const userVote = games.find(game => game.id === gameId)?.votes.find(vote => vote.user.id === userId);
  
    if (userVote) {
      try {
        await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/games/${gameId}/vote`, { data: { userId } });
        setGames(games.map(game => game.id === gameId ? { ...game, votes: game.votes.filter(vote => vote.user.id !== userId) } : game));
        toast.success('Vote removed successfully.');
      } catch (error) {
        toast.error('Error removing vote.');
      }
    } else {
      try {
        const payload = { userId };
        console.log('Sending vote with payload:', payload);
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/games/${gameId}/vote`, payload);
        setGames(games.map(game => game.id === gameId ? { ...game, votes: [...game.votes, { user: { name: userName, id: userId } }] } : game));
        toast.success('Vote added successfully.');
      } catch (error) {
        toast.error('Error adding vote.');
      }
    }
  };

  return (
    <div className='AllGameList'>
      <SearchBar onSearch={setSearchFilter} onCategoryChange={setCategoryFilter} onVoteOrderChange={setVoteOrder} />
      <div className='games-container'>
      {filteredGames.map((game) => {
        const userHasVoted = game.votes.some(vote => vote.user.id === userData?.id);
        return (
          <div key={game.id} className='game-card'>
            <img className="card-image" src={game.image} alt={game.name} />
            <div className='game-info'>
              <h2>{game.name}</h2>
              <h4>{game.category}</h4>
              <p>Votes: {game.votes.length}</p>
              <Image width={20} height={20} src={voteArrow}  alt="arrow" onClick={() => handleVoteClick(game.id)} style={{ filter: userHasVoted ? 'hue-rotate(90deg)' : 'none' }} />
            </div>
          </div>
        );
      })}
      </div>
    </div>
  );
};

export default AllGameList;