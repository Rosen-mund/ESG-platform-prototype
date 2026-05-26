import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import { motion } from "framer-motion";


function SourceBreakdownChart({
  data
}) {

  const COLORS = [
    "#10b981",
    "#06b6d4",
    "#8b5cf6",
    "#f59e0b"
  ];

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

          Source Breakdown

        </h2>

        <p className="
          text-zinc-500
          dark:text-zinc-400
          mt-1
        ">

          ESG data source distribution

        </p>

      </div>

      <div className="h-[320px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <PieChart>

            <Pie
              data={data}
              dataKey="count"
              nameKey="source_type"
              outerRadius={110}
              innerRadius={70}
              paddingAngle={3}
            >

              {data.map((entry, index) => (

                <Cell
                  key={index}
                  fill={
                    COLORS[
                      index % COLORS.length
                    ]
                  }
                />

              ))}

            </Pie>

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </motion.div>
  );
}

export default SourceBreakdownChart;