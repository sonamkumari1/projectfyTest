import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useCompleteProjectMutation, useGetProjectProgressQuery, useInCompleteProjectMutation, useUpdateLectureProgressMutation } from "@/redux/features/api/projectProgressApi";

import { CheckCircle, CheckCircle2, CirclePlay } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const ProjectProgress = () => {
  const params = useParams();
  const projectId = params.projectId;
  const { data, isLoading, isError, refetch } =
    useGetProjectProgressQuery(projectId);

  const [updateLectureProgress] = useUpdateLectureProgressMutation();
  const [
    completeProject,
    { data: markCompleteData, isSuccess: completedSuccess },
  ] = useCompleteProjectMutation();
  const [
    inCompleteProject,
    { data: markInCompleteData, isSuccess: inCompletedSuccess },
  ] = useInCompleteProjectMutation();

  useEffect(() => {
    console.log(markCompleteData);

    if (completedSuccess) {
      refetch();
      toast.success(markCompleteData.message);
    }
    if (inCompletedSuccess) {
      refetch();
      toast.success(markInCompleteData.message);
    }
  }, [completedSuccess, inCompletedSuccess]);

  const [currentLecture, setCurrentLecture] = useState(null);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load Project details</p>;

  console.log(data);

  const { projectDetails, progress, completed } = data.data;
  const { projectTitle } = projectDetails;

  // initialze the first lecture is not exist
  const initialLecture =
    currentLecture || (projectDetails.lectures && projectDetails.lectures[0]);

  const isLectureCompleted = (lectureId) => {
    return progress.some((prog) => prog.lectureId === lectureId && prog.viewed);
  };

  const handleLectureProgress = async (lectureId) => {
    await updateLectureProgress({ projectId, lectureId });
    refetch();
  };
  // Handle select a specific lecture to watch
  const handleSelectLecture = (lecture) => {
    setCurrentLecture(lecture);
    handleLectureProgress(lecture._id);
  };


  const handleCompleteProject = async () => {
    await completeProject(projectId);
  };
  const handleInCompleteProject = async () => {
    await inCompleteProject(projectId);
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Display project name  */}
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">{projectTitle}</h1>
        <Button
          onClick={completed ? handleInCompleteProject : handleCompleteProject}
          variant={completed ? "outline" : "default"}
        >
          {completed ? (
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" /> <span>Completed</span>{" "}
            </div>
          ) : (
            "Mark as completed"
          )}
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Video section  */}
        <div className="flex-1 md:w-3/5 h-fit rounded-lg shadow-lg p-4">
          <div>
            <video
              src={currentLecture?.videoUrl || initialLecture.videoUrl}
              controls
              className="w-full h-64 md:rounded-lg"
              onPlay={() =>
                handleLectureProgress(currentLecture?._id || initialLecture._id)
              }
            />
          </div>
          {/* Display current watching lecture title */}
          <div className="mt-2 ">
            <h3 className="font-medium text-lg">
              {`Lecture ${
                projectDetails.lectures.findIndex(
                  (lec) =>
                    lec._id === (currentLecture?._id || initialLecture._id)
                ) + 1
              } : ${
                currentLecture?.lectureTitle || initialLecture.lectureTitle
              }`}
            </h3>
          </div>
        </div>
        {/* Lecture Sidebar  */}
        <div className="flex flex-col w-full md:w-2/5 border-t md:border-t-0 md:border-l border-gray-200 md:pl-4 pt-4 md:pt-0">
          <h2 className="font-semibold text-xl mb-4">project Lecture</h2>
          <div className="flex-1 overflow-y-auto">
            {projectDetails?.lectures.map((lecture) => (
              <Card
                key={lecture._id}
                className={`mb-3 hover:cursor-pointer transition transform ${
                  lecture._id === currentLecture?._id
                    ? "bg-gray-200 dark:dark:bg-gray-800"
                    : ""
                } `}
                onClick={() => handleSelectLecture(lecture)}
              >
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center">
                    {isLectureCompleted(lecture._id) ? (
                      <CheckCircle2 size={24} className="text-green-500 mr-2" />
                    ) : (
                      <CirclePlay size={24} className="text-gray-500 mr-2" />
                    )}
                    <div>
                      <CardTitle className="text-lg font-medium">
                        {lecture.lectureTitle}
                      </CardTitle>
                    </div>
                  </div>
                  {isLectureCompleted(lecture._id) && (
                    <Badge
                      variant={"outline"}
                      className="bg-green-200 text-green-600"
                    >
                      Completed
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectProgress;