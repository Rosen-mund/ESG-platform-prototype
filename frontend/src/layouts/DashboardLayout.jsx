import Sidebar from "../components/Sidebar";

import Topbar from "../components/Topbar";


function DashboardLayout({
  children,
  organizations,
  selectedOrg,
  setSelectedOrg
}) {

  return (

    <div className="
      flex
      min-h-screen

      bg-zinc-100
      dark:bg-zinc-950

      text-zinc-900
      dark:text-white

      transition-colors
      duration-500
    ">

      <Sidebar />

      <div className="
        flex-1
        flex
        flex-col
      ">

        <Topbar
          organizations={organizations}
          selectedOrg={selectedOrg}
          setSelectedOrg={setSelectedOrg}
        />

        <main className="
          p-6
          transition-colors
          duration-500
        ">

          {children}

        </main>

      </div>

    </div>

  );
}

export default DashboardLayout;