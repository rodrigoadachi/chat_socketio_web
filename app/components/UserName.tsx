"use client";

import { useGlobalContext } from "../Context/user";

const UserName = () => {
  const { user } = useGlobalContext();

  return <div className="text-white">{user?.email || ""}</div>;
};

export default UserName;
