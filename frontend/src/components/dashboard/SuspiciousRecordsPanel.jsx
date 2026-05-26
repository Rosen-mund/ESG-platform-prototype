import { motion } from "framer-motion";

import {
  AlertTriangle
} from "lucide-react";


function SuspiciousRecordsTable({
  records
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

        shadow-lg

        overflow-hidden

        transition-all
        duration-500
      "
    >

      <div className="
        p-6

        border-b
        border-zinc-200
        dark:border-zinc-800

        flex
        items-center
        gap-3
      ">

        <div className="
          p-3
          rounded-2xl
          bg-red-500/10
          text-red-400
        ">

          <AlertTriangle size={22} />

        </div>

        <div>

          <h2 className="
            text-2xl
            font-semibold
            tracking-tight
          ">

            Flagged Emission Records

          </h2>

          <p className="
            text-zinc-500
            dark:text-zinc-400
            text-sm
            mt-1
          ">

            ESG anomalies requiring review

          </p>

        </div>

      </div>

      <div className="overflow-x-auto">

        <table className="
          w-full
          text-sm
        ">

          <thead className="
            bg-zinc-100/80
            dark:bg-zinc-800/40
          ">

            <tr>

              <th className="
                text-left
                px-6
                py-4
                font-medium
                text-zinc-500
                dark:text-zinc-400
              ">
                Source
              </th>

              <th className="
                text-left
                px-6
                py-4
                font-medium
                text-zinc-500
                dark:text-zinc-400
              ">
                Scope
              </th>

              <th className="
                text-left
                px-6
                py-4
                font-medium
                text-zinc-500
                dark:text-zinc-400
              ">
                Quantity
              </th>

              <th className="
                text-left
                px-6
                py-4
                font-medium
                text-zinc-500
                dark:text-zinc-400
              ">
                Unit
              </th>

              <th className="
                text-left
                px-6
                py-4
                font-medium
                text-zinc-500
                dark:text-zinc-400
              ">
                Status
              </th>

              <th className="
                text-left
                px-6
                py-4
                font-medium
                text-zinc-500
                dark:text-zinc-400
              ">
                Location
              </th>

            </tr>

          </thead>

          <tbody>

            {records.map((record) => (

              <motion.tr

                key={record.id}

                whileHover={{
                  backgroundColor:
                    "rgba(239,68,68,0.04)"
                }}

                className="
                  border-b
                  border-zinc-100
                  dark:border-zinc-800

                  transition-colors
                "
              >

                <td className="
                  px-6
                  py-5
                ">

                  <span className="
                    px-3
                    py-1.5
                    rounded-full
                    text-xs

                    bg-cyan-500/10
                    text-cyan-500
                    dark:text-cyan-400

                    border
                    border-cyan-500/20
                  ">

                    {record.source_type}

                  </span>

                </td>

                <td className="
                  px-6
                  py-5
                ">

                  <span className="
                    px-3
                    py-1.5
                    rounded-full
                    text-xs

                    bg-emerald-500/10
                    text-emerald-500
                    dark:text-emerald-400

                    border
                    border-emerald-500/20
                  ">

                    {record.scope}

                  </span>

                </td>

                <td className="
                  px-6
                  py-5

                  font-medium

                  text-zinc-800
                  dark:text-zinc-200
                ">

                  {record.quantity}

                </td>

                <td className="
                  px-6
                  py-5

                  text-zinc-500
                  dark:text-zinc-400
                ">

                  {record.unit}

                </td>

                <td className="
                  px-6
                  py-5
                ">

                  <span className="
                    px-3
                    py-1.5
                    rounded-full
                    text-xs

                    bg-red-500/10
                    text-red-500
                    dark:text-red-400

                    border
                    border-red-500/20
                  ">

                    {record.status}

                  </span>

                </td>

                <td className="
                  px-6
                  py-5

                  text-zinc-500
                  dark:text-zinc-400
                ">

                  {record.facility_location}

                </td>

              </motion.tr>

            ))}

          </tbody>

        </table>

      </div>

    </motion.div>

  );
}

export default SuspiciousRecordsTable;