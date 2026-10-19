import { useState, type FormEvent } from "react";
import "./SearchBar.css";


export type SearchFilters = {
    query: string;
    date: string;      
    location: string;  
    category: string;  
};

type Option = { value: string; label: string };

type SearchBarProps = {
    onSearch?: (filters: SearchFilters) => void;
    locations?: Option[];
    categories?: Option[];
};

const dateOptions: Option[] = [
    { value: "", label: "Alla datum" },
    { value: "today", label: "Idag" },
    { value: "week", label: "Denna vecka" },
    { value: "month", label: "Denna månad" },
];


const defaultLocations: Option[] = [
    { value: "stockholm", label: "Stockholm" },
    { value: "goteborg", label: "Göteborg" },
    { value: "malmo", label: "Malmö" },
    { value: "online", label: "Online" },
];

const defaultCategories: Option[] = [
    { value: "tech", label: "Tech" },
    { value: "sport", label: "Sport" },
    { value: "musik", label: "Musik" },
    { value: "mat", label: "Mat & dryck" },
];

function SearchBar({
    onSearch,
    locations = defaultLocations,
    categories = defaultCategories,
}: SearchBarProps) {


    const [query, setQuery] = useState("");
    const [date, setDate] = useState("");
    const [location, setLocation] = useState("");
    const [category, setCategory] = useState("");

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault(); 
        onSearch?.({ query, date, location, category });
    }

    return (
        <div>
            <div className="headlineContainer">
                <h1>Kommande meetups</h1>
                <p>Hitta en träff som passar dina intressen och ditt schema</p>
            </div>

            <div className="searchBarContainer">
                <form className="searchbar" onSubmit={handleSubmit}>
                    <div className="field field--wide">
                        <label htmlFor="search-query">Sök meetups</label>
                        <input
                            type="text"
                            id="search-query"
                            placeholder="Sök på nyckelord"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </div>

                    <div className="field">
                        <label htmlFor="search-date">Datum</label>
                        <select
                            id="search-date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        >
                            {dateOptions.map((o) => (
                                <option key={o.value} value={o.value}>
                                    {o.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="field">
                        <label htmlFor="search-location">Plats</label>
                        <select
                            id="search-location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        >
                            <option value="">Alla platser</option>
                            {locations.map((o) => (
                                <option key={o.value} value={o.value}>
                                    {o.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="field">
                        <label htmlFor="search-category">Kategori</label>
                        <select
                            id="search-category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="">Alla kategorier</option>
                            {categories.map((o) => (
                                <option key={o.value} value={o.value}>
                                    {o.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button type="submit" className="searchButton">
                        Sök
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SearchBar;