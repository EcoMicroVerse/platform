
import Link from "next/link";
import { social } from "@/config/social";

export default function SocialLinks() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6">

      <Link href={social.x} target="_blank" className="hover:scale-110 transition">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="hover:text-teal-300">
          <path d="M18.9 2H22l-6.8 7.8L23 22h-6.3l-4.9-6.4L6 22H2.9l7.3-8.4L1 2h6.5l4.4 5.8L18.9 2z"/>
        </svg>
      </Link>

      <Link href={social.bluesky} target="_blank" className="hover:scale-110 transition">
        <span className="text-xl">🦋</span>
      </Link>

      <Link href={social.linkedin} target="_blank" className="hover:scale-110 transition">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="hover:text-teal-300">
          <path d="M4.98 3.5C4.98 4.88 3.87 6 2.49 6S0 4.88 0 3.5 1.11 1 2.49 1s2.49 1.12 2.49 2.5zM0 8h5v16H0V8zm7.5 0H12v2.2h.1C12.7 8.8 14.6 8 16.8 8 21.3 8 22 10.9 22 15v9h-5v-8c0-1.9 0-4.3-2.6-4.3-2.6 0-3 2-3 4.1V24h-5V8z"/>
        </svg>
      </Link>

      <Link href={social.youtube} target="_blank" className="hover:scale-110 transition">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="hover:text-teal-300">
          <path d="M23.5 6.2s-.2-1.7-.9-2.4c-.9-.9-1.9-.9-2.4-1C16.8 2.5 12 2.5 12 2.5h-.1s-4.8 0-8.2.3c-.5.1-1.5.1-2.4 1C.6 4.5.5 6.2.5 6.2S.2 8.2.2 10.3v1.5c0 2.1.3 4.1.3 4.1s.2 1.7.9 2.4c.9.9 2.1.9 2.7 1 2 .2 8 .3 8 .3s4.8 0 8.2-.3c.5-.1 1.5-.1 2.4-1 .7-.7.9-2.4.9-2.4s.3-2 .3-4.1v-1.5c0-2.1-.3-4.1-.3-4.1zM9.8 15V8.8l6 3.1-6 3.1z"/>
        </svg>
      </Link>

      <Link href={social.instagram} target="_blank" className="hover:scale-110 transition">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="hover:text-teal-300">
          <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm11 2c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1zm-6 2a6 6 0 110 12 6 6 0 010-12zm0 2a4 4 0 100 8 4 4 0 000-8z"/>
        </svg>
      </Link>

      <Link href={social.threads} target="_blank" className="hover:scale-110 transition">
        <span className="font-semibold">@</span>
      </Link>

    </div>
  );
}