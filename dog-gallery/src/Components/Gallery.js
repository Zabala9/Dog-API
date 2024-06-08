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
    const [loadCount, setLoadCount] = useState(10);
    const [isLoading, setIsLoading] = useState(true);

    console.log(breeds, 'breeds');
    console.log(images, 'images');

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
        setLoadCount(10);
    };

    return (
        <div className="gallery">
            { isLoading ? 
                <label>Loading breeds...</label>
             : 
                <>
                    <select multiple value={selectedBreeds} onChange={breedChange} id="select-breed">
                        {breeds.map(breed => (
                            <option key={breed} value={breed}>
                                {breed.charAt(0).toUpperCase() + breed.slice(1)}
                            </option>
                        ))}
                    </select>
                    <div>

                    </div>
                </>
            }
        </div>
    );
}

export default Gallery;