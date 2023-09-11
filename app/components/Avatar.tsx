"use client";

import { useGlobalContext } from "../Context/user";

const Avatar = () => {
  const { user } = useGlobalContext();
  return (
    <img
      className="w-20 h-20 rounded-full"
      src={user?.image || "/logo.png"}
      alt="Rounded avatar"
    ></img>
  );
};

export default Avatar;
