import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import Lecture from "./Lecture";
import {
  useCreateLectureMutation,
  useGetProjectLectureQuery,
} from "@/redux/features/api/projectApi";

const CreateLecture = () => {
  const [lectureTitle, setLectureTitle] = useState("");
  const params = useParams();
  const projectId = params.projectId;
  const navigate = useNavigate();

  const [createLecture, { data, isLoading, isSuccess, error }] =
    useCreateLectureMutation();

  const {
    data: lectureData,
    isLoading: lectureLoading,
    isError: lectureError,
    refetch,
  } = useGetProjectLectureQuery(projectId);

  const createLectureHandler = async () => {
    await createLecture({ lectureTitle, projectId });
  };

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success(data.message);
      setLectureTitle(""); // reset input after success
    }
    if (error) {
      toast.error(error.data.message);
    }
  }, [isSuccess, error]);

  return (
    <div className="flex-1 px-4 sm:px-6 md:px-10">
      {/* Header */}
      <div className="mb-6 text-center sm:text-left">
        <h1 className="font-bold text-xl sm:text-2xl">
          Let's add lectures
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Add some basic details for your new lecture.
        </p>
      </div>

      {/* Form */}
      <div className="space-y-5">
        <div>
          <Label className="mb-1 block">Title</Label>
          <Input
            type="text"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            placeholder="Your Title Name"
            className="w-full"
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <Button
            variant="outline"
            onClick={() => navigate(`/instructor/project/${projectId}`)}
            className="w-full sm:w-auto"
          >
            Back to course
          </Button>
          <Button
            disabled={isLoading}
            onClick={createLectureHandler}
            className="w-full sm:w-auto"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Create lecture"
            )}
          </Button>
        </div>

        {/* Lecture List */}
        <div className="mt-8">
          {lectureLoading ? (
            <p className="text-center sm:text-left">Loading lectures...</p>
          ) : lectureError ? (
            <p className="text-red-500 text-center sm:text-left">
              Failed to load lectures.
            </p>
          ) : lectureData.lectures.length === 0 ? (
            <p className="text-gray-500 text-center sm:text-left">
              No lectures available
            </p>
          ) : (
            <div className="space-y-3">
              {lectureData.lectures.map((lecture, index) => (
                <Lecture
                  key={lecture._id}
                  lecture={lecture}
                  projectId={projectId}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateLecture;
