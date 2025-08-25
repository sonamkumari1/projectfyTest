// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useRegisterUserMutation } from "@/redux/features/api/authApi";
// import { Loader2 } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";

// function Register() {
//   const [inputData, setInputData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });
//   const navigate = useNavigate();

//   const [
//     registerUser,
//     {
//       data: registerData,
//       error: registerError,
//       isLoading: registerIsLoading,
//       isSuccess: registerIsSuccess,
//     },
//   ] = useRegisterUserMutation();

//   const changeInputHandler = (e) => {
//     const { name, value } = e.target;
//     setInputData({ ...inputData, [name]: value });
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     await registerUser(inputData);
//   };

//   useEffect(() => {
//     if (registerIsSuccess && registerData) {
//       toast.success(registerData.message || "Signup successful.");
//       navigate("/login");
//     }
//     if (registerError) {
//       toast.error(registerError.data.message || "Signup Failed");
//     }
//   }, [registerIsLoading, registerData, registerError, registerIsSuccess]);
//   return (
//     <div className="flex justify-center my-20 px-4 sm:px-8 md:px-16">
//       <Card className="w-full max-w-sm">
//         <CardHeader className="text-center">
//           <CardTitle className="font-bold text-xl my-3">
//             Create an account
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={submitHandler}>
//             <div className="flex flex-col gap-6">
//               <div className="grid gap-2">
//                 <Label htmlFor="name">Full Name</Label>
//                 <Input
//                   id="name"
//                   type="text"
//                   placeholder="John Doe"
//                   name="name"
//                   value={inputData.name}
//                   onChange={changeInputHandler}
//                   required
//                 />
//               </div>
//               <div className="grid gap-2">
//                 <Label htmlFor="email">Email</Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   placeholder="m@example.com"
//                   name="email"
//                   value={inputData.email}
//                   onChange={changeInputHandler}
//                   required
//                 />
//               </div>
//               <div className="grid gap-2">
//                 <Label htmlFor="password">Password</Label>
//                 <Input
//                   id="password"
//                   type="password"
//                   name="password"
//                   placeholder="password"
//                   value={inputData.password}
//                   onChange={changeInputHandler}
//                   required
//                 />
//               </div>
//             </div>
//             <CardFooter className="flex-col gap-4 mt-6">
//               {registerIsLoading ? (
//                 <Button disabled>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
//                 </Button>
//               ) : (
//                 <Button type="submit" className="w-full">
//                   Signup
//                 </Button>
//               )}
//               <p className="text-sm text-center">
//                 Already have an account?{" "}
//                 <Button
//                   onClick={() => navigate("/login")}
//                   variant="link"
//                   className="p-0"
//                 >
//                   Login
//                 </Button>
//               </p>
//             </CardFooter>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// export default Register;
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRegisterUserMutation } from "@/redux/features/api/authApi";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function Register() {
  const [inputData, setInputData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student", // default role
  });
  const navigate = useNavigate();

  const [
    registerUser,
    {
      data: registerData,
      error: registerError,
      isLoading: registerIsLoading,
      isSuccess: registerIsSuccess,
    },
  ] = useRegisterUserMutation();

  const changeInputHandler = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await registerUser(inputData);
  };

  useEffect(() => {
    if (registerIsSuccess && registerData) {
      toast.success(registerData.message || "Signup successful.");
      navigate("/login");
    }
    if (registerError) {
      toast.error(registerError.data.message || "Signup Failed");
    }
  }, [registerIsLoading, registerData, registerError, registerIsSuccess]);

  return (
    <div className="flex justify-center my-20 px-4 sm:px-8 md:px-16">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="font-bold text-xl my-3">
            Create an account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={submitHandler}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  name="name"
                  value={inputData.name}
                  onChange={changeInputHandler}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  name="email"
                  value={inputData.email}
                  onChange={changeInputHandler}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="password"
                  value={inputData.password}
                  onChange={changeInputHandler}
                  required
                />
              </div>

              {/* ✅ Role Selection */}
              <div className="grid gap-2">
                <Label>Role</Label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="role"
                      value="student"
                      checked={inputData.role === "student"}
                      onChange={changeInputHandler}
                    />
                    Student
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="role"
                      value="instructor"
                      checked={inputData.role === "instructor"}
                      onChange={changeInputHandler}
                    />
                    Instructor
                  </label>
                </div>
              </div>
            </div>

            <CardFooter className="flex-col gap-4 mt-6">
              {registerIsLoading ? (
                <Button disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                </Button>
              ) : (
                <Button type="submit" className="w-full">
                  Signup
                </Button>
              )}
              <p className="text-sm text-center">
                Already have an account?{" "}
                <Button
                  onClick={() => navigate("/login")}
                  variant="link"
                  className="p-0"
                >
                  Login
                </Button>
              </p>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Register;
