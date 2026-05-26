import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import { motion } from "framer-motion";


function ScopeBreakdownChart({
  data
}) {

  return (

    <motion.div

      whileHover={{
        y: -4
      }}

      className="
        rounded-3xl

        border
        border-zinc-200
        dark:border-zinc-800

        bg-white/80
        dark:bg-zinc-900/70

        backdrop-blur-xl

        p-6

        shadow-lg

        transition-all
        duration-500
      "
    >

      <div className="mb-6">

        <h2 className="
          text-2xl
          font-semibold
          tracking-tight
        ">

          Scope Distribution

        </h2>

        <p className="
          text-zinc-500
          dark:text-zinc-400
          mt-1
        ">

          Emissions categorized by scope

        </p>

      </div>

      <div className="h-[320px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <BarChart data={data}>

            <XAxis dataKey="scope" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="count"
              radius={[10, 10, 0, 0]}
              fill="#34d399"
              />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </motion.div>
  );
}

export default ScopeBreakdownChart;