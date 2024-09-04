"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const typed_js_1 = __importDefault(require("typed.js"));
const AnimatePage = () => {
    (0, react_1.useEffect)(() => {
        const rootElement = document.getElementById("root");
        rootElement === null || rootElement === void 0 ? void 0 : rootElement.classList.add("no-padding");
        return () => {
            rootElement === null || rootElement === void 0 ? void 0 : rootElement.classList.remove("no-padding");
        };
    }, []);
    (0, react_1.useEffect)(() => {
        const options = {
            strings: ["Welcome to Olatinsu's Blog"],
            typeSpeed: 150,
            backSpeed: 50,
            showCursor: true,
            cursorChar: "|",
            fadeOut: true,
            fadeOutDelay: 1000,
            smartBackspace: true,
            startDelay: 1000,
            backDelay: 1500,
        };
        // Initialize Typed.js
        const typed = new typed_js_1.default(".auto-type", options);
        // Cleanup on unmount
        return () => {
            typed.destroy();
        };
    }, []);
    const [redirect, setRedirect] = (0, react_1.useState)(false);
    setTimeout(() => {
        setRedirect(true);
    }, 8000);
    if (redirect) {
        return <react_router_dom_1.Navigate to="/login"/>;
    }
    return (<div className="p-0">
      <div className="w-[100%] p-0 h-[100vh] flex items-center justify-center font-montserrat bg-blue-500 text-white">
        <p className="text-6xl font-semibold">
          <span className="auto-type"></span>
        </p>
      </div>
    </div>);
};
exports.default = AnimatePage;
