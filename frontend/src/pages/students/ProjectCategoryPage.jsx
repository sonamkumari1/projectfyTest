import { Skeleton } from "@/components/ui/skeleton";
import { useGetProjectsByCategoryQuery } from "@/redux/features/api/projectApi";
import React from "react";
import { useParams } from "react-router-dom";
import ProjectCard from "./ProjectCard";

function ProjectCategoryPage() {
  const { category } = useParams();
  const decodedCategory = decodeURIComponent(category);

  const { data, isLoading, isError } =
    useGetProjectsByCategoryQuery(decodedCategory);

    console.log(data, "......");

  if (isError)
    return (
      <h1 className="text-center text-red-500">
        Some error occurred while fetching projects.
      </h1>
    );

  return (
    <div className="bg-gray-50 dark:bg-[#141414] min-h-screen">
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="font-bold text-3xl text-center mb-10">
          Projects in {decodedCategory}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading
            ? Array.from({ length: 8 }).map((_, index) => (
                <ProjectSkeleton key={index} />
              ))
            : data?.projects &&
              data.projects.map((project, index) => (
                <ProjectCard key={index} project={project} />
              ))}
        </div>

        {!isLoading && data?.projects?.length === 0 && (
          <p className="text-center text-gray-500 mt-6">
            No projects found in {decodedCategory}.
          </p>
        )}
      </div>
    </div>
  );
}

export default ProjectCategoryPage;

const ProjectSkeleton = () => {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden">
      <Skeleton className="w-full h-36" />
      <div className="px-5 py-4 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-4 w-1/4" />
      </div>
    </div>
  );
};
