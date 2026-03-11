import { useState } from "react";

import Stories from "../stories/Stories";
import Posts from "../posts/posts";
import CreatePost from "../posts/CreatePost";
import LeftSidebar from "../LeftSidebar";
import RightSidebar from "../RightSidebar";

import { posts as dummyPosts } from "../posts/postsData";

const Home = () => {

  const [posts, setPosts] = useState(dummyPosts);

  const addPost = (post) => {
    setPosts([post, ...posts]);
  };

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-4 gap-4 pt-4">

      <LeftSidebar />

      <div className="col-span-2 space-y-5">

        <Stories />

        <CreatePost addPost={addPost} />

        <Posts posts={posts} />

      </div>

      <RightSidebar />

    </div>
  );
};

export default Home;