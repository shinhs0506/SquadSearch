import { useState } from 'react'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'

function Searchbar() {
    const [searchQuery, setSearchQuery] = useState('')

    const handleSearchQueryChange = (e) => {
        setSearchQuery(e.target.value)
    }

    const handleSearchQuerySubmit = () => {
        console.log(searchQuery)
    }

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
    )
}

export default Searchbar;
