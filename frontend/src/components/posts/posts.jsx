import { useQuery } from "@tanstack/react-query";
import { makerequest } from "../../axios";
import PostCard from "./postCard";

const Posts = () => {

  const { isPending, error, data } = useQuery({
    queryKey: ["posts"],
    queryFn: () =>
      makerequest.get("/posts").then((res) => {
        return res.data; // important
      }),
  });

  if (isPending) return <p>Loading...</p>;
  if (error) return <p>Something went wrong</p>;

  return (
    <div className="space-y-4">
      {data.map((post) => (
       
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Posts;