import { FolderOpen, Home, LogOut, User } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useLogoutUserMutation } from "@/redux/api/userApi"
import toast from "react-hot-toast"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/Store"

export function UserMenu() {
  const [logout]=useLogoutUserMutation();
  const userData=useSelector((state:RootState)=>state?.auth?.user);
  function logoutHandle(){
   
    logout(null)
      .unwrap()
      .then(() => {
        window.location.href = "/login";
      })
      .catch((error:any) => {
      toast.error("Unable to Logout ");
      console.log(error.message);
      
      });

  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger >
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={userData?.avatar.url} alt="@user" />
            <AvatarFallback className="bg-purple-200 text-purple-900"><User/></AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">John Doe</p>
            <p className="text-xs leading-none text-muted-foreground">john.doe@example.com</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
        <DropdownMenuItem onClick={() => window.location.href = "/home"}>
            <Home className="mr-2 h-4 w-4" />
            <span>Home</span>
          </DropdownMenuItem>
            <DropdownMenuItem onClick={() => window.location.href = "/myprojects"}>
            <FolderOpen className="mr-2 h-4 w-4" />
            <span>My Projects</span>
            </DropdownMenuItem>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-600" onClick={logoutHandle}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

