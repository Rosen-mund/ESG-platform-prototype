import {
  LayoutDashboard,
  Upload,
  AlertTriangle,
  Building2
} from "lucide-react";

import { motion } from "framer-motion";

import {
  Link,
  useLocation
} from "react-router-dom";


function Sidebar() {

  const location = useLocation();

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      path: "/"
    },
    {
      icon: Upload,
      label: "Uploads",
      path: "/uploads"
    },
    {
      icon: AlertTriangle,
      label: "Suspicious Records",
      path: "/suspicious-records"
    },
    {
      icon: Building2,
      label: "Organizations",
      path: "/organizations"
    }
  ];

  return (

    <motion.aside

      initial={{
        x: -40,
        opacity: 0
      }}

      animate={{
        x: 0,
        opacity: 1
      }}

      className="
        w-72
        border-r

        border-zinc-200
        dark:border-zinc-800

        bg-white/80
        dark:bg-zinc-900/70

        backdrop-blur-xl

        transition-colors
        duration-500
      "
    >

      <div className="
        p-6
        border-b

        border-zinc-200
        dark:border-zinc-800
      ">

        <h1 className="
          text-2xl
          font-bold
          bg-gradient-to-r
          from-emerald-400
          to-cyan-400
          bg-clip-text
          text-transparent
        ">

          ESG Platform

        </h1>

        <p className="
          text-zinc-500
          dark:text-zinc-400

          text-sm
          mt-1
        ">

          Multi-Organization Analytics

        </p>

      </div>

      <nav className="
        p-4
        space-y-2
      ">

        {menuItems.map((item, index) => {

          const Icon = item.icon;

          const isActive =
            item.path === "/"
              ? location.pathname === "/"
              : location.pathname.startsWith(
                  item.path
                );

          return (

            <Link
              to={item.path}
              key={index}
            >

              <motion.div

                whileHover={{
                  scale: 1.02
                }}

                whileTap={{
                  scale: 0.98
                }}

                className={`
                  w-full
                  flex
                  items-center
                  gap-3
                  px-4
                  py-3
                  rounded-xl
                  transition-all
                  duration-300

                  ${
                    isActive

                    ? `
                      bg-gradient-to-r
                      from-emerald-500/10
                      to-cyan-500/10

                      text-zinc-900
                      dark:text-white

                      border
                      border-emerald-500/20
                    `

                    : `
                      text-zinc-600
                      dark:text-zinc-300

                      hover:bg-zinc-100
                      dark:hover:bg-zinc-800

                      hover:text-zinc-900
                      dark:hover:text-white
                    `
                  }
                `}
              >

                <Icon size={20} />

                <span>
                  {item.label}
                </span>

              </motion.div>

            </Link>

          );
        })}

      </nav>

    </motion.aside>
  );
}

export default Sidebar;