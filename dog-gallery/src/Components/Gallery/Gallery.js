import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from 'axios';
import './Gallery.css'

function Gallery(){
    const location = useLocation();
    const { name } = location.state || {};
    const [breeds, setBreads] = useState([]);
    const [images, setImages] = useState([]);
    const [displayImages, setDisplayImages] = useState([]);
    const [selectedBreeds, setSelectedBreeds] = useState([]);
    const [loadCountImages, setLoadCountImages] = useState(15);
    const [loadCountBreeds, setLoadCountBreeds] = useState(10);
    const [isLoading, setIsLoading] = useState(true);

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
        let allImages = [];
        breedList.forEach(breed => {
            axios.get(`https://dog.ceo/api/breed/${breed}/images`)
                .then(response => {
                    const allBreedImages = response.data.message.slice(0, 2).map(imgUrl => ({
                        breed,
                        imgUrl
                    }));
                    allImages = [...allImages, ...allBreedImages];
                    setDisplayImages(allImages);
                })
                .catch(error => console.error(`Error fetching images for breed ${breed}: `, error));
        });
    };

    const fetchSpecificBreed = (breed) => {
        axios.get(`https://dog.ceo/api/breed/${breed}/images`)
            .then(response => {
                const imagesBreed = response.data.message.map(imgUrl => ({
                    breed,
                    imgUrl
                }));
                setImages(prevImages => {
                    const updatedImages = [...prevImages, ...imagesBreed];
                    setDisplayImages(updatedImages);
                    return updatedImages;
                });
            })
            .catch(error => console.error(`Error fetching images for breed ${breed}: `, error));
    };

    const loadMoreBreedsOptions = () => {
        setLoadCountBreeds(prev => prev+10);
    };

    const loadMoreImages = () => {
        setLoadCountImages(prev => prev+15);
    };

    const breedSelect = (breed) => {
        setSelectedBreeds(prev => {
            if(prev.includes(breed)){
                setLoadCountImages(80);
                const newSelectedBreeds = prev.filter(b => b !== breed);

                if(newSelectedBreeds.length === 0){
                    fetchAllImages(breeds);
                }
                return newSelectedBreeds;
            } else {
                fetchSpecificBreed(breed);
                setLoadCountImages(80);
                return [...prev, breed]
            }
        })
    };

    return (
        <div className="gallery">
            { isLoading ? 
                <label id="loading-label">Loading breeds...</label>
             : 
                <>
                    <label id="label-welcome">Welcome {name}!</label>
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
                                    <button key={breed} id="button-breed" onClick={() => breedSelect(breed)}
                                        style={{backgroundColor: selectedBreeds.includes(breed) ? '#4CAF50' : 'cornsilk'}}
                                    >
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
                    <div className="container-images">
                        { selectedBreeds.length > 0 ?
                            <label id="label-images">Images:</label>
                            :
                            <label id="label-images">All breeds:</label>
                        }
                        <div>
                            {
                            displayImages.map((image, index) => (
                                index < loadCountImages ? 
                                    <div>
                                        <img alt="" src={image.imgUrl} id="img-breed" />
                                        <label id="label-breed-name">Breed: {image.breed}</label>
                                    </div>
                                :
                                undefined
                            ))
                            }
                        </div>
                        <button id="button-load-images" onClick={loadMoreImages}>
                            Load more images!
                        </button>
                    </div>
                </>
            }
        </div>
    );
}

export default Gallery;