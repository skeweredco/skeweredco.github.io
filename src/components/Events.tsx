import '../styles/Events.css';
import { GOOGLE_CALENDAR_URL } from '../utils/constants';
import ImageCarousel from './ImageCarousel';
import InstagramFeed from './InstagramFeed';

const eventImagesGlob = import.meta.glob('./assets/events/*.jpg', {
    eager: true,
    query: '?url',
    import: 'default'
});

const EVENT_CALENDAR_IMAGES: string[] = Object.values(eventImagesGlob).map((item: any) => item);

const EventsSection = () => {
    return (
        <section id="events" className="events-section">
            <div className="container">
                <h2 className="section-title">Events</h2>
                <div className="events-content">
                    <div className="google-calendar-wrapper">
                        <h3>Upcoming Events</h3>
                        <iframe src={GOOGLE_CALENDAR_URL} />
                    </div>
                    <InstagramFeed />
                </div>
            </div>
        </section>
    );
};

export default EventsSection;