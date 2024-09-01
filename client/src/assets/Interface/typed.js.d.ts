// src/typed.js.d.ts
declare module "typed.js" {
  interface TypedOptions {
    strings?: string[];
    stringsElement?: string | Element;
    typeSpeed?: number;
    startDelay?: number;
    backSpeed?: number;
    smartBackspace?: boolean;
    shuffle?: boolean;
    backDelay?: number;
    fadeOut?: boolean;
    fadeOutClass?: string;
    fadeOutDelay?: number;
    loop?: boolean;
    loopCount?: number | undefined;
    showCursor?: boolean;
    cursorChar?: string;
    autoInsertCss?: boolean;
    attr?: string;
    bindInputFocusEvents?: boolean;
    contentType?: "html" | null;
    onComplete?: (self: Typed) => void;
    preStringTyped?: (arrayPos: number, self: Typed) => void;
    onStringTyped?: (arrayPos: number, self: Typed) => void;
    onLastStringBackspaced?: (self: Typed) => void;
    onTypingPaused?: (arrayPos: number, self: Typed) => void;
    onTypingResumed?: (arrayPos: number, self: Typed) => void;
    onReset?: (self: Typed) => void;
    onStop?: (arrayPos: number, self: Typed) => void;
    onStart?: (arrayPos: number, self: Typed) => void;
    onDestroy?: (self: Typed) => void;
  }

  export default class Typed {
    constructor(elementId: string | Element, options: TypedOptions);
    reset(restart?: boolean): void;
    start(): void;
    stop(): void;
    destroy(): void;
    toggle(): void;
    typeSpeed: number;
    backSpeed: number;
  }
}
