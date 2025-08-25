// import React, { useEffect, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import RichTextEditor from "@/components/RichTextEditor";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardDescription,
//   CardContent,
// } from "@/components/ui/card";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Loader2 } from "lucide-react";
// import { toast } from "sonner";
// import {
//   useEditProjectMutation,
//   useGetCreatorProjectQuery,
//   useGetProjectByIdQuery,
//   usePublishProjectMutation,
// } from "@/redux/features/api/projectApi";

// function EditProject() {
//   const navigate = useNavigate();
//   const [input, setInput] = useState({
//     projectTitle: "",
//     subTitle: "",
//     description: "",
//     category: "",
//     projectLevel: "",
//     projectPrice: "",
//     projectThumbnail: "",
//   });

//   const params = useParams();
//   const projectId = params.projectId;

//   const {
//     data: projectByIdData,
//     isLoading: projectByIdLoading,
//     refetch,
//   } = useGetProjectByIdQuery(projectId);

//   const [publishProject, {}] = usePublishProjectMutation();

//   useEffect(() => {
//     if (projectByIdData?.project) {
//       const project = projectByIdData?.project;
//       setInput({
//         projectTitle: project.projectTitle,
//         subTitle: project.subTitle,
//         description: project.description,
//         category: project.category,
//         projectLevel: project.projectLevel,
//         projectPrice: project.projectPrice,
//         projectThumbnail: "",
//       });
//     }
//   }, [projectByIdData]);

//   const [previewThumbnail, setPreviewThumbnail] = useState("");

//   const [editProject, { isLoading, isSuccess, error }] =
//     useEditProjectMutation();
//   const changeEventHandler = (e) => {
//     const { name, value } = e.target;
//     setInput({ ...input, [name]: value });
//   };

//   const selectCategory = (value) => {
//     setInput({ ...input, category: value });
//   };

//   const selectProjectLevel = (value) => {
//     setInput({ ...input, projectLevel: value });
//   };

//   const selectThumbnail = (e) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setInput({ ...input, projectThumbnail: file });
//       const reader = new FileReader();
//       reader.onloadend = () => setPreviewThumbnail(reader.result);
//       reader.readAsDataURL(file);
//     }
//   };

//   //refill data
//   const { data, isLoading: projectLoading } = useGetCreatorProjectQuery();
//   const project = data?.project?.find((p) => p._id === projectId);

//   useEffect(() => {
//     if (project) {
//       setInput({
//         projectTitle: project.projectTitle,
//         subTitle: project.subTitle,
//         description: project.description,
//         category: project.category,
//         projectLevel: project.projectLevel,
//         projectPrice: project.projectPrice,
//         projectThumbnail: "",
//       });
//       setPreviewThumbnail(project.projectThumbnail);
//     }
//   }, [project]);

//   //update code
//   const handleSubmit = async () => {
//     const formData = new FormData();
//     formData.append("projectTitle", input.projectTitle);
//     formData.append("subTitle", input.subTitle);
//     formData.append("description", input.description);
//     formData.append("category", input.category);
//     formData.append("projectLevel", input.projectLevel);
//     formData.append("projectPrice", input.projectPrice);
//     if (input.projectThumbnail) {
//       formData.append("projectThumbnail", input.projectThumbnail);
//     }

//     await editProject({ projectId, formData });
//   };

//   const publishStatusHandler = async (action) => {
//     try {
//       const response = await publishProject({ projectId, query: action });
//       if (response.data) {
//         refetch();
//         toast.success(response.data.message);
//       }
//     } catch (error) {
//       toast.error("Failed to publish or unpublish Project");
//     }
//   };

//   useEffect(() => {
//     if (isSuccess) {
//       toast.success("Project updated successfully");
//       navigate("/instructor/project");
//     }
//     if (error) {
//       toast.error(error?.data?.message || "Failed to update project");
//     }
//   }, [isSuccess, error]);

//   if (projectLoading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <Loader2 className="animate-spin w-6 h-6" />
//       </div>
//     );
//   }

//   return (
//     <div className="flex-1">
//       <div className="flex items-center justify-between mb-5">
//         <h1 className="font-bold text-xl">
//           Add detail information regarding Project
//         </h1>
//         <Link to="lecture">
//           <Button className="hover:text-blue-600" variant="link">
//             Go to lectures page
//           </Button>
//         </Link>
//       </div>

//       <Card>
//         <CardHeader className="flex flex-row justify-between">
//           <div>
//             <CardTitle>Basic Project Information</CardTitle>
//             <CardDescription>
//               Make changes to your Projects here. Click save when you're done.
//             </CardDescription>
//           </div>
//           <div className="space-x-2">
//             <Button
//               disabled={projectByIdData?.project.lectures.length === 0}
//               variant="outline"
//               onClick={() =>
//                 publishStatusHandler(
//                   projectByIdData?.project.isPublished ? "false" : "true"
//                 )
//               }
//             >
//               {projectByIdData?.project.isPublished ? "Unpublished" : "Publish"}
//             </Button>
//             <Button>Remove Project</Button>
//           </div>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <div>
//             <Label>Title</Label>
//             <Input
//               name="projectTitle"
//               value={input.projectTitle}
//               onChange={changeEventHandler}
//             />
//           </div>
//           <div>
//             <Label>Subtitle</Label>
//             <Input
//               name="subTitle"
//               value={input.subTitle}
//               onChange={changeEventHandler}
//             />
//           </div>
//           <div>
//             <Label>Description</Label>
//             <RichTextEditor input={input} setInput={setInput} />
//           </div>
//           <div className="flex gap-4">
//             <div>
//               <Label>Category</Label>
//               <Select value={input.category} onValueChange={selectCategory}>
//                 <SelectTrigger className="w-[180px]">
//                   <SelectValue placeholder="Select Category" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectGroup>
//                     <SelectLabel>Category</SelectLabel>
//                     <SelectItem value="Next JS">Next JS</SelectItem>
//                     <SelectItem value="MERN Stack Development">
//                       MERN Stack Development
//                     </SelectItem>
//                     <SelectItem value="Fullstack Development">
//                       Fullstack Development
//                     </SelectItem>
//                     {/* add more */}
//                   </SelectGroup>
//                 </SelectContent>
//               </Select>
//             </div>
//             <div>
//               <Label>Level</Label>
//               <Select
//                 value={input.projectLevel}
//                 onValueChange={selectProjectLevel}
//               >
//                 <SelectTrigger className="w-[180px]">
//                   <SelectValue placeholder="Select Level" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="Beginner">Beginner</SelectItem>
//                   <SelectItem value="Medium">Medium</SelectItem>
//                   <SelectItem value="Advance">Advance</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//             <div>
//               <Label>Price (INR)</Label>
//               <Input
//                 type="number"
//                 name="projectPrice"
//                 value={input.projectPrice}
//                 onChange={changeEventHandler}
//               />
//             </div>
//           </div>
//           <div>
//             <Label>Thumbnail</Label>
//             <Input type="file" onChange={selectThumbnail} />
//             {previewThumbnail && (
//               <img
//                 src={previewThumbnail}
//                 alt="Project Thumbnail"
//                 className="h-40 mt-2 rounded-md"
//               />
//             )}
//           </div>
//           <div className="flex gap-4">
//             <Button
//               variant="outline"
//               onClick={() => navigate("/instructor/project")}
//             >
//               Cancel
//             </Button>
//             <Button onClick={handleSubmit} disabled={isLoading}>
//               {isLoading ? (
//                 <>
//                   <Loader2 className="animate-spin h-4 w-4 mr-2" /> Updating...
//                 </>
//               ) : (
//                 "Update Project"
//               )}
//             </Button>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// export default EditProject;

import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import RichTextEditor from "@/components/RichTextEditor";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  useEditProjectMutation,
  useGetCreatorProjectQuery,
  useGetProjectByIdQuery,
  usePublishProjectMutation,
} from "@/redux/features/api/projectApi";

function EditProject() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    projectTitle: "",
    subTitle: "",
    description: "",
    category: "",
    projectLevel: "",
    projectPrice: "",
    projectThumbnail: "",
  });

  const params = useParams();
  const projectId = params.projectId;

  const {
    data: projectByIdData,
    isLoading: projectByIdLoading,
    refetch,
  } = useGetProjectByIdQuery(projectId);

  const [publishProject] = usePublishProjectMutation();
  const [previewThumbnail, setPreviewThumbnail] = useState("");

  const [editProject, { isLoading, isSuccess, error }] =
    useEditProjectMutation();

  useEffect(() => {
    if (projectByIdData?.project) {
      const project = projectByIdData?.project;
      setInput({
        projectTitle: project.projectTitle,
        subTitle: project.subTitle,
        description: project.description,
        category: project.category,
        projectLevel: project.projectLevel,
        projectPrice: project.projectPrice,
        projectThumbnail: "",
      });
      setPreviewThumbnail(project.projectThumbnail);
    }
  }, [projectByIdData]);

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const selectCategory = (value) => setInput({ ...input, category: value });
  const selectProjectLevel = (value) =>
    setInput({ ...input, projectLevel: value });

  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, projectThumbnail: file });
      const reader = new FileReader();
      reader.onloadend = () => setPreviewThumbnail(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const { data, isLoading: projectLoading } = useGetCreatorProjectQuery();
  const project = data?.project?.find((p) => p._id === projectId);

  useEffect(() => {
    if (project) {
      setInput({
        projectTitle: project.projectTitle,
        subTitle: project.subTitle,
        description: project.description,
        category: project.category,
        projectLevel: project.projectLevel,
        projectPrice: project.projectPrice,
        projectThumbnail: "",
      });
      setPreviewThumbnail(project.projectThumbnail);
    }
  }, [project]);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("projectTitle", input.projectTitle);
    formData.append("subTitle", input.subTitle);
    formData.append("description", input.description);
    formData.append("category", input.category);
    formData.append("projectLevel", input.projectLevel);
    formData.append("projectPrice", input.projectPrice);
    if (input.projectThumbnail) {
      formData.append("projectThumbnail", input.projectThumbnail);
    }
    await editProject({ projectId, formData });
  };

  const publishStatusHandler = async (action) => {
    try {
      const response = await publishProject({ projectId, query: action });
      if (response.data) {
        refetch();
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to publish or unpublish Project");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Project updated successfully");
      navigate("/instructor/project");
    }
    if (error) {
      toast.error(error?.data?.message || "Failed to update project");
    }
  }, [isSuccess, error]);

  if (projectLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin w-6 h-6" />
      </div>
    );
  }

  return (
    <div className="flex-1 px-2 sm:px-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-5 gap-3">
        <h1 className="font-bold text-lg sm:text-xl">
          Add detail information regarding Project
        </h1>
        <Link to="lecture" className="w-full sm:w-auto">
          <Button
            className="w-full sm:w-auto hover:text-blue-600"
            variant="link"
          >
            Go to lectures page
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader className="flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <CardTitle>Basic Project Information</CardTitle>
            <CardDescription>
              Make changes to your Projects here. Click save when you're done.
            </CardDescription>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              disabled={projectByIdData?.project.lectures.length === 0}
              variant="outline"
              onClick={() =>
                publishStatusHandler(
                  projectByIdData?.project.isPublished ? "false" : "true"
                )
              }
            >
              {projectByIdData?.project.isPublished
                ? "Unpublish"
                : "Publish"}
            </Button>
            <Button variant="destructive">Remove Project</Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <Label>Title</Label>
            <Input
              name="projectTitle"
              value={input.projectTitle}
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <Label>Subtitle</Label>
            <Input
              name="subTitle"
              value={input.subTitle}
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <Label>Description</Label>
            <RichTextEditor input={input} setInput={setInput} />
          </div>

          {/* Responsive Grid for Category, Level, Price */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <Label>Category</Label>
              <Select value={input.category} onValueChange={selectCategory}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Category</SelectLabel>
                    <SelectItem value="Next JS">Next JS</SelectItem>
                    <SelectItem value="MERN Stack Development">
                      MERN Stack Development
                    </SelectItem>
                    <SelectItem value="Fullstack Development">
                      Fullstack Development
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Level</Label>
              <Select
                value={input.projectLevel}
                onValueChange={selectProjectLevel}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Advance">Advance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Price (INR)</Label>
              <Input
                type="number"
                name="projectPrice"
                value={input.projectPrice}
                onChange={changeEventHandler}
              />
            </div>
          </div>

          {/* Thumbnail Upload */}
          <div>
            <Label>Thumbnail</Label>
            <Input type="file" onChange={selectThumbnail} />
            {previewThumbnail && (
              <img
                src={previewThumbnail}
                alt="Project Thumbnail"
                className="h-40 mt-2 rounded-md object-cover w-full sm:w-64"
              />
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              className="w-full sm:w-auto"
              onClick={() => navigate("/instructor/project")}
            >
              Cancel
            </Button>
            <Button
              className="w-full sm:w-auto"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin h-4 w-4 mr-2" /> Updating...
                </>
              ) : (
                "Update Project"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default EditProject;
