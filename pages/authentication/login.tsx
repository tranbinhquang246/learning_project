import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "@/components/button";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Input from "@/components/input";
interface LoginForm {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().required("Email is required").email("Email is invalid"),
  password: yup.string().required("Password is required"),
});

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: yupResolver(schema),
  });
  const router = useRouter();
  const { status } = useSession();
  useEffect(() => {
    if (status === "authenticated") router.push("/protect-swr");
  }, [status]);

  const onSubmit = async (data: LoginForm) => {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    console.log(res);
  };
  if (status !== "unauthenticated") {
    return <div>Loading......</div>;
  }

  return (
    <div className="flex flex-col w-screen h-screen items-center justify-center font-medium bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200">
      <div className="flex flex-col items-center justify-center w-5/6 md:w-4/6 lg:w-1/2 p-5 bg-white rounded-2xl">
        <Image alt="RabbIT ログイン" src="" />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-center w-full mt-10"
        >
          <Input
            label="メールアドレス"
            type="email"
            name="email"
            className={`border-2 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            placeholder="入力してください"
            register={register}
            errors={errors}
          />
          <Input
            label="パスワード"
            type="password"
            name="password"
            className={`border-2 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            placeholder="入力してください"
            register={register}
            errors={errors}
          />

          <Input
            type="checkbox"
            name="saveStateLogin"
            className={`h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded`}
            register={register}
            label="ログイン状態を保存する"
          />
          <Button
            className="w-4/6 p-3 bg-cyan-800 rounded-xl text-white hover:bg-cyan-900"
            type="submit"
          >
            ログイン
          </Button>

          <Button
            className="w-4/6 p-3 mt-5 border border-black rounded-xl hover:bg-slate-100"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              signIn("google");
            }}
          >
            <div className="flex w-full h-full items-center justify-center">
              <FcGoogle className="mr-2" />
              Googleでログイン
            </div>
          </Button>
        </form>
        <div className="flex mt-5">
          <p>パスワードを忘れた方は</p>
          <Link href={""} className="text-sky-600">
            こちら
          </Link>
        </div>

        <div className="flex mt-5">
          <p>初めて利用される法人の場合は、新規登録は</p>
          <Link href={""} className="text-sky-600">
            こちら
          </Link>
        </div>
        <span className="text-xs mt-5">
          Copyright © SOARIG. All rights reserved
        </span>
      </div>
    </div>
  );
};

export default LoginPage;
