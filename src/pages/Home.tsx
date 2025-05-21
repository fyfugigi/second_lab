import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme, Theme } from '../context/ThemeContext';
import '../styles/Home.css';

const themes: Theme[] = ['space', 'fantasy', 'classic'];

const themeNames: Record<Theme, string> = {
  space: 'Космічне протистояння 🧑‍🚀👽',
  fantasy: 'Фентезі 🏰🧙‍♂️',
  classic: 'Класика ❌⭕',
};

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { setTheme } = useTheme();

  const handleSelectTheme = (theme: Theme) => {
    setTheme(theme);
    navigate('/game');
  };

  return (
    <div className="home-container">
      {themes.map((theme) => (
        <button
          key={theme}
          className={`theme-button theme-${theme}`}
          onClick={() => handleSelectTheme(theme)}
        >
          {themeNames[theme]}
        </button>
      ))}
    </div>
  );
};

export default Home;
