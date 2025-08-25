// import { motion } from "framer-motion";
// import { Input } from "../ui/input";
// import { Button } from "../ui/button";

// function Banner() {
//   return (
//     <>
//       <motion.div
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1 }}
//         className="flex flex-col items-center justify-center text-center py-10 md:pt-10 px-3 sm:px-6 lg:px-8 gap-10 dark:bg-black"
//       >
//         <motion.div
//           className="w-full max-w-4xl"
//           initial={{ opacity: 0, y: -30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.3, duration: 0.8 }}
//         >
//           <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight bg-gradient-to-r from-blue-600 via-red-300 to-yellow-300 inline-block text-transparent bg-clip-text transition-transform hover:scale-105">
//             Sell What You Don’t Need,
//             <br className="hidden sm:block" />
//             Buy What You Love.
//           </h1>

//           <p className="text-gray-300 text-base sm:text-lg mt-4 transition-opacity duration-500 hover:opacity-90">
//             Our platform makes it easy to declutter, discover, and deal—all in
//             one place. Whether you're finding hidden gems or turning items into
//             cash, it's the smart way to shop and sell.
//           </p>
//         </motion.div>
//       </motion.div>
//       <form className="flex items-center border border-zinc-700 dark:bg-zinc-900 rounded-full mt-5 shadow-lg overflow-hidden max-w-xl mx-auto mb-6">
//         <Input
//           className="flex-grow border-none focus-visible:ring-0 px-6 py-6 dark:bg-zinc-900 text-white placeholder-white dark:placeholder-white"
//           placeholder="Search Projects"
//         />
//         <Button
//           type="submit"
//           className="dark:bg-zinc-700 bg-blue-700 text-white px-6 py-6 rounded-full hover:bg-blue-700 dark:hover:bg-blue-800"
//         >
//           Search
//         </Button>
//       </form>
//     </>
//   );
// }

// export default Banner;
import { motion } from "framer-motion";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

function Banner() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center justify-center text-center pb-10 px-3 sm:px-6 lg:px-8 gap-10 
                   bg-white text-black dark:bg-black dark:text-white"
      >
        <motion.div
          className="w-full max-w-4xl"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight 
                         bg-gradient-to-r from-blue-600 via-red-300 to-yellow-300 inline-block 
                         text-transparent bg-clip-text transition-transform hover:scale-105">
            Sell What You Don’t Need,
            <br className="hidden sm:block" />
            Buy What You Love.
          </h1>

          <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg mt-4 transition-opacity duration-500 hover:opacity-90">
            Our platform makes it easy to declutter, discover, and deal—all in
            one place. Whether you're finding hidden gems or turning items into
            cash, it's the smart way to shop and sell.
          </p>
        </motion.div>
      </motion.div>

      <form className="flex items-center border border-zinc-700 rounded-full mt-5 shadow-lg overflow-hidden max-w-xl mx-auto mb-6
                       bg-white dark:bg-zinc-900">
        <Input
          className="flex-grow border-none focus-visible:ring-0 px-6 py-6 
                     bg-white text-black placeholder-black dark:bg-zinc-900 dark:text-white dark:placeholder-white"
          placeholder="Search Projects"
        />
        <Button
          type="submit"
          className="bg-blue-700 text-white px-6 py-6 rounded-full hover:bg-blue-800 dark:bg-zinc-700 dark:hover:bg-blue-800"
        >
          Search
        </Button>
      </form>
    </>
  );
}

export default Banner;
