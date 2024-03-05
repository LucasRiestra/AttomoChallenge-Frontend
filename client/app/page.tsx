import RootLayout from './layout';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import AllGameList from './components/AllGamesList/AllGamesList';
import { UserProvider } from '@auth0/nextjs-auth0/client';

export default function Home() {
  return (
    <RootLayout>
      <UserProvider>
        <Header/>
          <AllGameList/>
        <Footer/>
        </UserProvider>
    </RootLayout>
  );
}