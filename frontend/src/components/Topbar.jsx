import {
  Moon,
  Sun
} from "lucide-react";

import { useTheme } from "../context/ThemeContext";


function Topbar({
  organizations,
  selectedOrg,
  setSelectedOrg
}) {

  const {
    theme,
    toggleTheme
  } = useTheme();

  return (

    <header className="
      h-20
      border-b
      border-zinc-800
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

      <div className="
        flex
        items-center
        gap-4
      ">

        <select
          value={selectedOrg}
          onChange={(e) => {

            setSelectedOrg(
                e.target.value
            );

            localStorage.setItem(
                "selectedOrg",
                e.target.value
            );

            }}
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

          {organizations.map((org) => (

            <option
              key={org.id}
              value={org.id}
            >
              {org.name}
            </option>

          ))}

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

          {theme === "dark"
            ? <Sun size={18} />
            : <Moon size={18} />
          }

        </button>

      </div>

    </header>
  );
}

export default Topbar;