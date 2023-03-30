import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const index = () => {
  const router = useRouter();
  const { status, data } = useSession();
  console.log(status);
  useEffect(() => {
    if (status === "unauthenticated") router.replace("/");
  }, [status]);

  if (status === "authenticated") {
    return <div>Protected page. {JSON.stringify(data.user, null, 2)}</div>;
  }
  return <div>Loading...</div>;
};

export default index;
