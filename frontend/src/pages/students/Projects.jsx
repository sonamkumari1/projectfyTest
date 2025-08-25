// import { useState } from "react";
// import { useGetSearchProjectsQuery } from "@/redux/features/api/projectApi";
// import ProjectCard from "./ProjectCard";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import Filter from "./Filter";
// import { Skeleton } from "@/components/ui/skeleton";

// function Projects() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [sortByPrice, setSortByPrice] = useState("");

//   // ✅ Query backend with filters
//   const { data, isLoading, isError, refetch } = useGetSearchProjectsQuery({
//     searchQuery,
//     categories: selectedCategories,
//     sortByPrice,
//   });

//   if (isError) return <h1>Error fetching projects.</h1>;

//   const projects = data?.projects || [];

//   // ✅ Handle filter change
//   const handleFilterChange = (categories, price) => {
//     setSelectedCategories(categories);
//     setSortByPrice(price);
//   };

//   // ✅ Search submit
//   const handleSearch = (e) => {
//     e.preventDefault();
//     refetch();
//   };

//   return (
//     <div className="bg-gray-50 dark:bg-black">
//       {/* Search bar */}
//       <form
//         onSubmit={handleSearch}
//         className="flex items-center border border-zinc-700 dark:bg-zinc-900 rounded-full  shadow-lg overflow-hidden max-w-xl mx-auto mb-6"
//       >
//         <Input
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="flex-grow border-none focus-visible:ring-0 px-6 py-6 dark:bg-zinc-900 text-white placeholder-white dark:placeholder-white"
//           placeholder="Search Projects"
//         />
//         <Button
//           type="submit"
//           className="dark:bg-zinc-700 bg-blue-700 text-white px-6 py-6 rounded-full hover:bg-blue-700 dark:hover:bg-blue-800"
//         >
//           Search
//         </Button>
//       </form>

//       {/* Layout with Filter + Project List */}
//       <div className="max-w-7xl mx-auto p-6 flex flex-col md:flex-row gap-10">
//         {/* Sidebar Filter */}
//         <Filter handleFilterChange={handleFilterChange} />

//         {/* Project List */}
//         <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {isLoading
//             ? Array.from({ length: 6 }).map((_, i) => (
//                 <ProjectSkeleton key={i} />
//               ))
//             : projects.map((project, i) => (
//                 <ProjectCard key={i} project={project} />
//               ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Projects;

// // ✅ Skeleton Loader
// const ProjectSkeleton = () => (
//   <div className="bg-white shadow-md rounded-lg overflow-hidden">
//     <Skeleton className="w-full h-36" />
//     <div className="px-5 py-4 space-y-3">
//       <Skeleton className="h-6 w-3/4" />
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-3">
//           <Skeleton className="h-6 w-6 rounded-full" />
//           <Skeleton className="h-4 w-20" />
//         </div>
//         <Skeleton className="h-4 w-16" />
//       </div>
//       <Skeleton className="h-4 w-1/4" />
//     </div>
//   </div>
// );
import { useState } from "react";
import { useGetSearchProjectsQuery } from "@/redux/features/api/projectApi";
import ProjectCard from "./ProjectCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Filter from "./Filter";
import { Skeleton } from "@/components/ui/skeleton";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

function Projects() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortByPrice, setSortByPrice] = useState("");

  // ✅ Query backend with filters
  const { data, isLoading, isError, refetch } = useGetSearchProjectsQuery({
    searchQuery,
    categories: selectedCategories,
    sortByPrice,
  });

  if (isError) return <h1>Error fetching projects.</h1>;

  const projects = data?.projects || [];

  // ✅ Handle filter change
  const handleFilterChange = (categories, price) => {
    setSelectedCategories(categories);
    setSortByPrice(price);
  };

  // ✅ Search submit
  const handleSearch = (e) => {
    e.preventDefault();
    refetch();
  };

  return (
    <div className="bg-gray-50 dark:bg-black min-h-screen">
      {/* Search bar */}
      <form
        onSubmit={handleSearch}
        className="flex items-center border border-zinc-700 dark:bg-zinc-900 rounded-full shadow-lg overflow-hidden max-w-xl mx-auto mb-6 mt-6"
      >
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-grow border-none focus-visible:ring-0 px-6 py-6 dark:bg-zinc-900 text-white placeholder-white"
          placeholder="Search Projects"
        />
        <Button
          type="submit"
          className="dark:bg-zinc-700 bg-blue-700 text-white px-6 py-6 rounded-full hover:bg-blue-700 dark:hover:bg-blue-800"
        >
          Search
        </Button>
      </form>

      {/* Layout with Filter + Project List */}
      <div className="max-w-7xl mx-auto p-4 md:p-6 flex flex-col md:flex-row gap-8">
        {/* Filter Mobile Drawer */}
        <div className="md:hidden mb-10">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full">
                Open Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72">
              <Filter handleFilterChange={handleFilterChange} />
            </SheetContent>
          </Sheet>
        </div>

        {/* Sidebar Filter (desktop only) */}
        <div className="hidden md:block md:w-[20%]">
          <Filter handleFilterChange={handleFilterChange} />
        </div>

        {/* Project List */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => <ProjectSkeleton key={i} />)
            : projects.map((project, i) => (
                <ProjectCard key={i} project={project} />
              ))}
        </div>
      </div>
    </div>
  );
}

export default Projects;

// ✅ Skeleton Loader
const ProjectSkeleton = () => (
  <div className="bg-white dark:bg-zinc-900 shadow-md rounded-lg overflow-hidden">
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
