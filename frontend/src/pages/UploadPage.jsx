import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import UploadZone from "../components/uploads/UploadZone";

import UploadsTable from "../components/uploads/UploadsTable";

import api from "../services/api";


function UploadsPage() {

  const [organizations, setOrganizations] =
    useState([]);

  const [selectedOrg, setSelectedOrg] =
  useState(
    localStorage.getItem(
      "selectedOrg"
    ) || ""
  );

  const [uploads, setUploads] =
    useState([]);

  useEffect(() => {

    fetchOrganizations();

  }, []);

  useEffect(() => {

    if (selectedOrg) {

      fetchUploads(selectedOrg);

    }

  }, [selectedOrg]);

  const fetchOrganizations = async () => {

    try {

      const response = await api.get(
        "/organizations/"
      );

      setOrganizations(response.data);

      if (
  response.data.length > 0 &&
  !localStorage.getItem(
    "selectedOrg"
  )
) {

  const defaultOrg =
    response.data[0].id;

  setSelectedOrg(
    defaultOrg
  );

  localStorage.setItem(
    "selectedOrg",
    defaultOrg
  );

}

    } catch (error) {

      console.error(error);

    }

  };

  const fetchUploads = async (
    organizationId
  ) => {

    try {

      const response = await api.get(
        `/analytics_dashboard/recent-uploads/?organization_id=${organizationId}`
      );

      setUploads(response.data);

    } catch (error) {

      console.error(error);

    }

  };

  return (

    <DashboardLayout
      organizations={organizations}
      selectedOrg={selectedOrg}
      setSelectedOrg={setSelectedOrg}
    >

      <div className="
        space-y-10
        max-w-[1600px]
      ">

        <div>

          <h1 className="
            text-5xl
            font-bold
            tracking-tight
          ">

            Upload Center

          </h1>

          <p className="
            text-zinc-500
            dark:text-zinc-400

            mt-3
            text-lg
          ">

            Upload ESG datasets and monitor ingestion activity

          </p>

        </div>

        <UploadZone
        onUploadSuccess={() =>
            fetchUploads(selectedOrg)
        }
        />

        <UploadsTable
          uploads={uploads}
        />

      </div>

    </DashboardLayout>

  );
}

export default UploadsPage;