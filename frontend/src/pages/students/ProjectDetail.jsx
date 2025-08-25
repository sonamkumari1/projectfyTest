// import BuyPurchasedButton from "@/components/BuyPurchasedButton";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";
// import { useGetProjectDetailWithStatusQuery } from "@/redux/features/api/purchaseApi";


// import { BadgeInfo, Lock, PlayCircle } from "lucide-react";
// import React from "react";
// import ReactPlayer from "react-player";
// import { useNavigate, useParams } from "react-router-dom";

// const ProjectDetail = () => {
//   const params = useParams();
//   const projectId = params.projectId;
//   const navigate = useNavigate();
// const { data, isLoading, isError } =
//     useGetProjectDetailWithStatusQuery(projectId);

//   if (isLoading) return <h1>Loading...</h1>;
//   if (isError) return <h>Failed to load project details</h>;

//   const { project, purchased } = data;
//   console.log(purchased);

//   const handleContinueProject = () => {
//     if (purchased) {
//       navigate(`/project-progress/${projectId}`);
//     }
//   };

//   return (
//     <div className="space-y-5">
//       <div className="bg-[#2D2F31] text-white">
//         <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2">
//           <h1 className="font-bold text-2xl md:text-3xl">
//             {project?.projectTitle}
//           </h1>
//           <p className="text-base md:text-lg">project Sub-title</p>
//           <p>
//             Created By{" "}
//             <span className="text-[#C0C4FC] underline italic">
//               {project?.creator?.name}
//             </span>
//           </p>
//           <div className="flex items-center gap-2 text-sm">
//             <BadgeInfo size={16} />
//             <p>Last updated {project?.createdAt.split("T")[0]}</p>
//           </div>
//           <p>Students enrolled: {project?.enrolledStudents.length}</p>
//         </div>
//       </div>
//       <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
//         <div className="w-full lg:w-1/2 space-y-5">
//           <h1 className="font-bold text-xl md:text-2xl">Description</h1>
//           <p
//             className="text-sm"
//             dangerouslySetInnerHTML={{ __html: project.description }}
//           />
//           <Card>
//             <CardHeader>
//               <CardTitle>project Content</CardTitle>
//               <CardDescription>4 lectures</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-3">
//               {project.lectures.map((lecture, idx) => (
//                 <div key={idx} className="flex items-center gap-3 text-sm">
//                   <span>
//                     {true ? <PlayCircle size={14} /> : <Lock size={14} />}
//                   </span>
//                   <p>{lecture.lectureTitle}</p>
//                 </div>
//               ))}
//             </CardContent>
//           </Card>
//         </div>
//         <div className="w-full lg:w-1/3">
//           <Card>
//             <CardContent className="p-4 flex flex-col">
//               <div className="w-full aspect-video mb-4">
//                 <ReactPlayer
//                   width="100%"
//                   height={"100%"}
//                   url={project.lectures[0].videoUrl}
//                   controls={true}
//                 />
//               </div>
//               <h1>Lecture title</h1>
//               <Separator className="my-2" />
//               <h1 className="text-lg md:text-xl font-semibold">project Price</h1>
//             </CardContent>
//             <CardFooter className="flex justify-center p-4">
//               {purchased ? (
//                 <Button onClick={handleContinueProject} className="w-full">
//                   Continue Project
//                 </Button>
//               ) : (
//                 <BuyPurchasedButton projectId={projectId} />
//               )}
//             </CardFooter>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProjectDetail;
import BuyPurchasedButton from "@/components/BuyPurchasedButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetProjectDetailWithStatusQuery } from "@/redux/features/api/purchaseApi";
import { BadgeInfo, Lock, PlayCircle } from "lucide-react";
import React from "react";
import ReactPlayer from "react-player";
import { useNavigate, useParams } from "react-router-dom";

const ProjectDetail = () => {
  const params = useParams();
  const projectId = params.projectId;
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetProjectDetailWithStatusQuery(projectId);

  if (isLoading) return <h1 className="text-black dark:text-white text-center py-10">Loading...</h1>;
  if (isError) return <h1 className="text-black dark:text-white text-center py-10">Failed to load project details</h1>;

  const { project, purchased } = data;

  const handleContinueProject = () => {
    if (purchased) {
      navigate(`/project-progress/${projectId}`);
    }
  };

  return (
    <div className="space-y-8">
      {/* Project Header */}
      <div className="bg-white text-black dark:bg-[#2D2F31] dark:text-white shadow-md rounded-md">
        <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2">
          <h1 className="font-bold text-2xl md:text-3xl">{project?.projectTitle}</h1>
          <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg">project Sub-title</p>
          <p>
            Created By{" "}
            <span className="text-blue-600 dark:text-[#C0C4FC] underline italic">
              {project?.creator?.name}
            </span>
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
            <BadgeInfo size={16} />
            <p>Last updated {project?.createdAt.split("T")[0]}</p>
          </div>
          <p className="text-gray-600 dark:text-gray-300">Students enrolled: {project?.enrolledStudents.length}</p>
        </div>
      </div>

      {/* Project Content & Video */}
      <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
        {/* Description and Lectures */}
        <div className="w-full lg:w-1/2 space-y-6">
          <h1 className="font-bold text-xl md:text-2xl text-black dark:text-white">Description</h1>
          <p
            className="text-gray-800 dark:text-gray-300 text-sm"
            dangerouslySetInnerHTML={{ __html: project.description }}
          />

          <Card className="border border-gray-300 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-black text-xl dark:text-white">Project Content</CardTitle>
              <CardDescription className="text-gray-700 dark:text-gray-400">
                {project.lectures.length} lectures
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {project.lectures.map((lecture, idx) => (
                <div key={idx} className="flex items-center gap-3 text-gray-800 dark:text-gray-300 text-lg">
                  <span>
                    {true ? <PlayCircle size={14} /> : <Lock size={14} />}
                  </span>
                  <p>{lecture.lectureTitle}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Video and Purchase */}
        <div className="w-full lg:w-1/3 ">
          <Card className="border border-gray-300 dark:border-gray-700">
            <CardContent className="px-4 flex flex-col space-y-4">
              <div className="w-full aspect-video rounded-md overflow-hidden">
                <ReactPlayer
                  width="100%"
                  height="100%"
                  url={project.lectures[0].videoUrl}
                  controls
                />
              </div>
              <h2 className="font-semibold text-black text-xl dark:text-white">{project.lectures[0].lectureTitle}</h2>
              <Separator className="mt-2" />
              <h1 className="text-lg md:text-xl font-semibold text-black dark:text-white">
                Project Price
              </h1>
            </CardContent>
            <CardFooter className="flex justify-center">
              {purchased ? (
                <Button onClick={handleContinueProject} className="w-full bg-blue-600 text-white hover:bg-blue-700">
                  Continue Project
                </Button>
              ) : (
                <BuyPurchasedButton projectId={projectId} />
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
