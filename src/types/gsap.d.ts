
declare global {
  interface Window {
    gsap: {
      timeline: (options?: any) => any;
      fromTo: (selector: string | Element, from: any, to: any) => any;
      to: (selector: any, options: any) => any;
      registerPlugin: (...plugins: any[]) => void;
      set: (selector: string | Element, options: any) => void;
      utils: {
        random: (min: number, max: number, snap?: number) => number;
        wrap: (min: number, max: number) => (value: number) => number;
        mapRange: (inMin: number, inMax: number, outMin: number, outMax: number, value: number) => number;
      };
    };
    ScrollTrigger: any;
  }

  const gsap: {
    timeline: (options?: any) => any;
    fromTo: (selector: string | Element, from: any, to: any) => any;
    to: (selector: any, options: any) => any;
    registerPlugin: (...plugins: any[]) => void;
    set: (selector: string | Element, options: any) => void;
    utils: {
      random: (min: number, max: number, snap?: number) => number;
      wrap: (min: number, max: number) => (value: number) => number;
      mapRange: (inMin: number, inMax: number, outMin: number, outMax: number, value: number) => number;
    };
  };

  const ScrollTrigger: any;
}

export {};
