import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch } from 'react-redux';

import { eventSliceActions } from 'redux/slices/eventSlice';

function Searchbar() {
    const [searchQuery, setSearchQuery] = useState('');
    const dispatch = useDispatch();

    const handleSearchQueryChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchQuerySubmit = (e) => {
        e.preventDefault();

        dispatch(eventSliceActions.filterEventByQuery({ searchQuery }));
    };

    return (
        <div>
            <h1>Searchbar</h1>
            <form onSubmit={handleSearchQuerySubmit}>
                <TextField label="Search" value={searchQuery} onChange={handleSearchQueryChange} />
                <IconButton type="submit">
                    <SearchIcon />
                </IconButton>
            </form>
        </div>
    );
}

export default Searchbar;
