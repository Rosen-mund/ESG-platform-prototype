import { motion } from "framer-motion";

function ChartCard({
  title,
  children
}) {

  return (
    <motion.div
      whileHover={{
        y: -3
      }}
      className="
        rounded-2xl
        border
        border-zinc-800
        bg-zinc-900/60
        backdrop-blur-xl
        p-6
        shadow-xl
      "
    >

      <div className="mb-6">

        <h3 className="text-xl font-semibold">
          {title}
        </h3>

      </div>

      {children}

    </motion.div>
  );
}

export default ChartCard;