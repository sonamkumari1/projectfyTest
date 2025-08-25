import { useLogoutUserMutation } from "@/redux/features/api/authApi";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import DarkMode from "./DarkMode";

const Header = () => {
  const { user } = useSelector((store) => store.auth);
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    await logoutUser();
  };
  console.log(user, "user")

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "user logout");
      navigate("/login");
    }
  }, [isSuccess]);
  return (
  
     <div className="w-full max-w-screen-xl mx-auto mt-10 rounded-full 
      bg-white/80 dark:bg-zinc-900 backdrop-blur-md px-8 py-1 flex items-center justify-between border border-black dark:border-gray-700 transition-colors">
      
      {/* Logo */}
      <div className="flex items-center gap-4">
        <img src="/logo.png" alt="logo" className="w-16 h-16 hidden md:flex object-contain" />
        <Link to="/" className="font-medium text-4xl py-2 md:py-0 text-gray-900 dark:text-white">
          Projectfy
        </Link>
      </div>

      {/* User Section */}
      <div className="flex items-center justify-center gap-5">
        <DarkMode />
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage
                  src={user?.photoUrl || "https://github.com/shadcn.png"}
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border dark:border-gray-700">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Link to="my-learning">My Learning</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="profile">Edit Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logoutHandler}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuGroup>
              {user?.role === "instructor" && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link to="/instructor/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link
            to="/login"
            className="text-gray-900 dark:text-white rounded-full px-5 py-1.5 bg-gray-200 dark:bg-gray-800 font-medium text-lg flex items-center transition border border-gray-300 dark:border-gray-700 relative overflow-hidden group"
          >
            Login
            <svg
              className="inline-block ml-2 group-hover:translate-x-2 transition duration-1000"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M13.3 17.275q-.3-.3-.288-.725t.313-.725L16.15 13H5q-.425 0-.713-.288T4 12q0-.425.288-.713T5 11h11.15L13.325 8.175q-.3-.3-.313-.725t.288-.725q.3-.3.725-.288t.725.313l4.15 4.15q.15.15.213.325t.063.375q0 .2-.063.375t-.213.325l-4.15 4.15q-.3.3-.725.313t-.725-.288Z"
              />
            </svg>
            <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-12 h-3 bg-gray-300 dark:bg-gray-600 blur-[18px] group-hover:scale-[3] opacity-0 group-hover:opacity-100 transition duration-1000" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
