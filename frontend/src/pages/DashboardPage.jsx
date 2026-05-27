import { useEffect, useState } from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import DashboardLayout
from "../layouts/DashboardLayout";

import KpiCard
from "../components/dashboard/KpiCard";

import SourceBreakdownChart
from "../components/dashboard/SourceBreakdownChart";

import ScopeBreakdownChart
from "../components/dashboard/ScopeBreakdownChart";

import RecentUploadsTable
from "../components/dashboard/RecentUploadsTable";

import api from "../services/api";

import {
  Database,
  AlertTriangle,
  Building2,
  BarChart3
} from "lucide-react";


function DashboardPage() {

  const navigate = useNavigate();

  const [summary, setSummary] =
    useState(null);

  const [recentUploads, setRecentUploads] =
    useState([]);

  const [suspiciousRecords, setSuspiciousRecords] =
    useState([]);

  const [organizations, setOrganizations] =
    useState([]);

  const [selectedOrg, setSelectedOrg] =
    useState(
      localStorage.getItem(
        "selectedOrg"
      ) || ""
    );

  useEffect(() => {

    fetchOrganizations();

  }, []);

  useEffect(() => {

    if (selectedOrg) {

      fetchDashboard(selectedOrg);

      fetchRecentUploads(selectedOrg);

      fetchSuspiciousRecords(selectedOrg);

    }

  }, [selectedOrg]);

  const fetchOrganizations = async () => {

    try {

      const response = await api.get(
        "/organizations/"
      );

      setOrganizations(response.data);

      if (
        response.data.length === 0
      ) {

        localStorage.removeItem(
          "selectedOrg"
        );

        setSelectedOrg("");

        return;

      }

      const storedOrg =
        localStorage.getItem(
          "selectedOrg"
        );

      const orgExists =
        response.data.some(
          (org) =>
            org.id === storedOrg
        );

      if (!orgExists) {

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

      console.error(
        "Organizations fetch error",
        error
      );

    }

  };

  const fetchDashboard = async (
    organizationId
  ) => {

    try {

      const response = await api.get(
        `/analytics_dashboard/summary/?organization_id=${organizationId}`
      );

      setSummary(response.data);

    } catch (error) {

      console.error(
        "Dashboard fetch error",
        error
      );

    }

  };

  const fetchRecentUploads = async (
    organizationId
  ) => {

    try {

      const response = await api.get(
        `/analytics_dashboard/recent-uploads/?organization_id=${organizationId}`
      );

      setRecentUploads(response.data);

    } catch (error) {

      console.error(
        "Recent uploads fetch error",
        error
      );

    }

  };

  const fetchSuspiciousRecords = async (
    organizationId
  ) => {

    try {

      const response = await api.get(
        `/analytics_dashboard/suspicious-records/?organization_id=${organizationId}`
      );

      setSuspiciousRecords(
        response.data
      );

    } catch (error) {

      console.error(
        "Suspicious records fetch error",
        error
      );

    }

  };

  const stats = [
    {
      title: "Total Uploads",
      value: summary?.total_uploads || 0,
      icon: Database,
      color:
        "bg-cyan-500/20 text-cyan-400"
    },
    {
      title: "Organizations",
      value: organizations.length,
      icon: Building2,
      color:
        "bg-emerald-500/20 text-emerald-400"
    },
    {
      title: "Suspicious Records",
      value:
        summary?.suspicious_records || 0,
      icon: AlertTriangle,
      color:
        "bg-red-500/20 text-red-400"
    },
    {
      title: "Emission Records",
      value:
        summary?.total_normalized_records || 0,
      icon: BarChart3,
      color:
        "bg-purple-500/20 text-purple-400"
    }
  ];

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

            Sustainability Overview

          </h1>

          <p className="
            text-zinc-500
            dark:text-zinc-400

            mt-3
            text-lg
          ">

            Monitor ESG ingestion
            and emissions activity

          </p>

        </div>

        {
          organizations.length === 0 && (

            <div
              className="
                rounded-3xl

                border
                border-zinc-200
                dark:border-zinc-800

                bg-white
                dark:bg-zinc-900

                p-12

                flex
                flex-col
                items-center
                justify-center

                text-center

                shadow-xl
              "
            >

              <h2
                className="
                  text-3xl
                  font-bold
                "
              >

                No Organizations Found

              </h2>

              <p
                className="
                  mt-4

                  text-zinc-500
                  dark:text-zinc-400

                  max-w-2xl
                  text-lg
                "
              >

                Create your first ESG
                organization to begin
                uploading sustainability
                data, reviewing suspicious
                records, and monitoring
                emissions analytics.

              </p>

              <button

                onClick={() =>
                  navigate(
                    "/organizations"
                  )
                }

                className="
                  mt-8

                  px-6
                  py-3

                  rounded-2xl

                  bg-gradient-to-r
                  from-emerald-500
                  to-cyan-500

                  text-white
                  font-medium

                  hover:scale-105

                  transition-all
                  duration-300

                  shadow-lg
                "
              >

                Create First Organization

              </button>

            </div>
          )
        }

        {
          organizations.length > 0 && (
            <>

              <div className="
                grid
                grid-cols-1
                md:grid-cols-2
                xl:grid-cols-4
                gap-6
              ">

                {stats.map((
                  item,
                  index
                ) => (

                  <KpiCard
                    key={index}
                    title={item.title}
                    value={item.value}
                    icon={item.icon}
                    color={item.color}
                  />

                ))}

              </div>

              <div className="
                grid
                grid-cols-1
                xl:grid-cols-2
                gap-6
              ">

                <SourceBreakdownChart
                  data={
                    summary?.source_breakdown || []
                  }
                />

                <ScopeBreakdownChart
                  data={
                    summary?.scope_breakdown || []
                  }
                />

              </div>

              <RecentUploadsTable
                uploads={recentUploads}
              />

              <div className="
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
              ">

                <div className="
                  p-6

                  border-b
                  border-zinc-200
                  dark:border-zinc-800

                  flex
                  items-center
                  justify-between
                ">

                  <div>

                    <h2 className="
                      text-2xl
                      font-semibold
                      tracking-tight
                    ">

                      Suspicious Records

                    </h2>

                    <p className="
                      text-zinc-500
                      dark:text-zinc-400

                      text-sm
                      mt-1
                    ">

                      Recently flagged anomalies

                    </p>

                  </div>

                  <Link
                    to="/suspicious-records"
                    className="
                      text-sm
                      text-emerald-500
                      dark:text-emerald-400

                      hover:text-emerald-400
                      dark:hover:text-emerald-300

                      transition-colors
                    "
                  >

                    View All →

                  </Link>

                </div>

                <div className="overflow-x-auto">

                  <table className="
                    w-full
                    text-sm
                  ">

                    <thead className="
                      bg-zinc-100/80
                      dark:bg-zinc-800/40

                      text-zinc-500
                      dark:text-zinc-400
                    ">

                      <tr>

                        <th className="
                          px-6
                          py-4
                          text-left
                          font-medium
                        ">
                          Source
                        </th>

                        <th className="
                          px-6
                          py-4
                          text-left
                          font-medium
                        ">
                          Scope
                        </th>

                        <th className="
                          px-6
                          py-4
                          text-left
                          font-medium
                        ">
                          Quantity
                        </th>

                        <th className="
                          px-6
                          py-4
                          text-left
                          font-medium
                        ">
                          Status
                        </th>

                      </tr>

                    </thead>

                    <tbody>

                      {suspiciousRecords
                        .slice(0, 3)
                        .map((record) => (

                        <tr
                          key={record.id}
                          className="
                            border-b
                            border-zinc-100
                            dark:border-zinc-800

                            hover:bg-emerald-500/5
                            dark:hover:bg-zinc-800/30

                            transition-colors
                          "
                        >

                          <td className="px-6 py-5">

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

                          <td className="px-6 py-5">

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

                          <td className="px-6 py-5">

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

                        </tr>

                      ))}

                    </tbody>

                  </table>

                </div>

              </div>

            </>
          )
        }

      </div>

    </DashboardLayout>

  );
}

export default DashboardPage;