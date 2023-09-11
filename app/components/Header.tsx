import Avatar from "./Avatar";
import SignInButton from "./SignInButton";
import UserName from "./UserName";

export default function Header() {
  return (
    <div className="flex w-full min-h-full items-center justify-center bg-[#202c33] p-4">
      <ul className="flex items-center justify-between gap-10 sm:gap-2 text-xl w-full">
        <Avatar />
        <UserName />
        <SignInButton />
      </ul>
    </div>
  );
}
