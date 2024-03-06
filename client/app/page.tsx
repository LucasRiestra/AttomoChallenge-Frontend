import RootLayout from './layout';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import AllGameList from './components/AllGamesList/AllGamesList';

export default function Home() {

  
  return (
    <RootLayout>
        <Header/>
          <AllGameList/>
        <Footer/>
    </RootLayout>
  );
}