import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import OrganizationCard
from "../components/organizations/OrganizationCard";

import AddOrganizationModal
from "../components/organizations/AddOrganizationModal";

import api from "../services/api";

import { Plus } from "lucide-react";


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