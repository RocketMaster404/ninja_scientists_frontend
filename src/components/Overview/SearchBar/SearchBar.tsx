import { useEffect, useState, type FormEvent } from "react";
import "./SearchBar.css";
import { getCategories, getCities } from "../overviewApi";
import { todayIso } from "../../../shared/utils/isoDate";

export type SearchFilters = {
    query: string;
    date: string;
    dateRange: number;
    location: string;
    category: string;
};

type Option = { value: string; label: string };

type SearchBarProps = {
    onSearch?: (filters: SearchFilters) => void;
};

const rangeOptions = [
    { value: 0, label: "Exakt" },
    { value: 3, label: "±3 dagar" },
    { value: 7, label: "±7 dagar" },
];

function SearchBar({ onSearch }: SearchBarProps) {
    const [query, setQuery] = useState("");
    const [date, setDate] = useState("");
    const [dateRange, setDateRange] = useState(0);
    const [location, setLocation] = useState("");
    const [category, setCategory] = useState("");
    const [locations, setLocations] = useState<Option[]>([]);
    const [categories, setCategories] = useState<Option[]>([]);

    useEffect(() => {
        getCities()
            .then((data: { city: string }[]) =>
                setLocations(
                    data.map((c) => ({ value: c.city, label: c.city })),
                ),
            )
            .catch(() => setLocations([]));

        getCategories()
            .then((data: { categoryName: string }[]) =>
                setCategories(
                    data.map((c) => ({
                        value: c.categoryName,
                        label: c.categoryName,
                    })),
                ),
            )
            .catch(() => setCategories([]));
    }, []);

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        onSearch?.({ query, date, dateRange, location, category });
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
                            maxLength={100}
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </div>

                    <div className="field">
                        <label htmlFor="search-date">Datum</label>
                        <input
                            type="date"
                            id="search-date"
                            min={todayIso()}
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>

                    <fieldset className="field rangeField" disabled={!date}>
                        <legend>Flexibilitet</legend>
                        <div className="rangeOptions">
                            {rangeOptions.map((o) => (
                                <label
                                    key={o.value}
                                    className={
                                        dateRange === o.value
                                            ? "rangeOption rangeOption--active"
                                            : "rangeOption"
                                    }
                                >
                                    <input
                                        type="radio"
                                        name="date-range"
                                        value={o.value}
                                        checked={dateRange === o.value}
                                        onChange={() => setDateRange(o.value)}
                                    />
                                    {o.label}
                                </label>
                            ))}
                        </div>
                    </fieldset>

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
