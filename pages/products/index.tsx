import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import CartComponent from '../../components/cartPost'

interface PostData {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface Props {
  actualPostList: PostData[];
}

const index = ({ actualPostList }: Props) => {
  return (
    <div className="relative z-1 p-5 grid w-full gap-x-3 gap-y-5 justify-items-center"
      style={{
        gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
      }}>
      {actualPostList.map((element) => {
        return (
          <Link href={`/products/${element.id}`}>
            <CartComponent key={element.id} post={element} />
          </Link>
        )
      })}
    </div>
  );
}


export const getStaticProps: GetStaticProps = async (ctx) => {
  const jsonResponse = await fetch('https://jsonplaceholder.typicode.com/posts')
  const actualPostList = await jsonResponse.json()

  return {
    props: {
      actualPostList
    }
  }
}

export default index;