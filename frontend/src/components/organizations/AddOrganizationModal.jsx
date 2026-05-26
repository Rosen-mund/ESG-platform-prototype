import { useState } from "react";

import { motion } from "framer-motion";

import {
  X,
  Building2
} from "lucide-react";

import api from "../../services/api";


function AddOrganizationModal({
  isOpen,
  onClose,
  onOrganizationAdded
}) {

  const [name, setName] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (
    e
  ) => {

    e.preventDefault();

    if (!name.trim()) return;

    try {

      setLoading(true);

      await api.post(
        "/organizations/",
        {
          name
        }
      );

      setName("");

      onOrganizationAdded();

      onClose();

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  if (!isOpen) return null;

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
          max-w-md

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

          mb-6
        ">

          <div className="
            flex
            items-center
            gap-3
          ">

            <div className="
              p-3
              rounded-2xl

              bg-emerald-500/10
              text-emerald-400
            ">

              <Building2 size={22} />

            </div>

            <div>

              <h2 className="
                text-2xl
                font-semibold
                tracking-tight
              ">

                Add Organization

              </h2>

              <p className="
                text-sm

                text-zinc-500
                dark:text-zinc-400

                mt-1
              ">

                Create a new ESG organization

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

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div>

            <label className="
              block
              text-sm
              font-medium

              mb-2
            ">

              Organization Name

            </label>

            <input
              type="text"
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }

              placeholder="
                Enter organization name
              "

              className="
                w-full

                px-4
                py-3

                rounded-2xl

                border
                border-zinc-200
                dark:border-zinc-700

                bg-white
                dark:bg-zinc-800

                outline-none

                focus:ring-2
                focus:ring-emerald-400

                transition-all
              "
            />

          </div>

          <button

            type="submit"

            disabled={loading}

            className="
              w-full

              py-3

              rounded-2xl

              bg-gradient-to-r
              from-emerald-500
              to-cyan-500

              text-white
              font-medium

              shadow-lg

              hover:scale-[1.02]

              disabled:opacity-50

              transition-all
              duration-300
            "
          >

            {loading
              ? "Creating..."
              : "Create Organization"
            }

          </button>

        </form>

      </motion.div>

    </div>

  );
}

export default AddOrganizationModal;