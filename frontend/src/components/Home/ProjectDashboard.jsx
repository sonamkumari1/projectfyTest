// import ProjectFilter from "@/pages/students/ProjectCategoryFilter";
// import ProjectinDashboard from "@/pages/students/ProjectinDashboard";
// import ProjectLevelFilter from "@/pages/students/ProjectLevelFilter";
// import { useNavigate } from "react-router-dom";

// function ProjectDashboard() {
//   const navigate = useNavigate();
//   return (
//     <div className="flex flex-col items-center justify-center px-4 sm:px-10 pt-10 pb-20 bg-black gap-24">
//       <ProjectFilter />
//       <ProjectLevelFilter />

//       <div className="relative w-full max-w-screen-xl mx-auto md:mt-5 border border-gray-800 shadow-xl shadow-gray-900 rounded-xl bg-white/5 backdrop-blur-md px-6 sm:px-8 md:py-10 py-10 hover:shadow-[0_0_20px_rgba(0,0,0,0.7)]">
//         <div className="text-center mb-3">
//           <h1 className="text-3xl sm:text-5xl mb-10 font-extrabold text-gray-900 dark:text-white leading-tight">
//             🚀 Featured Published Projects
//           </h1>
//           <p className="mt-4 text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
//             Explore our most popular and high-quality published projects.
//             Perfect for learning, inspiration, or direct implementation into
//             your portfolio.
//           </p>
//         </div>

//         <div className="flex justify-end mb-6">
//           <button
//             onClick={() => navigate("/projects")}
//             className="px-6 py-3 bg-zinc-900 text-white rounded-full hover:bg-purple-700 transition"
//           >
//             View All
//           </button>
//         </div>

//         <ProjectinDashboard limit={4} />
//       </div>

//       <div className="relative w-full max-w-screen-xl mx-auto md:mt-5 border border-gray-800 shadow-xl shadow-gray-900 rounded-xl bg-white/5 backdrop-blur-md px-6 sm:px-8 md:py-20 py-10 hover:shadow-[0_0_20px_rgba(0,0,0,0.7)]">
//         <div className="flex flex-col md:flex-row items-center justify-between w-full gap-10 text-center md:text-left">
//           <div className="flex-1">
//             <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 leading-tight">
//               Share Your Idea for Project
//             </h1>
//             <p className="text-sm sm:text-base text-gray-300 mb-6">
//               Got a unique project idea? Share it with us and let us help you
//               turn it into a successful business opportunity. Collaborate,
//               innovate, and create with confidence.
//             </p>
//             <button
//               onClick={() => navigate("/idea")}
//               className="px-6 py-3 bg-zinc-900 text-white rounded-full hover:bg-purple-700 transition"
//             >
//               Share Your Idea
//             </button>
//           </div>

//           <div className="flex-1 flex justify-center">
//             <img
//               src="/ideas.png"
//               alt="Share Your Idea"
//               className="rounded-lg shadow-lg w-full max-w-[550px] h-auto"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProjectDashboard;
import ProjectFilter from "@/pages/students/ProjectCategoryFilter";
import ProjectinDashboard from "@/pages/students/ProjectinDashboard";
import ProjectLevelFilter from "@/pages/students/ProjectLevelFilter";
import { useNavigate } from "react-router-dom";

function ProjectDashboard() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center px-3 sm:px-10 pt-10 pb-20 gap-24
                    bg-white text-black dark:bg-black dark:text-white">
      <ProjectFilter />
      <ProjectLevelFilter />

      {/* Featured Published Projects */}
      <div className="relative w-full max-w-screen-xl mx-auto md:mt-5 border border-gray-300 shadow-xl rounded-xl 
                      bg-white dark:bg-white/5 dark:border-gray-800 backdrop-blur-md px-3 sm:px-8 md:py-10 py-10 
                      hover:shadow-[0_0_20px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_0_20px_rgba(0,0,0,0.7)]">
        <div className="text-center mb-3">
          <h1 className="text-3xl sm:text-5xl mb-2 mt-3 sm:mt-5 md:mt-5  sm:mb-10 md:mb-10 font-extrabold text-gray-900 dark:text-white leading-tight">
            Featured Published Projects
          </h1>
          <p className="mt-4 text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Explore our most popular and high-quality published projects.
            Perfect for learning, inspiration, or direct implementation into
            your portfolio.
          </p>
        </div>

        <div className="flex justify-end mb-3">
          <button
            onClick={() => navigate("/projects")}
            className="px-4 py-2 bg-gray-900 text-white rounded-full hover:bg-purple-700 transition
                       dark:bg-zinc-900"
          >
            View All
          </button>
        </div>

        <ProjectinDashboard limit={4} />
      </div>

      {/* Share Your Idea Section */}
      <div className="relative w-full max-w-screen-xl mx-auto md:mt-5 border border-gray-300 shadow-xl rounded-xl 
                      bg-white dark:bg-white/5 dark:border-gray-800 backdrop-blur-md px-6 sm:px-8 md:py-20 py-10 
                      hover:shadow-[0_0_20px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_0_20px_rgba(0,0,0,0.7)]">
        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-10 text-center md:text-left">
          <div className="flex-1">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-black dark:text-white mb-4 leading-tight">
              Share Your Idea for Project
            </h1>
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-6">
              Got a unique project idea? Share it with us and let us help you
              turn it into a successful business opportunity. Collaborate,
              innovate, and create with confidence.
            </p>
            <button
              onClick={() => navigate("/idea")}
              className="px-6 py-3 bg-gray-900 text-white rounded-full hover:bg-purple-700 transition
                         dark:bg-zinc-900"
            >
              Share Your Idea
            </button>
          </div>

          <div className="flex-1 flex justify-center">
            <img
              src="/ideas.png"
              alt="Share Your Idea"
              className="rounded-lg shadow-lg w-full max-w-[550px] h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDashboard;
