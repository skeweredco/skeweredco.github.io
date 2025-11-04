import { useEffect, useState } from "react";
import "../../styles/cards/Flyers.css";

const GOOGLE_FLYERS_URL = "https://script.google.com/macros/s/XXXXX/exec";

interface Flyer {
    name: string;
    url: string;
    date: string;
}

const Flyers = () => {
    const [flyers, setFlyers] = useState<Flyer[]>([]);

    useEffect(() => {
        fetch(GOOGLE_FLYERS_URL)
            .then((res) => res.json())
            .then((data) => setFlyers(data.sort((a: any, b: any) => +new Date(b.date) - +new Date(a.date))))
            .catch(console.error);
    }, []);

    return (
        <div className="flyers-container">
            <h3>Upcoming Events</h3>
            <div className="flyers-grid">
                {flyers.map((flyer) => (
                    <div className="flyer-card" key={flyer.url}>
                        <img src={flyer.url} alt={flyer.name} />
                        <p>{flyer.name.replace(/\.[^/.]+$/, "")}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Flyers;
