import * as React from 'react';
import { SVGProps } from 'react';

const styles = {
  fill: 'hsl(var(--bc))'
};
const CloudUpload = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" {...props}>
    <path
      className="a"
      style={styles}
      d="M14.643 4.736a4.394 4.394 0 0 0-8.51-1.521 3.861 3.861 0 0 0-3.844 3.7A2.612 2.612 0 0 0 .516 9.687 2.673 2.673 0 0 0 3.205 12H5.75a.25.25 0 0 0 .25-.25v-.5a.25.25 0 0 0-.25-.25H3.2a1.668 1.668 0 0 1-1.696-1.52 1.607 1.607 0 0 1 1.518-1.692l.087-.003h.18v-.714a2.86 2.86 0 0 1 3.6-2.759 3.393 3.393 0 1 1 6.634 1.35 2.679 2.679 0 1 1 .3 5.34H12.25a.25.25 0 0 0-.25.25v.5a.25.25 0 0 0 .25.25h1.45a3.759 3.759 0 0 0 3.774-3.242 3.684 3.684 0 0 0-2.831-4.024Z"
    />
    <path
      className="a"
      style={styles}
      d="M6.75 9H8v7.5a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V9h1.25a.25.25 0 0 0 .25-.25.245.245 0 0 0-.059-.159L9.182 6.08a.25.25 0 0 0-.353-.01l-.011.01-2.26 2.51a.245.245 0 0 0-.058.16.25.25 0 0 0 .25.25Z"
    />
  </svg>
);

export default CloudUpload;
