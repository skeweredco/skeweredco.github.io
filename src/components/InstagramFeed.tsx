// src/components/InstagramFeed.tsx
import { useEffect } from "react";
import "../styles/InstagramFeed.css";

const InstagramFeed = () => {
    useEffect(() => {
        // Dynamically load Juicer script
        const script = document.createElement("script");
        script.src = "https://assets.juicer.io/embed.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            // Optional cleanup
            document.body.removeChild(script);
        };
    }, []);

    return (
        <section id="social" className="social-section">
            <a href="https://www.instagram.com/skeweredco/" target="_blank" rel="noopener noreferrer">
                <h3>@skeweredco</h3>
            </a>
            <ul
                className="juicer-feed"
                data-feed-id="codingwithloc"
            >
                <li>Loading Instagram feed...</li>
            </ul>
            <p className="social-subtitle">
                Follow <a href="https://www.instagram.com/skeweredco/" target="_blank" rel="noopener noreferrer"><span>@skeweredco</span></a> to see our latest markets, night events,
                and behind-the-scenes grilling moments.
            </p>
        </section>
    );
};

export default InstagramFeed;
