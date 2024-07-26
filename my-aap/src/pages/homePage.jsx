
import FooterComponent from "../FooterComponent/footerComponent";
import UserProfile from "../profileComponent/ProfileComponent";



function Home() {

 

  return (
    <>
    <section id="home">
      <h2>Home</h2>
      <p>Welcome to the home page!</p>
      
      <UserProfile/>
      
    </section>
    <footer className="footer">
          <FooterComponent />
        </footer>
    </>
  );
}
export default Home;