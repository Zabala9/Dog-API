import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Gallery.css'

function Gallery(){
    const navigate = useNavigate();
    const [breeds, setBreads] = useState([]);
    const [images, setImages] = useState([]);
    const [displayImages, setDisplayImages] = useState([]);
    const [selectedBreeds, setSelectedBreeds] = useState([]);
    const [loadCountImages, setLoadCountImages] = useState(10);
    const [loadCountBreeds, setLoadCountBreeds] = useState(10);
    const [isLoading, setIsLoading] = useState(true);

    console.log(selectedBreeds, 'selected');

    useEffect(() => {
        axios.get('https://dog.ceo/api/breeds/list/all')
            .then(response => {
                const breedList = Object.keys(response.data.message);
                setBreads(breedList);
                fetchAllImages(breedList);
                setIsLoading(false);
            })
            .catch(error => console.error('Error fetching breeds: ', error));
            setIsLoading(false);
    }, []);

    const fetchAllImages = (breedList) => {
        breedList.forEach(breed => {
            axios.get(`https://dog.ceo/api/breed/${breed}/images`)
                .then(response => {
                    const allImages = response.data.message.slice(0, 10).map(imgUrl => ({
                        breed,
                        imgUrl
                    }));
                    setImages(prevImages => [...prevImages, ...allImages]);
                    setDisplayImages(prevImages => [...prevImages, allImages]);
                })
                .catch(error => console.error(`Error fetching images for breed ${breed}: `, error));
        });
    };

    const loadMoreBreedsOptions = () => {
        setLoadCountBreeds(prev => prev+10);
    };

    const breedSelect = (breed) => {
        if(!selectedBreeds.includes(breed)){
            setSelectedBreeds(prev => [...prev, breed] )
        }
        setLoadCountImages(10);
    };

    return (
        <div className="gallery">
            { isLoading ? 
                <label id="loading-label">Loading breeds...</label>
             : 
                <>
                    <label id="label-welcome">Welcome!</label>
                    <div className="selected-breeds-container">
                        <label id="label-breeds-selected">Breeds selected: </label>
                        <div>
                            { selectedBreeds.length > 0 ? 
                                selectedBreeds.map(breed => (
                                    <label id="label-breed-selected">
                                        {breed}
                                    </label>))
                                : 
                                <label id="label-none-selected">None</label>
                            }
                        </div>
                    </div>
                    <div className="breeds-options-container">
                        <label id="label-select-breed">Select the breeds you want to see!</label>
                        <div>
                            {breeds.map((breed, index) => (
                                index < loadCountBreeds ? 
                                    <button id="button-breed" onClick={() => breedSelect(breed)}>
                                        {breed}
                                    </button>
                                    :
                                    undefined
                            ))}
                        </div>
                        <button id="button-load-breeds" onClick={loadMoreBreedsOptions}>
                            Load more breeds!
                        </button>
                    </div>
                </>
            }
        </div>
    );
}

export default Gallery;