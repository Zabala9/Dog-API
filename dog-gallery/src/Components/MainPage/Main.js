import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Main.css';

function Main() {
    const navigate = useNavigate();
    const [name, setName] = useState('');

    const handleChangeName = (event) => {
        setName(event.target.value);
    };

    const handleContinue = () => {
        navigate('/gallery', { state: { name }});
    };

    return (
        <div className='main-page'>
            <label id='label-welcome'>Welcome to Dog's Breed webpage!</label>
            <p id='description'>
                In this page you will see pictures from
                different dog's breed, and also you can select an specific
                breed you want to see!
            </p>
            <label id='label-continue'>To continue, please enter you name bellow</label>
            <input id='input-name'
                value={name}
                onChange={handleChangeName}
            />
            <button id='button-continue' onClick={handleContinue}
                disabled={!name}
            >
                Continue
            </button>
        </div>
    )
};

export default Main;