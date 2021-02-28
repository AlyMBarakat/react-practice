import React, { useState, useEffect } from "react";
import pet, { ANIMALS } from "@frontendmasters/pet"
import useDropdown from "./useDropdown"

const SearchParams = () => {
    const [location, setLocation] = useState("Seattle, WA");
    const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
    const [breeds, setBreeds] = useState([]);
    const [breed, BreedDropdown, setBreed] = useDropdown("Breed", "", breeds);

    // const requestBreeds = async () => {
    //     try {
    //         const breedsResponse = await pet.breeds(animal);
    //         console.log(breedsResponse.breeds[0].name);
    //         // setBreeds(breedsResponse.breeds);
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    // useEffect(() => {
    //     setBreeds([]);
    //     setBreed("");
    //     requestBreeds();
    // }, [animal, setBreed, setBreeds]);

    useEffect(() => {
        setBreeds([]);
        setBreed("");

        pet.breeds(animal).then(({ breeds }) => {
            const breedNames = breeds.map(({ name }) => name);
            setBreeds(breedNames);

        }, console.error);
    }, [animal, setBreed, setBreeds]);

    return (
        <div className="search-params">
            <h1>{location}</h1>
            <form>
                <label htmlFor="location">
                    Location
                    <input
                        id="location"
                        value={location}
                        placeholder="Location"
                        onChange={e => setLocation(e.target.value)}
                    />
                </label>
                <AnimalDropdown />
                <BreedDropdown />
                <button>Submit</button>
            </form>
        </div>
    );

}


export default SearchParams;
