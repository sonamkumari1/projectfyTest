// import { ChartNoAxesColumn, SquareLibrary } from "lucide-react";
// import React from "react";
// import { Link, Outlet } from "react-router-dom";

// const Sidebar = () => {
//   return (
//     <div className="flex">
//       <div className="hidden lg:block w-[250px] sm:w-[300px] space-y-8 border-r border-gray-300 dark:border-gray-700  p-5 sticky top-0  h-screen">
//         <div className="space-y-4 ">
//           <Link to="dashboard" className="flex items-center gap-2">
//             <ChartNoAxesColumn size={22} />
//             <h1>Dashboard</h1>
//           </Link>
//           <Link to="addProject" className="flex items-center gap-2">
//             <SquareLibrary size={22} />
//             <h1>Projects</h1>
//           </Link>
//         </div>
//       </div>
//     <div className="flex-1 p-10 ">
//         <Outlet/>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
import { ChartNoAxesColumn, SquareLibrary, Menu, X } from "lucide-react";
import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex">
      {/* Sidebar for large screens */}
      <div className="hidden lg:block w-[250px] sm:w-[300px] space-y-8 border-r border-gray-300 dark:border-gray-700 p-5 sticky top-0 h-screen">
        <div className="space-y-4">
          <Link to="dashboard" className="flex items-center gap-2">
            <ChartNoAxesColumn size={22} />
            <h1>Dashboard</h1>
          </Link>
          <Link to="addProject" className="flex items-center gap-2">
            <SquareLibrary size={22} />
            <h1>Projects</h1>
          </Link>
             <Link to="project" className="flex items-center gap-2">
            <SquareLibrary size={22} />
            <h1>All Projects</h1>
          </Link>
        </div>
      </div>

      {/* Mobile Sidebar Toggle Button */}
      <div className="lg:hidden fixed top-0 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-md bg-gray-200 dark:bg-gray-800"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-[220px] sm:w-[260px] bg-white dark:bg-gray-900 border-r border-gray-300 dark:border-gray-700 p-5 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-40`}
      >
        <div className="space-y-4 mt-10">
          <Link
            to="dashboard"
            className="flex items-center gap-2"
            onClick={() => setIsOpen(false)}
          >
            <ChartNoAxesColumn size={22} />
            <h1>Dashboard</h1>
          </Link>
          <Link
            to="addProject"
            className="flex items-center gap-2"
            onClick={() => setIsOpen(false)}
          >
            <SquareLibrary size={22} />
            <h1>Projects</h1>
          </Link>
           <Link
            to="project"
            className="flex items-center gap-2"
            onClick={() => setIsOpen(false)}
          >
            <SquareLibrary size={22} />
            <h1>All Projects</h1>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;
