import React, {useState, useEffect} from 'react';
import NavBar from '../components/NavBar'
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '/logo.png'
import '../styles/home.css'
import MoodInput from '../components/MoodInput'
import RelatedArtistsInput from '../components/RelatedArtistsInput'
import GenreInput from '../components/GenreInput'
import NamePlaylistInput from '../components/NamePlaylistInput';

const HomePage = () => {
  const [currentStage, setCurrentStage] = useState(0);
  const [userInput, setUserInput] = useState({useRelatedArtists: false,  selectedGenres: []});
  const [username, setUsername] = useState('No username');
  const [profilePicture, setProfilePicture] = useState(logo);
  const [genreList, setGenreList] = useState([
    { value: 'genre1', label: 'Genre 1' },
    { value: 'genre2', label: 'Genre 2' },
]);
  const navigate = useNavigate();
  const location = useLocation();

  const handleCreatePlaylist = async () => {
    try {
      const token = localStorage.getItem('authToken');

      const response = await axios.post(
          'http://localhost:3000/api/spotify/generate-playlist',
          userInput,
          {
              headers: {
                  Authorization: `Bearer ${token}`,
              },
          }
      );
      const { playlistUrl, playlistId } = response.data;
      console.log(playlistUrl)
      navigate('/playlist', { state: { username, playlistUrl, playlistId, profilePicture } });
    } catch(err){
      console.error("Error creating playlist:", err);
    }
  }
  
  const inputStage = [
    <MoodInput userInput={userInput} setUserInput={setUserInput} onNext = {onNext} username = {username}/>,
    <RelatedArtistsInput userInput={userInput} setUserInput={setUserInput} onNext = {onNext} onPrevious = {onPrevious}/>,
    <GenreInput userInput={userInput} setUserInput={setUserInput} onNext = {onNext} onPrevious = {onPrevious} genreList = {genreList}/>,
    <NamePlaylistInput userInput={userInput} setUserInput={setUserInput} handleCreatePlaylist = {handleCreatePlaylist} onPrevious = {onPrevious}/>,
  ];

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    if (token){
      localStorage.setItem('authToken', token); 
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const username = params.get('username');
      const profilePicture = params.get('profilePicture');
      const genres = params.get('genres');
      const parsedGenres = genres
          ? JSON.parse(decodeURIComponent(genres)).map((genre) => ({
                label: genre,
                value: genre,
            }))
          : [];
      if (genres) setGenreList(parsedGenres);
      if (genres) setGenreList(parsedGenres); 
      if (username) {setUsername(username); localStorage.setItem('username', username);}
      if (profilePicture) {setProfilePicture(profilePicture); localStorage.setItem('profilePicture', profilePicture);}
      window.history.replaceState({}, document.title, '/');
    };
  }, [location]);

  function onNext(stage = 1) {
    setCurrentStage((prevStage) => prevStage + stage);
  }
  
  function onPrevious(stage = 1) {
    setCurrentStage((prevStage) => prevStage - stage);
  }
  return (
    <>
      <NavBar profilePicture={profilePicture}/>
      <div className = 'input-container'> {inputStage[currentStage]} </div>
    </>
  )
}

export default HomePage
