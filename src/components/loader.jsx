import { motion } from "framer-motion";

export default function CeyloriaLoader() {
  const brandName = "Ceyloria";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
  };

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white">
      {/* Background Subtle Mesh */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-orange-100/50 blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-blue-100/50 blur-[120px] animate-pulse delay-700"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Animated Brand Name */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex mb-8"
        >
          {brandName.split("").map((char, index) => (
            <motion.span
              key={index}
              variants={letterVariants}
              className="text-6xl md:text-8xl"
              style={{
                fontFamily: "'Alice', serif",
                color: index < 3 ? "#FF8C00" : "#001C57", // Exact colors from image
                letterSpacing: "-0.05em"
              }}
            >
              {char}
            </motion.span>
          ))}
        </motion.div>

        {/* Shimmering Line */}
        <div className="relative w-64 h-[2px] bg-gray-100 overflow-hidden rounded-full">
          <motion.div
            initial={{ left: "-100%" }}
            animate={{ left: "100%" }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut",
            }}
            className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-blue-900/20 to-transparent"
          />
        </div>

        {/* Loading Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-8 text-gray-400 text-xs uppercase tracking-[0.6em] font-semibold"
        >
          Discovering Paradise
        </motion.p>
      </div>
    </div>
  );
}
