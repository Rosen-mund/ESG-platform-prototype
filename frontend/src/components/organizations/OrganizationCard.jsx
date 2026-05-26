import { motion } from "framer-motion";

import {
    Building2,
    Database,
    AlertTriangle,
    Trash2
} from "lucide-react";


function OrganizationCard({
  organization,
  onDelete
})  {

  return (

    <motion.div

      whileHover={{
        y: -6,
        scale: 1.01
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

      <div className="
        flex
        items-start
        justify-between
        mb-6
      ">

        <div>

          <div className="
            w-16
            h-16

            rounded-3xl

            bg-gradient-to-br
            from-emerald-500/20
            to-cyan-500/20

            flex
            items-center
            justify-center

            mb-5
          ">

            <Building2
              className="
                text-emerald-400
              "
            />

          </div>

          <h2 className="
            text-2xl
            font-semibold
            tracking-tight

            text-zinc-900
            dark:text-white
          ">

            {organization.name}

          </h2>

          <p className="
            text-zinc-500
            dark:text-zinc-400

            text-sm
            mt-2
          ">

            ESG Reporting Organization

          </p>

        </div>
        <button

  onClick={() =>
    onDelete(organization.id)
  }

  className="
    p-3

    rounded-2xl

    bg-red-500/10
    text-red-400

    hover:bg-red-500/20

    transition-colors
  "
>

  <Trash2 size={18} />

</button>

      </div>

      <div className="
        space-y-5
      ">

        <div className="
          flex
          items-center
          justify-between
          text-sm
        ">

          <div className="
            flex
            items-center
            gap-2

            text-zinc-500
            dark:text-zinc-400
          ">

            <Database size={16} />

            <span>
              Organization ID
            </span>

          </div>

          <span className="
            text-zinc-700
            dark:text-zinc-300

            truncate
            max-w-[140px]
          ">

            {organization.id}

          </span>

        </div>

        <div className="
          flex
          items-center
          justify-between
          text-sm
        ">

          <div className="
            flex
            items-center
            gap-2

            text-zinc-500
            dark:text-zinc-400
          ">

            <AlertTriangle size={16} />

            <span>
              Status
            </span>

          </div>

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

            Active

          </span>

        </div>

      </div>

    </motion.div>

  );
}

export default OrganizationCard;