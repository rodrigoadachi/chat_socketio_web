"use client";
import { useGlobalContext } from "@/app/Context/user";
import fetchWrapper from "@/functions/fetchWrapper";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from "react";
import { UserDto } from "../types/User";
import LogIn from "../assets/LogIn";
import LogOut from "../assets/LogOut";

interface iResult {
  message: string;
  user: UserDto;
}
const SignInButton = () => {
  const { data: session } = useSession();
  const { user, setUser } = useGlobalContext();
  // const { user, userSignIn } = useContext(UserContext);

  const sendCredential = async (data: UserDto | undefined) => {
    const result = await fetchWrapper<iResult>("user", "POST", data);
    console.log(result?.user);
    if (result?.user) setUser(result?.user);
    // if (result?.user) userSignIn({ data: result?.user });
  };
  useEffect(() => {
    if (session) sendCredential(session?.user);
  }, [session]);
  return (
    <>
      {session && (
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={() => signOut()}
        >
          <LogOut />
        </button>
      )}
      {!session && (
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={() => signIn("google")}
        >
          <LogIn />
        </button>
      )}
    </>
  );
};

export default SignInButton;
