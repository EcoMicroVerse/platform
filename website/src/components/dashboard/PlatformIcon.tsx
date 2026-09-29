
type Props = {
  platform: string;
};

export default function PlatformIcon({
  platform,
}: Props) {
  switch (platform) {
    case "LinkedIn":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5">
          <rect width="24" height="24" rx="4" fill="#0A66C2"/>
          <path d="M6.5 9H9v9H6.5zm1.25-4A1.5 1.5 0 1 0 7.75 8a1.5 1.5 0 0 0 0-3zM11 9h2.4v1.2h.03A2.63 2.63 0 0 1 15.8 8.8c2.5 0 3.2 1.6 3.2 3.8V18h-2.5v-4.5c0-1-.02-2.3-1.4-2.3-1.4 0-1.6 1.1-1.6 2.2V18H11z" fill="white"/>
        </svg>
      );

    case "X":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5">
          <rect width="24" height="24" rx="4" fill="black"/>
          <path d="M5 5l14 14M19 5L5 19" stroke="white" strokeWidth="2"/>
        </svg>
      );

    case "Threads":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5">
          <rect width="24" height="24" rx="4" fill="black"/>
          <path d="M12 5c3.5 0 6 2 6 5.5S15.5 17 12 17c-2.8 0-5-1.7-5-4.3 0-2.3 1.8-4 4.5-4 2.3 0 4 1.2 4 3.3 0 1.5-1 2.5-2.5 2.5-1.3 0-2.2-.8-2.2-2" fill="none" stroke="white" strokeWidth="1.8"/>
        </svg>
      );

    case "Bluesky":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5">
          <rect width="24" height="24" rx="4" fill="#1185FE"/>
          <path d="M12 10c2-3 5-5 6-4-1 2-2 5-4 6 2 0 4 2 4 4-2-1-4-2-6-4-2 2-4 3-6 4 0-2 2-4 4-4-2-1-3-4-4-6 1-1 4 1 6 4z" fill="white"/>
        </svg>
      );

    case "Instagram":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5">
          <rect width="24" height="24" rx="6" fill="url(#ig)"/>
          <defs>
            <linearGradient id="ig" x1="0" x2="1" y1="1" y2="0">
              <stop offset="0%" stopColor="#F58529"/>
              <stop offset="35%" stopColor="#DD2A7B"/>
              <stop offset="70%" stopColor="#8134AF"/>
              <stop offset="100%" stopColor="#515BD4"/>
            </linearGradient>
          </defs>
          <rect x="6" y="6" width="12" height="12" rx="3" stroke="white" strokeWidth="1.8" fill="none"/>
          <circle cx="12" cy="12" r="3" stroke="white" strokeWidth="1.8" fill="none"/>
          <circle cx="16.5" cy="7.5" r="1" fill="white"/>
        </svg>
      );

    default:
      return null;
  }
}