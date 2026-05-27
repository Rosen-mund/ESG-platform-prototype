import {
  Moon,
  Sun,
  Menu
} from "lucide-react";

import {
  useNavigate
} from "react-router-dom";

import { useTheme }
from "../context/ThemeContext";


function Topbar({

  organizations,

  selectedOrg,

  setSelectedOrg,

  toggleSidebar

}) {

  const navigate = useNavigate();

  const {
    theme,
    toggleTheme
  } = useTheme();

  const handleOrganizationChange = (
    e
  ) => {

    const value =
      e.target.value;

    if (
      value === "add_new"
    ) {

      navigate(
        "/organizations"
      );

      return;
    }

    const orgExists =
      organizations.some(
        (org) =>
          org.id === value
      );

    if (!orgExists) {

      localStorage.removeItem(
        "selectedOrg"
      );

      return;
    }

    setSelectedOrg(value);

    localStorage.setItem(
      "selectedOrg",
      value
    );

  };

  return (

    <header className="
      h-20

      border-b
      border-zinc-200
      dark:border-zinc-800

      bg-white/80
      dark:bg-zinc-900/50

      backdrop-blur-xl

      px-6

      flex
      items-center
      justify-between

      transition-colors
    ">

      <div className="
        flex
        items-center
        gap-4
      ">

        <button

          onClick={toggleSidebar}

          className="
            p-3

            rounded-xl

            bg-zinc-100
            dark:bg-zinc-800

            hover:bg-zinc-200
            dark:hover:bg-zinc-700

            transition-all
          "
        >

          <Menu size={20} />

        </button>

        <div>

          <h2 className="
            text-2xl
            font-semibold

            text-zinc-900
            dark:text-white
          ">

            ESG Dashboard

          </h2>

          <p className="
            text-zinc-500
            dark:text-zinc-400

            text-sm
          ">

            Sustainability analytics overview

          </p>

        </div>

      </div>

      <div className="
        flex
        items-center
        gap-4
      ">

        <select

          value={selectedOrg}

          onChange={
            handleOrganizationChange
          }

          className="
            bg-zinc-100
            dark:bg-zinc-800

            border
            border-zinc-300
            dark:border-zinc-700

            rounded-xl

            px-4
            py-2

            text-sm

            outline-none

            text-zinc-900
            dark:text-white
          "
        >

          {
            organizations.map((org) => (

              <option
                key={org.id}
                value={org.id}
              >

                {org.name}

              </option>

            ))
          }

          <option value="add_new">

            + Add Organization

          </option>

        </select>

        <button

          onClick={toggleTheme}

          className="
            p-3

            rounded-xl

            bg-zinc-100
            dark:bg-zinc-800

            hover:bg-zinc-200
            dark:hover:bg-zinc-700

            transition-all
          "
        >

          {
            theme === "dark"

              ? <Sun size={18} />

              : <Moon size={18} />
          }

        </button>

      </div>

    </header>
  );
}

export default Topbar;