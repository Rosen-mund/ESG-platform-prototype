import { motion } from "framer-motion";


function KpiCard({
  title,
  value,
  icon: Icon,
  color
}) {

  return (

    <motion.div

      whileHover={{
        y: -6,
        scale: 1.02
      }}

      transition={{
        type: "spring",
        stiffness: 260,
        damping: 18
      }}

      className="
        relative
        overflow-hidden

        rounded-3xl

        border
        border-zinc-200
        dark:border-zinc-800

        bg-white/80
        dark:bg-zinc-900/70

        backdrop-blur-xl

        p-6

        shadow-lg
        dark:shadow-black/20

        transition-all
        duration-500
      "
    >

      <div className="
        absolute
        inset-0
        opacity-[0.03]
        bg-gradient-to-br
        from-white
        to-transparent
        pointer-events-none
      " />

      <div className="
        flex
        items-start
        justify-between
      ">

        <div>

          <p className="
            text-sm
            font-medium

            text-zinc-500
            dark:text-zinc-400
          ">

            {title}

          </p>

          <h3 className="
            text-4xl
            font-bold
            mt-4

            text-zinc-900
            dark:text-white
          ">

            {value}

          </h3>

        </div>

        <div className={`
          p-4
          rounded-2xl
          shadow-inner
          ${color}
        `}>

          <Icon size={26} />

        </div>

      </div>

      <div className="
        mt-6
        h-1.5
        rounded-full
        bg-zinc-200
        dark:bg-zinc-800
        overflow-hidden
      ">

        <motion.div

          initial={{
            width: 0
          }}

          animate={{
            width: "75%"
          }}

          transition={{
            duration: 1.2
          }}

          className="
            h-full
            rounded-full
            bg-gradient-to-r
            from-emerald-400
            to-cyan-400
          "
        />

      </div>

    </motion.div>
  );
}

export default KpiCard;