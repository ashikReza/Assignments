/* eslint-disable no-unused-vars */

import Footer from "../components/common/Footer";

// import { Link } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

import BlogsContent from "../components/blog feed/BlogsContent.jsx";
import Sidebar from "../components/blog feed/Sidebar.jsx";

export default function Home() {
  // const { auth } = useAuth();
  // console.log(auth);

  return (
    <>
      <section className="w-full bg-[#030317] px-4 pt-10">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            {/* <!-- Blog Contents --> */}
            <BlogsContent />

            {/* <!-- Sidebar --> */}
            <Sidebar />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
