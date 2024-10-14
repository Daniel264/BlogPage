// import { motion } from "framer-motion";
// import { useState } from "react";
// import { Navigate } from "react-router-dom";

// const Preloader = () => {
//     const [redirect, setRedirect] = useState(false);
//     setTimeout(() => {
//         setRedirect(true);
//     }, 80000000);

//     if (redirect) {
//         return <Navigate to="/login" />;
//     }
//     return (
//         <motion.div className="w-[100%] p-0 h-[100vh] flex items-center justify-center font-montserrat bg-white text-black">
//             <motion.p
//                 initial={{
//                     y: 200,
//                     x: 200,
//                 }}
//                 whileInView={{
//                     y: 0,
//                     x: 0,
//                 }}
                
//                 className="text-6xl font-semibold absolute top-12 left-10"
//             >
//                 Blogggg
//             </motion.p>
//         </motion.div>
//     );
// };

// export default Preloader;
