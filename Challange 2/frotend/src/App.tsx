import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import './App.css';
import api from './api';
import { CharacterInfo, ResponseAPI } from './types';
import Character from './components/Character';
import CharacterRow from './components/CharacterRow';
import Pagination from './components/Pagination';

function App() {
    const [characters, setcharacters] = useState<CharacterInfo[]>([]);
    const [isLoading, setIsloading] = useState(true);
    const [searched, setSearch] = useState<CharacterInfo[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [charachtersPerPage] = useState(5);
    const indexOfLastcharachter = currentPage * charachtersPerPage;
    const indexOfFirstcharachter = indexOfLastcharachter - charachtersPerPage;
    const nPages = useMemo(
        () => Math.ceil(searched.length / charachtersPerPage),
        [searched]
    );

    useEffect(() => {
        const fetchCharacters = async () => {
            const response: ResponseAPI = await api.product.list();
            setcharacters(response.results);
            setSearch(response.results);
            setIsloading(false);
        };
        fetchCharacters();
    }, []);

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length < 1) setSearch(characters);
        const matches = characters.filter((character) =>
            character.name
                .toLowerCase()
                .startsWith(e.target.value.toLowerCase())
        );

        setSearch(matches);
    };

    if (isLoading) return <p> Loading...</p>;
    return (
        <div className="App">
            <div className="mb-5">
                <input
                    onChange={(e) => handleSearch(e)}
                    autoComplete="true"
                    type="search"
                    name=""
                    id=""
                />
            </div>
            <nav className="text-left">
                <CharacterRow>
                    <li>Name</li>
                    <li>Status</li>
                    <li>Gender</li>
                    <li>Specie</li>
                </CharacterRow>

                {searched
                    ?.map((character) => {
                        return (
                            <Character
                                key={character.id}
                                character={character}
                            />
                        );
                    })
                    ?.slice(indexOfFirstcharachter, indexOfLastcharachter)}
            </nav>

            {searched?.length > charachtersPerPage ? (
                <Pagination
                    nPages={nPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            ) : (
                ''
            )}
        </div>
    );
}

export default App;
