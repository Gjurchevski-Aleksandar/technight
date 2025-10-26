export type Event = {
  title: string;
  image: string;
  date: string;
  time: string;
  location: string;
  slug: string;
  website: string;
  description: string;
};

export const events: Event[] = [
  {
    title: "React Summit 2025",
    image: "/images/event1.png",
    date: "June 12, 2025",
    time: "9:00 AM",
    location: "Amsterdam, Netherlands",
    slug: "react-summit-2025",
    website: "https://reactsummit.com/",
    description:
      "The largest React conference worldwide, bringing together frontend engineers for deep dives into the React ecosystem, workshops, and networking nights.",
  },
  {
    title: "Web Summit Rio Europe Special",
    image: "/images/event2.png",
    date: "April 23, 2025",
    time: "9:30 AM",
    location: "Lisbon, Portugal",
    slug: "web-summit-europe-2025",
    website: "https://websummit.com/rio",
    description:
      "Europe's flagship Web Summit edition spotlighting AI startups, sustainability tech, and growth stories from global founders on the Lisbon stage.",
  },
  {
    title: "Microsoft Build Europe Roadshow",
    image: "/images/event3.png",
    date: "May 27, 2025",
    time: "10:00 AM",
    location: "London, United Kingdom",
    slug: "microsoft-build-europe-2025",
    website: "https://build.microsoft.com/",
    description:
      "Microsoft's flagship developer conference featuring updates on .NET, Azure, Copilot, and new tooling to build intelligent cloud-native applications.",
  },
  {
    title: "HackZurich 2025",
    image: "/images/event4.png",
    date: "September 12, 2025",
    time: "6:00 PM",
    location: "Zurich, Switzerland",
    slug: "hackzurich-2025",
    website: "https://hackzurich.com/",
    description:
      "One of Europe's premier hackathons, gathering 600+ developers to prototype cutting-edge solutions alongside leading tech companies and mentors.",
  },
  {
    title: "FOSDEM 2025",
    image: "/images/event5.png",
    date: "February 1, 2025",
    time: "9:30 AM",
    location: "Brussels, Belgium",
    slug: "fosdem-2025",
    website: "https://fosdem.org/2025/",
    description:
      "A free community-driven event offering dozens of tracks and lightning talks covering open-source software, hardware, and emerging developer tools.",
  },
  {
    title: "AWS re:Invent Europe 2025",
    image: "/images/event6.png",
    date: "November 18, 2025",
    time: "9:00 AM",
    location: "Berlin, Germany",
    slug: "aws-reinvent-europe-2025",
    website: "https://reinvent.awsevents.com/",
    description:
      "Amazon Web Services' flagship conference with key announcements, deep technical sessions, certifications, and late-night builder events.",
  },
];
