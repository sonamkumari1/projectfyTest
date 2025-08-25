import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { Link } from "react-router-dom";

function ProjectCard({ project }) {
  return (
    <Link to={`/project-detail/${project._id}`}>
      <div className="overflow-hidden rounded-lg dark:bg-zinc-900 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
        <img
          src={project.projectThumbnail}
          alt="project"
          className="w-full h-36 object-cover rounded-t-lg"
        />
        <div className="px-5 space-y-3 py-4">
          <h1 className="hover:underline font-bold text-lg truncate">
            {project.projectTitle}
          </h1>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={
                    project.creator?.photoUrl || "https://github.com/shadcn.png"
                  }
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <h1 className="font-medium text-sm">{project.creator?.name}</h1>
            </div>
            <Badge
              className={
                "bg-blue-600 text-white px-2 py-1 text-xs rounded-full"
              }
            >
              {project.projectLevel}
            </Badge>
          </div>
          <div className="text-lg font-bold">
            <span>₹{project.projectPrice}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProjectCard;
