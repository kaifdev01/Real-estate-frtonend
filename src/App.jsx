import PropertyList from './components/PropertyListing'
import Signup from './pages/Register'
import Login from './pages/Login'
import { Link, Route, Routes } from 'react-router-dom'
import ForgotPassword from './components/ForgotPassword'
import ResetPassword from './components/ResetPassword'
import PropertyDetails from './pages/PropertyDetails'
import AdminPanel from './components/AdminPanel'
import HomePage from './pages/Home'
import Header from './components/Header'
import CityAreaSelector from './components/CityAreaSelector'
import SearchResults from './components/SearchResults'
import FeaturedListing from './components/FeaturedListing'
import AboutUs from './pages/About'
import Footer from './components/Footer'
import Servcies from './pages/Services'
import LoginSignup from './components/LoginSignup'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";




function App() {
  // const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/services" element={<Servcies />} />
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-pass" element={<ForgotPassword />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/properties" element={<PropertyList />} />
        <Route path="/search-results" element={<SearchResults />} />

        {/* Protected Route for Admin Dashboard */}
        <Route
          path="/admin"
          element={
            userRole === 'admin' ? (
              <AdminPanel />
            ) : (
              <Link to="/" />
            )
          }
        />
      </Routes>
      {/* <LoginSignup /> */}
      <Footer />
      {/* <FeaturedListing /> <br /><br /><br /><br /> */}
      {/* <CityAreaSelector /> */}
      {/* <Link to="/properties">Properties</Link> */}
    </>
  )
}

export default App
