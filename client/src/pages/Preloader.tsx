
import { motion } from 'framer-motion'

const Preloader = () => {
    return (
        <motion.div className="w-full h-full flex items-center justify-center">
            <h1 className="font-semibold text-5xl">My Blog</h1>
        </motion.div>
    );
};

export default Preloader;
