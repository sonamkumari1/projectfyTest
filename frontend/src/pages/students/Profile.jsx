// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
// import { Button } from '@/components/ui/button'
// import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
// import { useLoadUserQuery, useUpdateUserMutation } from '@/redux/features/api/authApi'
// import { Loader2 } from 'lucide-react'
// import React, { useEffect, useState } from 'react'
// import ProjectCard from './ProjectCard'

// function Profile() {
//   const [name, setName]=useState("")
//   const [profilePhoto, setProfilePhoto]=useState("")

//   const {data, isLoading, refetch}=useLoadUserQuery()

//   const [
//     updateUser,
//     {
//       data: updateUserData,
//       isLoading: updateUserIsLoading,
//       isError,
//       error,
//       isSuccess,
//     }
//   ] = useUpdateUserMutation();

//   const onChangeHandler=(e)=>{
//    const file=e.target.files?.[0];
//    if(file){
//     setProfilePhoto(file)
//    }
//   }

//   const updateUserHandler=async()=>{
// const formData=new FormData();
// formData.append("name", name)
// formData.append("profilePhoto", profilePhoto)
// await updateUser(formData)
//   };

//   useEffect(()=>{
//     if(isSuccess){
//       refetch()
//       toast.success(data.message || "Profile updated")
//     }

//     if(isError){
//       toast.error(error.message || "Failed to update profile");
//     }
//   }, [error, updateUserData, isSuccess, isError])

//   if(isLoading){
//     return <h1>Profile Loading...</h1>;
//   }

//   const user =data && data.user
//   console.log(user);

//   return (
//      <div className="max-w-4xl mx-auto px-4 my-10">
//       <h1 className="font-bold text-2xl text-center md:text-left">PROFILE</h1>
//       <div className="flex flex-col md:flex-row items-center md:items-start gap-8 my-5">
//         <div className="flex flex-col items-center">
//           <Avatar className="h-24 w-24 md:h-32 md:w-32 mb-4">
//             <AvatarImage
//               src={user?.photoUrl || "https://github.com/shadcn.png"}
//               alt="@shadcn"
//             />
//             <AvatarFallback>CN</AvatarFallback>
//           </Avatar>
//         </div>
//         <div>
//           <div className="mb-2">
//             <h1 className="font-semibold text-gray-900 dark:text-gray-100 ">
//               Name:
//               <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
//                 {user.name}
//               </span>
//             </h1>
//           </div>
//           <div className="mb-2">
//             <h1 className="font-semibold text-gray-900 dark:text-gray-100 ">
//               Email:
//               <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
//                 {user.email}
//               </span>
//             </h1>
//           </div>
//           <div className="mb-2">
//             <h1 className="font-semibold text-gray-900 dark:text-gray-100 ">
//               Role:
//               <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
//                 {user.role.toUpperCase()}
//               </span>
//             </h1>
//           </div>
//           <Dialog>
//             <DialogTrigger asChild>
//               <Button size="sm" className="mt-2">
//                 Edit Profile
//               </Button>
//             </DialogTrigger>
//             <DialogContent>
//               <DialogHeader>
//                 <DialogTitle>Edit Profile</DialogTitle>
//                 <DialogDescription>
//                   Make changes to your profile here. Click save when you're
//                   done.
//                 </DialogDescription>
//               </DialogHeader>
//               <div className="grid gap-4 py-4">
//                 <div className="grid grid-cols-4 items-center gap-4">
//                   <Label>Name</Label>
//                   <Input
//                     type="text"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     placeholder="Name"
//                     className="col-span-3"
//                   />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                   <Label>Profile Photo</Label>
//                   <Input
//                     onChange={onChangeHandler}
//                     type="file"
//                     accept="image/*"
//                     className="col-span-3"
//                   />
//                 </div>
//               </div>
//               <DialogFooter>
//                 <Button
//                   disabled={updateUserIsLoading}
//                   onClick={updateUserHandler}
//                 >
//                   {updateUserIsLoading ? (
//                     <>
//                       <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
//                       wait
//                     </>
//                   ) : (
//                     "Save Changes"
//                   )}
//                 </Button>
//               </DialogFooter>
//             </DialogContent>
//           </Dialog>
//         </div>
//       </div>
//       <div>
//         <h1 className="font-medium text-lg">Courses you're enrolled in</h1>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5">
//           {user.enrolledProjects.length === 0 ? (
//             <h1>You haven't enrolled yet</h1>
//           ) : (
//             user.enrolledProjects.map((project) => (
//               <ProjectCard project={project} key={project._id} />
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Profile

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLoadUserQuery, useUpdateUserMutation } from "@/redux/features/api/authApi";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";

function Profile() {
  const [name, setName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");

  const { data, isLoading, refetch } = useLoadUserQuery();

  const [
    updateUser,
    { data: updateUserData, isLoading: updateUserIsLoading, isError, error, isSuccess },
  ] = useUpdateUserMutation();

  const onChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePhoto(file);
    }
  };

  const updateUserHandler = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("profilePhoto", profilePhoto);
    await updateUser(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success(data?.message || "Profile updated");
    }

    if (isError) {
      toast.error(error?.message || "Failed to update profile");
    }
  }, [error, updateUserData, isSuccess, isError]);

  if (isLoading) {
    return <h1 className="text-center mt-10">Profile Loading...</h1>;
  }

  const user = data && data.user;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 my-10">
      <h1 className="font-bold text-2xl text-center">PROFILE</h1>

      {/* Profile Info */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 my-6">
        <div className="flex flex-col items-center">
          <Avatar className="h-24 w-24 sm:h-28 sm:w-28 mb-4">
            <AvatarImage
              src={user?.photoUrl || "https://github.com/shadcn.png"}
              alt="@user"
            />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>

        <div className="w-full text-center sm:text-left">
          <div className="mb-2">
            <span className="font-semibold">Name: </span>
            <span className="text-gray-700 dark:text-gray-300">{user?.name}</span>
          </div>
          <div className="mb-2">
            <span className="font-semibold">Email: </span>
            <span className="text-gray-700 dark:text-gray-300">{user?.email}</span>
          </div>
          <div className="mb-2">
            <span className="font-semibold">Role: </span>
            <span className="text-gray-700 dark:text-gray-300">
              {user?.role?.toUpperCase()}
            </span>
          </div>

          {/* Edit Profile Button */}
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="mt-3">
                Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  Update your name and profile picture. Click save when done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Name</Label>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Profile Photo</Label>
                  <Input
                    onChange={onChangeHandler}
                    type="file"
                    accept="image/*"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button disabled={updateUserIsLoading} onClick={updateUserHandler}>
                  {updateUserIsLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Courses Section */}
      <div>
        <h2 className="font-medium text-lg mb-3 text-center sm:text-left">
          Courses you're enrolled in
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-5">
          {user?.enrolledProjects?.length === 0 ? (
            <h1 className="text-center text-gray-500">You haven't enrolled yet</h1>
          ) : (
            user.enrolledProjects.map((project) => (
              <ProjectCard project={project} key={project._id} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
