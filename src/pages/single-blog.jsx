/* eslint-disable no-unused-vars */

import Comments from "../components/single blog/Comments.jsx";
import FloatingActions from "../components/single blog/FloatingActions.jsx";
import Footer from "../components/common/Footer";

import { motion } from "framer-motion";

import SingleBlogsContent from "../components/single blog/SingleBlogsContent.jsx";

export default function SingleBlog() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
    >
      <section className="bg-[#030317] text-white px-4">
        <SingleBlogsContent />
      </section>

      <FloatingActions />
      <Comments />
      <Footer />
    </motion.div>
  );
}
