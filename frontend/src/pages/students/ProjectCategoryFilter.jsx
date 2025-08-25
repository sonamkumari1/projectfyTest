import React, { useState } from "react";
import { useGetProjectsByCategoryQuery } from "@/redux/features/api/projectApi";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    src: "https://images.ctfassets.net/23aumh6u8s0i/5gieAxw4n3rxYsyjaAnhGm/aa67599b991ad67b3241bf730fc2a131/security_programming_hero.jpg",
    title: "Web Development",
  },
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJNZxyMbnxN27zZlrMzbzD3eVlQbWXcB0cDw&s",
    title: "Frontend Development",
  },
  {
    src: "https://www.mooc.org/hubfs/applications-of-computer-programming.jpg",
    title: "Fullstack Development",
  },
  {
    src: "https://dz2cdn1.dzone.com/storage/temp/12334613-971.jpg",
    title: "MERN Stack Development",
  },
  {
    src: "https://builtin.com/sites/www.builtin.com/files/2024-10/data-science.jpg",
    title: "Data Science Projects",
  },
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTX3omU3vfzb5olH7BiJPqOC4VpPQlEry4OW51kPTCOeaIu0OS5gt-eeorDSJKn13cBO4w&usqp=CAU",
    title: "Mobile Development",
  },
  {
    src: "https://www.udacity.com/_next/image?url=https%3A%2F%2Fvideo.udacity-data.com%2Ftopher%2F2024%2FOctober%2F67098980_ud994%2Fud994.jpg&w=3840&q=75",
    title: "Java Projects",
  },
  {
    src: "https://cdn.britannica.com/30/199930-050-22822D75/computer.jpg",
    title: "Python Projects",
  },
];

const ProjectFilter = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetProjectsByCategoryQuery(
    selectedCategory,
    { skip: !selectedCategory }
  );

  return (
    <div className="relative w-full max-w-screen-xl mx-auto rounded-xl 
                    backdrop-blur-md px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10">
      {/* Heading */}
      <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold 
                     text-black dark:text-white mb-6 sm:mb-8 
                     text-center leading-snug sm:leading-tight">
        Explore & Buy Ready-Made Projects
      </h1>

      {/* Subheading */}
      <p className="text-xs sm:text-sm lg:text-base text-gray-700 dark:text-gray-300 
                    mb-10 sm:mb-16 max-w-3xl mx-auto text-center leading-relaxed px-2">
        From <span className="text-blue-600 font-semibold">Web Development</span> 
        and <span className="text-green-600 font-semibold">Data Science</span> to 
        <span className="text-yellow-500 font-semibold">Mobile Apps</span> and 
        <span className="text-pink-500 font-semibold">Fullstack Solutions</span> — 
        explore our curated project categories. Pick your domain, dive in, and get hands-on with ready-to-use projects.
      </p>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 
                      gap-6 sm:gap-8 px-2 sm:px-0">
        {categories.map((item, index) => (
          <div
            key={index}
            onClick={() =>
              navigate(`/project/category/${encodeURIComponent(item.title)}`)
            }
            className="relative group mb-3 bg-gray-200 rounded-lg border border-gray-300 
                       shadow-md cursor-pointer overflow-hidden 
                       w-full h-40 sm:h-48 lg:h-56 mx-auto 
                       transition-all duration-300 ease-in-out 
                       hover:shadow-2xl hover:-translate-y-1 
                       dark:bg-gray-800 dark:border-gray-900"
          >
            <img
              src={item.src}
              alt={item.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center 
                            bg-black bg-opacity-30 opacity-0 
                            group-hover:opacity-100 transition duration-300">
              <h1 className="text-white font-bold text-lg sm:text-xl text-center px-2">
                {item.title}
              </h1>
            </div>
          </div>
        ))}
      </div>

      {/* Projects Result */}
      <div className="mt-8 sm:mt-10">
        {isLoading && (
          <p className="text-black dark:text-white text-center">Loading...</p>
        )}
        {isError && (
          <p className="text-red-500 text-center">Failed to fetch projects</p>
        )}

        {data?.projects?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.projects.map((project) => (
              <div
                key={project._id}
                className="p-4 sm:p-5 bg-gray-100 rounded-lg border border-gray-300 
                           shadow-md dark:bg-gray-900 dark:border-gray-700"
              >
                <h2 className="text-lg sm:text-xl font-bold text-black dark:text-white">
                  {project.title}
                </h2>
                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-400 mt-2">
                  {project.description}
                </p>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-2">
                  By {project.creator?.name}
                </p>
              </div>
            ))}
          </div>
        ) : (
          selectedCategory &&
          !isLoading && (
            <p className="text-gray-700 dark:text-gray-400 text-center mt-6">
              No projects found in {selectedCategory}
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default ProjectFilter;
