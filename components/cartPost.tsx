import { GetServerSideProps } from "next";

interface PostData {
  userId: number;
  id: number;
  title: string;
  body: string;
}
const cartPost = ({post} : {post: PostData}) => {
  return (
    <div className="flex flex-col items-center justify-center min-w-[230px] h-full p-2 bg-slate-100 text-center hover:cursor-pointer hover:bg-slate-200">
        <b>{post.title}</b>
    <p> {post.body}</p>
    </div>
  );
};

export default cartPost;
