import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import SuspiciousRecordsTable
from "../components/suspicious/SuspiciousRecordsTable";

import RecordDetailsModal
from "../components/suspicious/RecordDetailsModal";

import api from "../services/api";


function SuspiciousRecordsPage() {

  const [organizations, setOrganizations] =
    useState([]);

  const [selectedOrg, setSelectedOrg] =
    useState(
      localStorage.getItem(
        "selectedOrg"
      ) || ""
    );

  const [records, setRecords] =
    useState([]);

  const [selectedRecord, setSelectedRecord] =
    useState(null);

  useEffect(() => {

    fetchOrganizations();

  }, []);

  useEffect(() => {

    if (selectedOrg) {

      fetchSuspiciousRecords(
        selectedOrg
      );

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

  const fetchSuspiciousRecords = async (
    organizationId
  ) => {

    try {

      const response = await api.get(
        `/analytics_dashboard/suspicious-records/?organization_id=${organizationId}`
      );

      setRecords(response.data);

    } catch (error) {

      console.error(error);

    }

  };

  const updateRecordStatus = async (
    recordId,
    status
  ) => {

    try {

      await api.patch(
        `/analytics_dashboard/update-status/${recordId}/`,
        {
          status
        }
      );

      fetchSuspiciousRecords(
        selectedOrg
      );

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

            Suspicious Records

          </h1>

          <p className="
            text-zinc-500
            dark:text-zinc-400

            mt-3
            text-lg
          ">

            Review flagged ESG emission anomalies

          </p>

        </div>

        <SuspiciousRecordsTable

          records={records}

          onStatusUpdate={
            updateRecordStatus
          }

          onViewDetails={
            setSelectedRecord
          }

        />

      </div>

      <RecordDetailsModal

        record={selectedRecord}

        onClose={() =>
          setSelectedRecord(null)
        }

      />

    </DashboardLayout>

  );
}

export default SuspiciousRecordsPage;