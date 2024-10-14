import { motion } from "framer-motion";
import { useState } from "react";
import { Navigate } from "react-router-dom";

const Preloader = () => {
    const [redirect, setRedirect] = useState(false);
    setTimeout(() => {
        setRedirect(true);
    }, 8000);

    if (redirect) {
        return <Navigate to="/login" />;
    }
    return (
        <motion.div className="w-full h-full flex items-center justify-center">
            <h1 className="font-semibold text-5xl">My Blog</h1>
        </motion.div>
    );
};

export default Preloader;
