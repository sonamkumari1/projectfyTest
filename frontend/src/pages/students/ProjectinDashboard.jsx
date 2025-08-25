// import { Skeleton } from "@/components/ui/skeleton";
// import { useGetPublishedProjectQuery } from "@/redux/features/api/projectApi";
// import React from "react";
// import ProjectCard from "./ProjectCard";

// function ProjectinDashboard({ limit }) {
//   const { data, isLoading, isError } = useGetPublishedProjectQuery();
//   console.log(data);
//   if (isError) return <h1>Some error occurred while fetching projects.</h1>;

//   const projects = data?.project || [];
//   const displayedProjects = limit ? projects.slice(0, limit) : projects;

//   return (
//     <div className="">
//       <div className="max-w-7xl mx-auto p-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {isLoading
//             ? Array.from({ length: limit || 8 }).map((_, index) => (
//                 <ProjectSkeleton key={index} />
//               ))
//             : displayedProjects.map((project, index) => (
//                 <ProjectCard key={index} project={project} />
//               ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProjectinDashboard;

// const ProjectSkeleton = () => {
//   return (
//     <div className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden">
//       <Skeleton className="w-full h-36" />
//       <div className="px-5 py-4 space-y-3">
//         <Skeleton className="h-6 w-3/4" />
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <Skeleton className="h-6 w-6 rounded-full" />
//             <Skeleton className="h-4 w-20" />
//           </div>
//           <Skeleton className="h-4 w-16" />
//         </div>
//         <Skeleton className="h-4 w-1/4" />
//       </div>
//     </div>
//   );
// };

import { Skeleton } from "@/components/ui/skeleton";
import { useGetPublishedProjectQuery } from "@/redux/features/api/projectApi";
import React from "react";
import ProjectCard from "./ProjectCard";

function ProjectinDashboard({ limit }) {
  const { data, isLoading, isError } = useGetPublishedProjectQuery();
  const projects = data?.project || [];
  const displayedProjects = limit ? projects.slice(0, limit) : projects;

  if (isError) return <h1 className="text-black dark:text-white text-center">Some error occurred while fetching projects.</h1>;

  return (
    <div className="">
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading
            ? Array.from({ length: limit || 8 }).map((_, index) => (
                <ProjectSkeleton key={index} />
              ))
            : displayedProjects.map((project, index) => (
                <ProjectCard key={index} project={project} />
              ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectinDashboard;

const ProjectSkeleton = () => {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden dark:bg-gray-900">
      <Skeleton className="w-full h-36" />
      <div className="px-5 py-4 space-y-3">
        <Skeleton className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700" />
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-4 w-20 bg-gray-200 dark:bg-gray-700" />
        </div>
        <Skeleton className="h-4 w-1/4 bg-gray-200 dark:bg-gray-700" />
      </div>
    </div>
  );
};
