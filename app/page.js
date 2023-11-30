import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Post from "@/components/post";
import image from "../assets/top-view-pepperoni-pizza-with-mushroom-sausages-bell-pepper-olive-corn-black-wooden_141793-2158.jpg"
export default function Home() {
  return (
    <main>
      <Navbar />
      <Post post={{ name: "Pizza", time: "30 minutes", calories: "1000 cals", description: "bell pepper", imageURL: image }} />
      <Footer />
    </main>
  );
}
