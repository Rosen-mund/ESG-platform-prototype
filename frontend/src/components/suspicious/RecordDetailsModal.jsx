import { motion } from "framer-motion";

import {
  X,
  FileJson
} from "lucide-react";


function RecordDetailsModal({
  record,
  onClose
}) {

  if (!record) return null;

  return (

    <div className="
      fixed
      inset-0
      z-50

      flex
      items-center
      justify-center

      bg-black/40
      backdrop-blur-sm
    ">

      <motion.div

        initial={{
          opacity: 0,
          scale: 0.9
        }}

        animate={{
          opacity: 1,
          scale: 1
        }}

        className="
          w-full
          max-w-3xl

          rounded-3xl

          border
          border-zinc-200
          dark:border-zinc-800

          bg-white
          dark:bg-zinc-900

          p-8

          shadow-2xl
        "
      >

        <div className="
          flex
          items-center
          justify-between

          mb-8
        ">

          <div className="
            flex
            items-center
            gap-3
          ">

            <div className="
              p-3
              rounded-2xl

              bg-cyan-500/10
              text-cyan-400
            ">

              <FileJson size={22} />

            </div>

            <div>

              <h2 className="
                text-2xl
                font-semibold
              ">

                Record Audit Details

              </h2>

              <p className="
                text-zinc-500
                dark:text-zinc-400

                text-sm
                mt-1
              ">

                Source-of-truth tracking information

              </p>

            </div>

          </div>

          <button

            onClick={onClose}

            className="
              p-2
              rounded-xl

              hover:bg-zinc-100
              dark:hover:bg-zinc-800

              transition-colors
            "
          >

            <X size={20} />

          </button>

        </div>

        <div className="
          grid
          grid-cols-2
          gap-6
          mb-8
        ">

          <InfoCard
            label="Source Type"
            value={record.source_type}
          />

          <InfoCard
            label="Scope"
            value={record.scope}
          />

          <InfoCard
            label="Raw Record ID"
            value={record.raw_record_id}
          />

          <InfoCard
            label="Status"
            value={record.status}
          />

          <InfoCard
            label="Created At"
            value={record.created_at}
          />

          <InfoCard
            label="Approved By"
            value={
              record.approved_by ||
              "Not Approved"
            }
          />

        </div>

        <div>

          <h3 className="
            text-lg
            font-semibold

            mb-4
          ">

            Raw Source Payload

          </h3>

          <pre className="
            p-5

            rounded-2xl

            bg-zinc-100
            dark:bg-zinc-800

            overflow-x-auto

            text-sm

            text-zinc-700
            dark:text-zinc-300
          ">

            {JSON.stringify(
              record.raw_payload,
              null,
              2
            )}

          </pre>

        </div>

      </motion.div>

    </div>

  );
}


function InfoCard({
  label,
  value
}) {

  return (

    <div className="
      p-5

      rounded-2xl

      bg-zinc-100/80
      dark:bg-zinc-800/50
    ">

      <p className="
        text-sm

        text-zinc-500
        dark:text-zinc-400

        mb-2
      ">

        {label}

      </p>

      <p className="
        font-medium

        break-all
      ">

        {value || "-"}
        
      </p>

    </div>

  );
}

export default RecordDetailsModal;