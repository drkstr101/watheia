import { SVGProps } from 'react';

export default function Vimeo({ className }: SVGProps<SVGSVGElement>) {
  return (
    <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M23.976 6.417c-0.105 2.338-1.739 5.543-4.894 9.609-3.268 4.247-6.026 6.37-8.29 6.37-1.409 0-2.578-1.294-3.553-3.881l-1.918-7.114c-0.719-2.584-1.488-3.878-2.312-3.878-0.179 0-0.806 0.378-1.881 1.132l-1.129-1.457c1.486-1.307 2.625-2.328 3.757-3.358l-0.256 0.23c1.579-1.368 2.765-2.085 3.554-2.159 1.867-0.18 3.016 1.1 3.447 3.838 0.465 2.953 0.789 4.789 0.971 5.507 0.539 2.45 1.131 3.674 1.776 3.674 0.502 0 1.256-0.796 2.265-2.385 1.004-1.589 1.54-2.797 1.612-3.628 0.144-1.371-0.395-2.061-1.614-2.061-0.574 0-1.167 0.121-1.777 0.391 1.186-3.868 3.434-5.757 6.762-5.637 2.473 0.060 3.628 1.664 3.493 4.797z"></path>
    </svg>
  );
}
