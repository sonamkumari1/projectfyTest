import Header from "../components/Home/Header";
import ProjectDashboard from "../components/Home/ProjectDashboard";
import Banner from "../components/Home/Banner";
import Footer from "../components/Home/Footer";

function Home() {
  return (
    <div className="dark:bg-black">
      <Banner />
      <ProjectDashboard />
    </div>
  );
}

export default Home;
