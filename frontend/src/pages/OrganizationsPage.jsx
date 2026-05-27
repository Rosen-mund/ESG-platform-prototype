import { useEffect, useState } from "react";

import DashboardLayout
from "../layouts/DashboardLayout";

import OrganizationCard
from "../components/organizations/OrganizationCard";

import AddOrganizationModal
from "../components/organizations/AddOrganizationModal";

import api
from "../services/api";

import { Plus }
from "lucide-react";


function OrganizationsPage() {

  const [organizations, setOrganizations] =
    useState([]);

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [selectedOrg, setSelectedOrg] =
    useState(
      localStorage.getItem(
        "selectedOrg"
      ) || ""
    );

  useEffect(() => {

    fetchOrganizations();

  }, []);

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

      console.error(error);

    }

  };

  const deleteOrganization = async (
    organizationId
  ) => {

    const confirmed =
      window.confirm(
        "Delete this organization?"
      );

    if (!confirmed) return;

    try {

      await api.delete(
        `/organizations/${organizationId}/`
      );

      const storedOrg =
        localStorage.getItem(
          "selectedOrg"
        );

      if (
        storedOrg === organizationId
      ) {

        localStorage.removeItem(
          "selectedOrg"
        );

        setSelectedOrg("");
      }

      fetchOrganizations();

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

            Organizations

          </h1>

          <p className="
            text-zinc-500
            dark:text-zinc-400

            mt-3
            text-lg
          ">

            Multi-tenant ESG organization overview

          </p>

          <button

            onClick={() =>
              setIsModalOpen(true)
            }

            className="
              mt-6

              inline-flex
              items-center
              gap-2

              px-5
              py-3

              rounded-2xl

              bg-gradient-to-r
              from-emerald-500
              to-cyan-500

              text-white
              font-medium

              shadow-lg

              hover:scale-105

              transition-all
              duration-300
            "
          >

            <Plus size={18} />

            Add Organization

          </button>

        </div>

        {
          organizations.length === 0 ? (

            <div className="
              rounded-3xl

              border
              border-zinc-200
              dark:border-zinc-800

              bg-white
              dark:bg-zinc-900

              p-12

              text-center

              shadow-xl
            ">

              <h2 className="
                text-3xl
                font-bold
              ">

                No Organizations Yet

              </h2>

              <p className="
                mt-4

                text-zinc-500
                dark:text-zinc-400

                max-w-2xl
                mx-auto
              ">

                Create your first ESG
                organization to begin
                uploading sustainability
                data and reviewing
                emissions analytics.

              </p>

            </div>

          ) : (

            <div className="
              grid
              grid-cols-1
              md:grid-cols-2
              xl:grid-cols-3
              gap-6
            ">

              {organizations.map((org) => (

                <OrganizationCard

                  key={org.id}

                  organization={org}

                  onDelete={
                    deleteOrganization
                  }

                />

              ))}

            </div>
          )
        }

      </div>

      <AddOrganizationModal

        isOpen={isModalOpen}

        onClose={() =>
          setIsModalOpen(false)
        }

        onOrganizationAdded={
          fetchOrganizations
        }

      />

    </DashboardLayout>

  );
}

export default OrganizationsPage;