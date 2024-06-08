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
    const [isLoading, setIsLoading] = useState(true);

    // console.log(selectedBreeds, 'selected');

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

    const breedChange = (event) => {
        const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
        setSelectedBreeds(selectedOptions);
        setLoadCountImages(10);
    };

    return (
        <div className="gallery">
            { isLoading ? 
                <label>Loading breeds...</label>
             : 
                <>
                    <div className="selected-breeds-container">
                        <label id="label-breeds-selected">Breeds selected: </label>
                        { selectedBreeds.map(breed => {
                            <label>
                                {breed}
                            </label>
                        })}
                    </div>
                    {breeds.map(breed => (
                        <button>
                            {breed}
                        </button>
                    ))}
                    <div>

                    </div>
                </>
            }
        </div>
    );
}

export default Gallery;