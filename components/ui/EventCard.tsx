import Link from "next/link";
import Image from "next/image";
import { Clock, Calendar, MapPin } from "lucide-react";

interface Props {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
}

const EventCard = ({ title, image, slug, location, date, time }: Props) => {
  return (
    <Link href={`events/${slug}`} id="event-card">
      <Image
        src={image}
        alt={title}
        width={410}
        height={300}
        className="poster"
      />
      <div className="flex items-center flex-row gap-1">
        <MapPin className="h-3.5 w-3.5 text-gray-400" />
        <p>{location}</p>
      </div>
      <p className="title">{title}</p>

      <div className="datetime">
        <div>
          <Calendar className="h-4 w-4 text-gray-400" />
          <p>{date}</p>
        </div>
        <div>
          <Clock className="h-4 w-4 text-gray-400" />
          <p>{time}</p>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
