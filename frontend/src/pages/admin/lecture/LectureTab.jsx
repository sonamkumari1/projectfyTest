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
// import { Progress } from "@/components/ui/progress";
// import { Switch } from "@/components/ui/switch";
// import { useEditLectureMutation, useGetLectureByIdQuery, useRemoveLectureMutation } from "@/redux/features/api/projectApi";


// import axios from "axios";
// import { Loader2 } from "lucide-react";
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { toast } from "sonner";

// const MEDIA_API = "http://localhost:8000/api/v1/media";

// const LectureTab = () => {
//   const [lectureTitle, setLectureTitle] = useState("");
//   const [uploadVideInfo, setUploadVideoInfo] = useState(null);
//   const [isFree, setIsFree] = useState(false);
//   const [mediaProgress, setMediaProgress] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [btnDisable, setBtnDisable] = useState(true);
//   const params = useParams();
//   const { projectId, lectureId } = params;

//   const {data:lectureData} = useGetLectureByIdQuery(lectureId);
//   const lecture = lectureData?.lecture;

//   useEffect(()=>{
//     if(lecture){
//       setLectureTitle(lecture.lectureTitle);
//       setIsFree(lecture.isPreviewFree);
//       setUploadVideoInfo(lecture.videoInfo)
//     }
//   },[lecture])

//   const [edtiLecture, { data, isLoading, error, isSuccess }] =
//     useEditLectureMutation();
//     const [removeLecture,{data:removeData, isLoading:removeLoading, isSuccess:removeSuccess}] = useRemoveLectureMutation();

//   const fileChangeHandler = async (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const formData = new FormData();
//       formData.append("file", file);
//       setMediaProgress(true);
//       try {
//         const res = await axios.post(`${MEDIA_API}/upload-video`, formData, {
//           onUploadProgress: ({ loaded, total }) => {
//             setUploadProgress(Math.round((loaded * 100) / total));
//           },
//         });

//         if (res.data.success) {
//           console.log(res);
//           setUploadVideoInfo({
//             videoUrl: res.data.data.url,
//             publicId: res.data.data.public_id,
//           });
//           setBtnDisable(false);
//           toast.success(res.data.message);
//         }
//       } catch (error) {
//         console.log(error);
//         toast.error("video upload failed");
//       } finally {
//         setMediaProgress(false);
//       }
//     }
//   };

//   const editLectureHandler = async () => {
//     console.log({ lectureTitle, uploadVideInfo, isFree, projectId, lectureId });

//     await edtiLecture({
//       lectureTitle,
//       videoInfo:uploadVideInfo,
//       isPreviewFree:isFree,
//       projectId,
//       lectureId,
//     });
//   };

//   const removeLectureHandler = async () => {
//     await removeLecture(lectureId);
//   }

//   useEffect(() => {
//     if (isSuccess) {
//       toast.success(data.message);
//     }
//     if (error) {
//       toast.error(error.data.message);
//     }
//   }, [isSuccess, error]);

//   useEffect(()=>{
//     if(removeSuccess){
//       toast.success(removeData.message);
//     }
//   },[removeSuccess])

//   return (
//     <Card>
//       <CardHeader className="flex justify-between">
//         <div>
//           <CardTitle>Edit Lecture</CardTitle>
//           <CardDescription>
//             Make changes and click save when done.
//           </CardDescription>
//         </div>
//         <div className="flex items-center gap-2">
//           <Button disbaled={removeLoading} variant="destructive" onClick={removeLectureHandler}>
//             {
//               removeLoading ? <>
//               <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
//               Please wait
//               </> : "Remove Lecture"
//             }
//           </Button>
//         </div>
//       </CardHeader>
//       <CardContent>
//         <div>
//           <Label>Title</Label>
//           <Input
//             value={lectureTitle}
//             onChange={(e) => setLectureTitle(e.target.value)}
//             type="text"
//             placeholder="Ex. Introduction to Javascript"
//           />
//         </div>
//         <div className="my-5">
//           <Label>
//             Video <span className="text-red-500">*</span>
//           </Label>
//           <Input
//             type="file"
//             accept="video/*"
//             onChange={fileChangeHandler}
//             placeholder="Ex. Introduction to Javascript"
//             className="w-fit"
//           />
//         </div>
//         <div className="flex items-center space-x-2 my-5">
//           <Switch checked={isFree} onCheckedChange={setIsFree} id="airplane-mode" />
//           <Label htmlFor="airplane-mode">Is this video FREE</Label>
//         </div>

//         {mediaProgress && (
//           <div className="my-4">
//             <Progress value={uploadProgress} />
//             <p>{uploadProgress}% uploaded</p>
//           </div>
//         )}

//         <div className="mt-4">
//           <Button disabled={isLoading} onClick={editLectureHandler}>
//               {
//                 isLoading ? <>
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
//                 Please wait
//                 </> : "Update Lecture"
//               }
            
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default LectureTab;
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
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import {
  useEditLectureMutation,
  useGetLectureByIdQuery,
  useRemoveLectureMutation,
} from "@/redux/features/api/projectApi";

import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const MEDIA_API = "https://projectfytest.onrender.com/api/v1/media";

const LectureTab = () => {
  const [lectureTitle, setLectureTitle] = useState("");
  const [uploadVideInfo, setUploadVideoInfo] = useState(null);
  const [isFree, setIsFree] = useState(false);
  const [mediaProgress, setMediaProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const params = useParams();
  const { projectId, lectureId } = params;

  const { data: lectureData } = useGetLectureByIdQuery(lectureId);
  const lecture = lectureData?.lecture;

  useEffect(() => {
    if (lecture) {
      setLectureTitle(lecture.lectureTitle);
      setIsFree(lecture.isPreviewFree);
      setUploadVideoInfo(lecture.videoInfo);
    }
  }, [lecture]);

  const [edtiLecture, { data, isLoading, error, isSuccess }] =
    useEditLectureMutation();
  const [
    removeLecture,
    { data: removeData, isLoading: removeLoading, isSuccess: removeSuccess },
  ] = useRemoveLectureMutation();

  const fileChangeHandler = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      setMediaProgress(true);
      try {
        const res = await axios.post(`${MEDIA_API}/upload-video`, formData, {
          onUploadProgress: ({ loaded, total }) => {
            setUploadProgress(Math.round((loaded * 100) / (total || 1)));
          },
        });

        if (res.data.success) {
          setUploadVideoInfo({
            videoUrl: res.data.data.url,
            publicId: res.data.data.public_id,
          });
          toast.success(res.data.message);
        }
      } catch (error) {
        toast.error("Video upload failed");
      } finally {
        setMediaProgress(false);
      }
    }
  };

  const editLectureHandler = async () => {
    await edtiLecture({
      lectureTitle,
      videoInfo: uploadVideInfo,
      isPreviewFree: isFree,
      projectId,
      lectureId,
    });
  };

  const removeLectureHandler = async () => {
    await removeLecture(lectureId);
  };

  useEffect(() => {
    if (isSuccess) toast.success(data.message);
    if (error) toast.error(error.data.message);
  }, [isSuccess, error]);

  useEffect(() => {
    if (removeSuccess) toast.success(removeData.message);
  }, [removeSuccess]);

  return (
    <Card className="w-full p-4 sm:p-6">
      {/* Header */}
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <CardTitle className="text-lg sm:text-xl md:text-2xl">
            Edit Lecture
          </CardTitle>
          <CardDescription className="text-sm sm:text-base">
            Make changes and click save when done.
          </CardDescription>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            disabled={removeLoading}
            variant="destructive"
            onClick={removeLectureHandler}
            className="w-full sm:w-auto"
          >
            {removeLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Remove Lecture"
            )}
          </Button>
        </div>
      </CardHeader>

      {/* Content */}
      <CardContent className="space-y-5">
        {/* Lecture Title */}
        <div className="w-full">
          <Label>Title</Label>
          <Input
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            type="text"
            placeholder="Ex. Introduction to Javascript"
            className="w-full"
          />
        </div>

        {/* Upload Video */}
        <div className="w-full">
          <Label>
            Video <span className="text-red-500">*</span>
          </Label>
          <Input
            type="file"
            accept="video/*"
            onChange={fileChangeHandler}
            className="w-full sm:w-fit"
          />
        </div>

        {/* Free Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <Switch
            checked={isFree}
            onCheckedChange={setIsFree}
            id="free-video"
          />
          <Label htmlFor="free-video">Is this video FREE</Label>
        </div>

        {/* Upload Progress */}
        {mediaProgress && (
          <div className="my-4 w-full">
            <Progress value={uploadProgress} />
            <p className="text-sm mt-1">{uploadProgress}% uploaded</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            disabled={isLoading}
            onClick={editLectureHandler}
            className="w-full sm:w-auto"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Update Lecture"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LectureTab;
