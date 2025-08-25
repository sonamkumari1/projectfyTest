
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useDeleteProjectMutation, useGetCreatorProjectQuery } from "@/redux/features/api/projectApi";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function ProjectTable() {
  const { data, isLoading, isError } = useGetCreatorProjectQuery();
  const [deleteProject, { isLoading: deleting }] = useDeleteProjectMutation();
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      await deleteProject(id).unwrap();
      toast.success("Project deleted successfully");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to delete project");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-6 w-6 animate-spin" />
        <span className="ml-2">Loading projects...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-500 text-center">Failed to load projects</div>
    );
  }

  return (
    <div className="w-full">
      {/* ✅ Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <Table className="min-w-[800px] dark:bg-gray-900 dark:text-gray-100">
          <TableCaption className="dark:text-gray-400">
            A list of your created projects.
          </TableCaption>
          <TableHeader>
            <TableRow className="dark:border-gray-700">
              <TableHead className="w-[100px]">Thumbnail</TableHead>
              <TableHead className="w-[200px]">Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.project?.length > 0 ? (
              data.project.map((project) => (
                <TableRow
                  key={project._id}
                  className="dark:border-gray-700"
                >
                  <TableCell>
                    {project.projectThumbnail ? (
                      <img
                        src={project.projectThumbnail}
                        alt={project.projectTitle}
                        className="h-12 w-20 object-cover rounded-md"
                      />
                    ) : (
                      <span className="text-gray-400 text-sm">No Image</span>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">
                    {project.projectTitle}
                  </TableCell>
                  <TableCell>{project.category}</TableCell>
                  <TableCell>{project.projectLevel}</TableCell>
                  <TableCell>₹{project.projectPrice}</TableCell>
                  <TableCell>
                    {project.isPublished ? (
                      <span className="text-green-600">Published</span>
                    ) : (
                      <span className="text-yellow-500">Draft</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      onClick={() =>
                        navigate(`/instructor/project/${project._id}`)
                      }
                      size="sm"
                      variant="outline"
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      disabled={deleting}
                      onClick={() => handleDelete(project._id)}
                    >
                      {deleting ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        "Delete"
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center">
                  No projects found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* ✅ Mobile Card View */}
      <div className="block md:hidden space-y-4">
        {data?.project?.length > 0 ? (
          data.project.map((project) => (
            <div
              key={project._id}
              className="border rounded-lg p-4 shadow-sm bg-white dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100"
            >
              <div className="flex items-center space-x-4">
                {project.projectThumbnail ? (
                  <img
                    src={project.projectThumbnail}
                    alt={project.projectTitle}
                    className="h-16 w-24 object-cover rounded-md"
                  />
                ) : (
                  <span className="text-gray-400 text-sm">No Image</span>
                )}
                <div>
                  <h3 className="font-semibold">{project.projectTitle}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {project.category}
                  </p>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                <p>
                  <span className="font-medium">Level:</span>{" "}
                  {project.projectLevel}
                </p>
                <p>
                  <span className="font-medium">Price:</span> ₹
                  {project.projectPrice}
                </p>
                <p>
                  <span className="font-medium">Status:</span>{" "}
                  {project.isPublished ? (
                    <span className="text-green-600">Published</span>
                  ) : (
                    <span className="text-yellow-500">Draft</span>
                  )}
                </p>
              </div>

              <div className="mt-4 flex justify-end space-x-2">
                <Button
                  onClick={() =>
                    navigate(`/instructor/project/${project._id}`)
                  }
                  size="sm"
                  variant="outline"
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  disabled={deleting}
                  onClick={() => handleDelete(project._id)}
                >
                  {deleting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Delete"
                  )}
                </Button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No projects found.
          </p>
        )}
      </div>
    </div>
  );
}

export default ProjectTable;
