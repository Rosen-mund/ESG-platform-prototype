import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import api from "../../services/api";


function UploadForm() {

  const [organizations, setOrganizations] =
    useState([]);

  const [selectedOrg, setSelectedOrg] =
    useState("");

  const [sourceType, setSourceType] =
    useState("sap");

  const [file, setFile] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  useEffect(() => {

    fetchOrganizations();

  }, []);

  const fetchOrganizations = async () => {

    try {

      const response = await api.get(
        "/organizations/"
      );

      setOrganizations(response.data);

      if (response.data.length > 0) {

        setSelectedOrg(
          response.data[0].id
        );

      }

    } catch (error) {

      console.error(error);

    }

  };

  const handleUpload = async () => {

    if (!file || !selectedOrg) {

      setMessage(
        "Please select file and organization"
      );

      return;
    }

    try {

      setLoading(true);

      const formData = new FormData();

      formData.append("file", file);

      formData.append(
        "uploaded_by",
        "Anwesha"
      );

      formData.append(
        "organization_id",
        selectedOrg
      );

      await api.post(
        `/upload/${sourceType}/`,
        formData
      );

      setMessage(
        "Upload successful!"
      );

    } catch (error) {

      console.error(error);

      setMessage(
        "Upload failed"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <motion.div
      initial={{
        opacity: 0,
        y: 20
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      className="
        rounded-2xl
        border
        border-zinc-800
        bg-zinc-900/60
        backdrop-blur-xl
        p-8
        shadow-xl
        max-w-2xl
      "
    >

      <div className="space-y-6">

        <div>

          <label className="
            block
            text-sm
            text-zinc-400
            mb-2
          ">
            Organization
          </label>

          <select
            value={selectedOrg}
            onChange={(e) =>
              setSelectedOrg(
                e.target.value
              )
            }
            className="
              w-full
              rounded-xl
              bg-zinc-800
              border
              border-zinc-700
              p-3
              outline-none
            "
          >

            {organizations.map((org) => (

              <option
                key={org.id}
                value={org.id}
              >
                {org.name}
              </option>

            ))}

          </select>

        </div>

        <div>

          <label className="
            block
            text-sm
            text-zinc-400
            mb-2
          ">
            Source Type
          </label>

          <select
            value={sourceType}
            onChange={(e) =>
              setSourceType(
                e.target.value
              )
            }
            className="
              w-full
              rounded-xl
              bg-zinc-800
              border
              border-zinc-700
              p-3
              outline-none
            "
          >

            <option value="sap">
              SAP
            </option>

            <option value="utility">
              Utility
            </option>

            <option value="travel">
              Travel
            </option>

          </select>

        </div>

        <div>

          <label className="
            block
            text-sm
            text-zinc-400
            mb-2
          ">
            Upload File
          </label>

          <input
            type="file"
            onChange={(e) =>
              setFile(
                e.target.files[0]
              )
            }
            className="
              w-full
              rounded-xl
              bg-zinc-800
              border
              border-zinc-700
              p-3
            "
          />

        </div>

        <button
          onClick={handleUpload}
          disabled={loading}
          className="
            w-full
            rounded-xl
            bg-gradient-to-r
            from-emerald-500
            to-cyan-500
            py-3
            font-semibold
            hover:opacity-90
            transition-all
          "
        >

          {loading
            ? "Uploading..."
            : "Upload ESG Data"}

        </button>

        {message && (

          <div className="
            text-sm
            text-zinc-300
          ">

            {message}

          </div>

        )}

      </div>

    </motion.div>
  );
}

export default UploadForm;