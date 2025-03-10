import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Menu, X, ShoppingCart, User, Disc, Guitar } from "lucide-react";

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/auth/me`,
          { withCredentials: true }
        );

        if (response.data.user) {
          setIsLoggedIn(true);
          setIsAdmin(response.data.user.role === "admin");
        }
      } catch (error) {
        // If error, user is not logged in
        setIsLoggedIn(false);
        setIsAdmin(false);
      }
    };

    checkAuthStatus();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      setIsLoggedIn(false);
      setIsAdmin(false);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // NavLink component for consistent styling
  const NavLink = ({ to, children, icon }) => (
    <Link
      to={to}
      className="relative flex items-center px-4 py-2 text-gray-300 hover:text-white transition-colors duration-300 group"
      onClick={() => setMobileMenuOpen(false)}
    >
      {icon && <span className="mr-2">{icon}</span>}
      <span>{children}</span>
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500 group-hover:w-full transition-all duration-300"></span>
    </Link>
  );

  return (
    <nav className="bg-gradient-to-r from-[#1E1E1E] to-[#2D2D2D] shadow-lg border-b border-purple-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and branding */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <Guitar className="h-8 w-8 text-purple-500" />
              <span className="ml-2 text-xl font-bold text-white">
                Rock Shop
              </span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-1">
            <NavLink to="/" icon={<Disc size={18} />}>
              Home
            </NavLink>
            <NavLink to="/products">All Products</NavLink>
            <NavLink to="/genser">Gensere</NavLink>
            <NavLink to="/tskjorte">T-skjorter</NavLink>

            {!isLoggedIn ? (
              <>
                <NavLink to="/login" icon={<User size={18} />}>
                  Login
                </NavLink>
                <NavLink to="/register">Register</NavLink>
              </>
            ) : (
              <>
                <button
                  onClick={handleLogout}
                  className="relative px-4 py-2 text-gray-300 hover:text-white transition-colors duration-300 group"
                >
                  <span>Logout</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-800 group-hover:w-full transition-all duration-300"></span>
                </button>
              </>
            )}

            {isAdmin && (
              <>
                <NavLink to="/admin">Admin Panel</NavLink>
                <NavLink to="/products/create">Create Product</NavLink>
              </>
            )}
          </div>

          {/* Cart icon */}
          <div className="flex items-center">
            <Link
              to="/cart"
              className="p-2 rounded-full bg-[#333333] text-[#E0E0E0] hover:bg-purple-800 hover:text-white transition-all duration-300"
            >
              <ShoppingCart size={20} />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center ml-4">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#2D2D2D] border-t border-purple-900">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/products">All Products</NavLink>
            <NavLink to="/genser">Gensere</NavLink>
            <NavLink to="/tskjorte">T-skjorter</NavLink>

            {!isLoggedIn ? (
              <>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/register">Register</NavLink>
              </>
            ) : (
              <>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-gray-300 hover:text-white hover:bg-purple-900 transition-colors duration-300"
                >
                  Logout
                </button>
              </>
            )}

            {isAdmin && (
              <>
                <NavLink to="/admin">Admin Panel</NavLink>
                <NavLink to="/products/create">Create Product</NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
