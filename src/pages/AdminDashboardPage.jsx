import AdminDashboardNav from "../components/AdminDashboardNav";
import VideoList from "../components/VideoList";
import { LuDot } from "react-icons/lu";
import { MdKeyboardArrowDown } from "react-icons/md";

const AdminDashboardPage = () => {
  return (
    <section className="h-screen bg-[#111111]">
      <nav>
        <AdminDashboardNav />
      </nav>

      <header className="flex items-center justify-between px-12 mt-10">
        <h1 className="text-4xl font-thin text-white">Today's leaderboard</h1>

        {/* Date Card */}
        <div className="flex items-center space-x-2 text-sm font-thin text-white bg-[#1D1D1D] py-3 px-6 rounded-2xl">
          <span>30 May 2024</span> <LuDot className="text-[#696969]" />{" "}
          <span className="bg-[#9BFF00] px-2 text-black py-0.5 rounded-lg">
            SUBMISSIONS OPEN
          </span>{" "}
          <LuDot className="text-[#696969]" /> 11:34
        </div>
      </header>

      {/* Card Table Titles */}
      <div className="text-[#696969] flex justify-between px-16 mt-8">
        <div className="space-x-4">
          <span>#</span>
          <span>Title</span>
        </div>

        <span>Author</span>
        <span className="flex items-center">
          Most Liked <MdKeyboardArrowDown />
        </span>
      </div>

      {/* Video List */}
      <VideoList />
    </section>
  );
};

export default AdminDashboardPage;
