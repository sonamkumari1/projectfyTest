import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { Link, useParams } from "react-router-dom";
import LectureTab from "./LectureTab";

const EditLecture = () => {
  const params = useParams();
  const projectId = params.projectId;

  return (
    <div className="p-4 sm:p-6 md:p-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
        {/* Left Side (Back + Title) */}
        <div className="flex items-center gap-2">
          <Link to={`/instructor/project/${projectId}/lecture`}>
            <Button size="icon" variant="outline" className="rounded-full">
              <ArrowLeft size={16} />
            </Button>
          </Link>
          <h1 className="font-bold text-lg sm:text-xl md:text-2xl">
            Update Your Lecture
          </h1>
        </div>
      </div>

      {/* Lecture Tabs Section */}
      <div className="w-full">
        <LectureTab />
      </div>
    </div>
  );
};

export default EditLecture;
