import ExploreBtn from "@/components/ExploreBtn";
import EventCard from "@/components/ui/EventCard";
import { events } from "@/lib/constants";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";

const HomePage = () => {
  return (
    <section className="py-10 flex flex-col gap-6">
      <h1 className="text-center">
        Where Developers <br />
        Meet, Build, and Grow
      </h1>
      <p className="text-center mt-5">
        Hackathons, meetups, conferences. Discover what’s hot, reserve in
        seconds, level up with your community.
      </p>
      <ExploreBtn />

      <div className="mt-20 space-y-7">
        <h3>Featured Events</h3>
        <ul className="events list-none">
          {events.map((event) => (
            <li key={event.title}>
              <EventCard {...event} />
            </li>
          ))}
        </ul>
      </div>
      <ProgressiveBlur placement="fixed" position="bottom" height="10%" />
    </section>
  );
};

export default HomePage;
