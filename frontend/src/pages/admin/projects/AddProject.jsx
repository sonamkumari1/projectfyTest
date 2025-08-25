// import React, { useEffect, useState } from "react";
// import RichTextEditor from "@/components/RichTextEditor";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
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
// import { useNavigate } from "react-router-dom";
// import { useCreateProjectMutation } from "@/redux/features/api/projectApi";

// function AddProject() {
//   const [input, setInput] = useState({
//     projectTitle: "",
//     subTitle: "",
//     description: "",
//     category: "",
//     projectLevel: "",
//     projectPrice: "",
//     projectThumbnail: "",
//   });

//   const [previewThumbnail, setPreviewThumbnail] = useState("");
//   const navigate = useNavigate();

//   const [createProject, { data, isLoading, isSuccess, error }] =
//     useCreateProjectMutation();

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

//   // get file
//   const selectThumbnail = (e) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setInput({ ...input, projectThumbnail: file });
//       const fileReader = new FileReader();
//       fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
//       fileReader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async () => {
//     const formData = new FormData();
//     formData.append("projectTitle", input.projectTitle);
//     formData.append("subTitle", input.subTitle);
//     formData.append("description", input.description);
//     formData.append("category", input.category);
//     formData.append("projectLevel", input.projectLevel);
//     formData.append("projectPrice", input.projectPrice);
//     formData.append("projectThumbnail", input.projectThumbnail);

//     await createProject(formData);
//   };

//   useEffect(() => {
//     if (isSuccess) {
//       toast.success(data?.message || "Project created successfully.");
//       navigate("/instructor/project");
//     }
//     if (error) {
//       toast.error(error?.data?.message || "Failed to create project");
//     }
//   }, [isSuccess, error]);

//   return (
//     <Card>
//       <CardHeader className="flex flex-row justify-between mt-5 mb-3">
//         <div>
//           <CardTitle>Basic Project Information</CardTitle>
//           <CardDescription>
//             Fill out the details to create your new project.
//           </CardDescription>
//         </div>
//         <div className="space-x-2">
//           <Button variant="outline">Publish</Button>
//           <Button>Remove Course</Button>
//         </div>
//       </CardHeader>
//       <CardContent>
//         <div className="space-y-4 mt-5">
//           <div>
//             <Label className="mb-3">Title</Label>
//             <Input
//               type="text"
//               name="projectTitle"
//               value={input.projectTitle}
//               onChange={changeEventHandler}
//               placeholder="Ex. Portfolio Website"
//             />
//           </div>
//           <div>
//             <Label className="mb-3">Subtitle</Label>
//             <Input
//               type="text"
//               name="subTitle"
//               value={input.subTitle}
//               onChange={changeEventHandler}
//               placeholder="Ex. Build your personal portfolio website with React"
//             />
//           </div>
//           <div>
//             <Label className="mb-3">Description</Label>
//             <RichTextEditor input={input} setInput={setInput} />
//           </div>
//           <div className="flex items-center gap-5">
//             <div>
//               <Label className="mb-3">Category</Label>
//               <Select
//                 defaultValue={input.category}
//                 onValueChange={selectCategory}
//               >
//                 <SelectTrigger className="w-[180px]">
//                   <SelectValue
//                     placeholder="Select a category"
//                     className="mb-3"
//                   />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectGroup>
//                     <SelectLabel>Category</SelectLabel>
//                     <SelectItem value="Web Development">
//                       Web Development
//                     </SelectItem>
//                     <SelectItem value="Frontend Development">
//                       Frontend Development
//                     </SelectItem>
//                     <SelectItem value="Fullstack Development">
//                       Fullstack Development
//                     </SelectItem>
//                     <SelectItem value="MERN Stack Development">
//                       MERN Stack Development
//                     </SelectItem>
//                     <SelectItem value="Data Science Projects">
//                       Data Science Projects
//                     </SelectItem>
//                     <SelectItem value="Mobile Development">
//                       Mobile Development
//                     </SelectItem>
//                     <SelectItem value="Java Projects">Java Projects</SelectItem>
//                     <SelectItem value="Python Projects">
//                       Python Projects
//                     </SelectItem>
//                   </SelectGroup>
//                 </SelectContent>
//               </Select>
//             </div>
//             <div>
//               <Label className="mb-3">Project Level</Label>
//               <Select
//                 defaultValue={input.projectLevel}
//                 onValueChange={selectProjectLevel}
//               >
//                 <SelectTrigger className="w-[180px]">
//                   <SelectValue placeholder="Select a project level" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectGroup>
//                     <SelectLabel>Project Level</SelectLabel>
//                     <SelectItem value="Beginner">Beginner</SelectItem>
//                     <SelectItem value="Medium">Medium</SelectItem>
//                     <SelectItem value="Advance">Advance</SelectItem>
//                   </SelectGroup>
//                 </SelectContent>
//               </Select>
//             </div>
//             <div>
//               <Label className="mb-3">Price in (INR)</Label>
//               <Input
//                 type="number"
//                 name="projectPrice"
//                 value={input.projectPrice}
//                 onChange={changeEventHandler}
//                 placeholder="199"
//                 className="w-fit"
//               />
//             </div>
//           </div>
//           <div>
//             <Label className="mb-3">Project Thumbnail</Label>
//             <Input
//               type="file"
//               onChange={selectThumbnail}
//               accept="image/*"
//               className="w-fit"
//             />
//             {previewThumbnail && (
//               <img
//                 src={previewThumbnail}
//                 className="h-64 my-2 rounded-md"
//                 alt="Project Thumbnail"
//               />
//             )}
//           </div>
//           <div>
//             <Button
//               onClick={() => navigate("/instructor/projects")}
//               variant="outline"
//             >
//               Cancel
//             </Button>
//             <Button
//               disabled={isLoading}
//               onClick={handleSubmit}
//               className="ml-5 mt-5"
//             >
//               {isLoading ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   Please wait
//                 </>
//               ) : (
//                 "Save"
//               )}
//             </Button>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

// export default AddProject;
import React, { useEffect, useState } from "react";
import RichTextEditor from "@/components/RichTextEditor";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { useNavigate } from "react-router-dom";
import { useCreateProjectMutation } from "@/redux/features/api/projectApi";

function AddProject() {
  const [input, setInput] = useState({
    projectTitle: "",
    subTitle: "",
    description: "",
    category: "",
    projectLevel: "",
    projectPrice: "",
    projectThumbnail: "",
  });

  const [previewThumbnail, setPreviewThumbnail] = useState("");
  const navigate = useNavigate();

  const [createProject, { data, isLoading, isSuccess, error }] =
    useCreateProjectMutation();

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const selectCategory = (value) => {
    setInput({ ...input, category: value });
  };

  const selectProjectLevel = (value) => {
    setInput({ ...input, projectLevel: value });
  };

  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, projectThumbnail: file });
      const fileReader = new FileReader();
      fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("projectTitle", input.projectTitle);
    formData.append("subTitle", input.subTitle);
    formData.append("description", input.description);
    formData.append("category", input.category);
    formData.append("projectLevel", input.projectLevel);
    formData.append("projectPrice", input.projectPrice);
    formData.append("projectThumbnail", input.projectThumbnail);

    await createProject(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Project created successfully.");
      navigate("/instructor/project");
    }
    if (error) {
      toast.error(error?.data?.message || "Failed to create project");
    }
  }, [isSuccess, error]);

  return (
    <Card>
      <CardHeader className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mt-5 mb-3">
        <div>
          <CardTitle>Basic Project Information</CardTitle>
          <CardDescription>
            Fill out the details to create your new project.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6 mt-5">
          <div>
            <Label className="mb-2 block">Title</Label>
            <Input
              type="text"
              name="projectTitle"
              value={input.projectTitle}
              onChange={changeEventHandler}
              placeholder="Ex. Portfolio Website"
              className="w-full"
            />
          </div>
          <div>
            <Label className="mb-2 block">Subtitle</Label>
            <Input
              type="text"
              name="subTitle"
              value={input.subTitle}
              onChange={changeEventHandler}
              placeholder="Ex. Build your personal portfolio website with React"
              className="w-full"
            />
          </div>
          <div>
            <Label className="mb-2 block">Description</Label>
            <RichTextEditor input={input} setInput={setInput} />
          </div>

          {/* Responsive Row */}
          <div className="flex flex-col md:flex-row md:items-center gap-5">
            <div className="w-full md:w-1/3">
              <Label className="mb-2 block">Category</Label>
              <Select
                defaultValue={input.category}
                onValueChange={selectCategory}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Category</SelectLabel>
                    <SelectItem value="Web Development">
                      Web Development
                    </SelectItem>
                    <SelectItem value="Frontend Development">
                      Frontend Development
                    </SelectItem>
                    <SelectItem value="Fullstack Development">
                      Fullstack Development
                    </SelectItem>
                    <SelectItem value="MERN Stack Development">
                      MERN Stack Development
                    </SelectItem>
                    <SelectItem value="Data Science Projects">
                      Data Science Projects
                    </SelectItem>
                    <SelectItem value="Mobile Development">
                      Mobile Development
                    </SelectItem>
                    <SelectItem value="Java Projects">Java Projects</SelectItem>
                    <SelectItem value="Python Projects">
                      Python Projects
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full md:w-1/3">
              <Label className="mb-2 block">Project Level</Label>
              <Select
                defaultValue={input.projectLevel}
                onValueChange={selectProjectLevel}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a project level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Project Level</SelectLabel>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Advance">Advance</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full md:w-1/3">
              <Label className="mb-2 block">Price in (INR)</Label>
              <Input
                type="number"
                name="projectPrice"
                value={input.projectPrice}
                onChange={changeEventHandler}
                placeholder="199"
                className="w-full"
              />
            </div>
          </div>

          {/* Thumbnail */}
          <div>
            <Label className="mb-2 block">Project Thumbnail</Label>
            <Input
              type="file"
              onChange={selectThumbnail}
              accept="image/*"
              className="w-full md:w-fit"
            />
            {previewThumbnail && (
              <img
                src={previewThumbnail}
                className="h-48 md:h-64 my-3 rounded-md w-full object-cover"
                alt="Project Thumbnail"
              />
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={() => navigate("/instructor/projects")}
              variant="outline"
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              disabled={isLoading}
              onClick={handleSubmit}
              className="w-full sm:w-auto"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default AddProject;
