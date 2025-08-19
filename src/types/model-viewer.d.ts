declare namespace JSX {
  interface IntrinsicElements {
    "model-viewer": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      src?: string;
      "ios-src"?: string;
      alt?: string;
      ar?: boolean;
      "ar-modes"?: string;
      "camera-controls"?: boolean;
      "auto-rotate"?: boolean;
      "shadow-intensity"?: string | number;
      style?: React.CSSProperties;
    };
  }
}
