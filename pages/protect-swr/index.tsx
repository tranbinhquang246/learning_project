import { useSession } from "next-auth/react";
import useSWR from "swr";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Image from "next/image";
const fetcher = (url: string) => fetch(url).then((res) => res.json());
const index = () => {
  const router = useRouter();
  const { status } = useSession();
  useEffect(() => {
    if (status === "unauthenticated") router.replace("/");
  }, [status]);
  const { data, error } = useSWR(
    status === "authenticated"
      ? "https://jsonplaceholder.typicode.com/photos?_limit=30"
      : null,
    fetcher
  );
  console.log(data);
  if (status === "authenticated") {
    if (error) {
      return <div>Error: {error.message}</div>;
    }
    return (
      <div
        className="relative z-1 p-5 grid w-full gap-x-3 gap-y-5 justify-items-center"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
        }}
      >
        {data?.map((element: any) => {
          return (
            <div className="relative flex flex-col items-center justify-center min-w-[230px] h-full p-2 bg-slate-100 text-center hover:cursor-pointer hover:bg-slate-200">
              <img
                src={element.thumbnailUrl}
                alt={element.id}
                className="w-full h-full"
              />
              <p className="absolute p-10">{element.title}</p>
            </div>
          );
        })}
      </div>
    );
  }
  return <>Loadinggggggg....</>;
};

export default index;
