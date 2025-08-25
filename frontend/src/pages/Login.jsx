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
import { useLoginUserMutation } from "@/redux/features/api/authApi";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function Login() {
  const [inputData, setInputData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const [
    loginUser,
    {
      data: loginData,
      error: loginError,
      isLoading: loginIsLoading,
      isSuccess: loginIsSuccess,
    },
  ] = useLoginUserMutation();

  const changeInputHandler = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await loginUser(inputData);
  };

  useEffect(() => {
    if (loginIsSuccess && loginData) {
      toast.success(loginData.message || "Login successful.");
      const role = loginData?.user?.role;
      if (role === "instructor") {
        navigate("/instructor/dashboard");
      } else if (role === "student") {
        navigate("/");
      }
    }
    if (loginError) {
      toast.error(loginError.data.message || "login Failed");
    }
  }, [loginIsLoading, loginData, loginError, loginIsSuccess]);

  return (
    <div className="flex justify-center my-20 px-4 sm:px-8 md:px-16">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="font-bold text-2xl my-4">
            Login to your account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={submitHandler}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={inputData.email}
                  placeholder="m@example.com"
                  onChange={changeInputHandler}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="password"
                  name="password"
                  value={inputData.password}
                  onChange={changeInputHandler}
                  required
                />
              </div>
            </div>
            <CardFooter className="flex-col gap-4 mt-6">
              {loginIsLoading ? (
                <Button disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                </Button>
              ) : (
                <Button type="submit" className="w-full">
                  Login
                </Button>
              )}
              <p className="text-sm text-center">
                Don’t have an account?{" "}
                <Button
                  onClick={() => navigate("/register")}
                  variant="link"
                  className="p-0"
                >
                  Sign Up
                </Button>
              </p>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;
