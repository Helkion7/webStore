import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Menu,
  X,
  ShoppingCart,
  User,
  LogOut,
  Search,
  ShoppingBag,
  ChevronDown,
  Home,
  Shield,
} from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/auth/me`,
          { withCredentials: true }
        );

        if (response.data.success) {
          setUser(response.data.user);
        }
      } catch (error) {
        // User is not logged in, that's fine
        console.log("User not authenticated");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
    console.log("Searching for:", searchQuery);
    // Close search bar after search
    setIsSearchOpen(false);
    setSearchQuery("");
  };

  const toggleMobileMenu = () => {
    setIsOpen(!isOpen);
    // Close other menus when opening mobile menu
    if (!isOpen) {
      setIsDropdownOpen(false);
      setIsSearchOpen(false);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setIsOpen(false);
    }
  };

  return (
    <nav className="bg-white shadow-md">
      {/* Top navigation bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and left side navigation */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="font-bold text-xl text-blue-600">
                RockWear
              </Link>
            </div>

            {/* Desktop navigation links */}
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <Link
                to="/"
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              >
                Hjem
              </Link>

              {/* Categories dropdown */}
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 flex items-center"
                >
                  Kategorier
                  <ChevronDown size={16} className="ml-1" />
                </button>

                {isDropdownOpen && (
                  <div className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      <Link
                        to="/genser"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Gensere
                      </Link>
                      <Link
                        to="/tskjorte"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        T-skjorter
                      </Link>
                      <Link
                        to="/products"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Alle produkter
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center">
            {/* Search button */}
            <button
              onClick={toggleSearch}
              className="p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-50 focus:outline-none"
            >
              <Search size={20} />
            </button>

            {/* Shopping cart */}
            <Link
              to="/cart"
              className="ml-4 p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-50 focus:outline-none"
            >
              <ShoppingBag size={20} />
            </Link>

            {/* User menu */}
            {!loading && (
              <div className="ml-4 relative">
                {user ? (
                  <div className="flex items-center">
                    <span className="hidden md:inline-block text-sm font-medium text-gray-700 mr-2">
                      {user.name}
                    </span>
                    <div className="relative">
                      <button
                        onClick={toggleDropdown}
                        className="p-2 rounded-full text-gray-600 hover:text-blue-600 hover:bg-gray-50 focus:outline-none"
                      >
                        <User size={20} />
                      </button>

                      {isDropdownOpen && (
                        <div className="absolute right-0 z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                          <div className="py-1">
                            <Link
                              to="/account"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => setIsDropdownOpen(false)}
                            >
                              <div className="flex items-center">
                                <User size={16} className="mr-2" />
                                Min konto
                              </div>
                            </Link>

                            {/* Admin panel link - only for admins */}
                            {user.role === "admin" && (
                              <Link
                                to="/admin"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => setIsDropdownOpen(false)}
                              >
                                <div className="flex items-center">
                                  <Shield size={16} className="mr-2" />
                                  Admin panel
                                </div>
                              </Link>
                            )}

                            <button
                              onClick={() => {
                                handleLogout();
                                setIsDropdownOpen(false);
                              }}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              <div className="flex items-center">
                                <LogOut size={16} className="mr-2" />
                                Logg ut
                              </div>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Link
                      to="/login"
                      className="p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-50 focus:outline-none"
                    >
                      Logg inn
                    </Link>
                    <Link
                      to="/register"
                      className="ml-2 hidden md:inline-block px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                    >
                      Registrer
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Mobile menu button */}
            <div className="ml-4 flex items-center sm:hidden">
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-50 focus:outline-none"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Search bar overlay */}
      {isSearchOpen && (
        <div className="absolute top-16 inset-x-0 bg-white shadow-md z-20 p-4">
          <form onSubmit={handleSearch} className="max-w-3xl mx-auto flex">
            <input
              type="text"
              placeholder="Søk etter produkter..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none"
            >
              <Search size={20} />
            </button>
          </form>
        </div>
      )}

      {/* Mobile menu, show/hide based on menu state */}
      {isOpen && (
        <div className="sm:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              onClick={toggleMobileMenu}
            >
              <div className="flex items-center">
                <Home size={18} className="mr-2" />
                Hjem
              </div>
            </Link>
            <Link
              to="/genser"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              onClick={toggleMobileMenu}
            >
              Gensere
            </Link>
            <Link
              to="/tskjorte"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              onClick={toggleMobileMenu}
            >
              T-skjorter
            </Link>
            <Link
              to="/products"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              onClick={toggleMobileMenu}
            >
              Alle produkter
            </Link>

            {!user && (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  onClick={toggleMobileMenu}
                >
                  Logg inn
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 rounded-md text-base font-medium bg-blue-600 text-white hover:bg-blue-700"
                  onClick={toggleMobileMenu}
                >
                  Registrer
                </Link>
              </>
            )}

            {user && user.role === "admin" && (
              <Link
                to="/admin"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                onClick={toggleMobileMenu}
              >
                <div className="flex items-center">
                  <Shield size={18} className="mr-2" />
                  Admin panel
                </div>
              </Link>
            )}

            {user && (
              <button
                onClick={() => {
                  handleLogout();
                  toggleMobileMenu();
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              >
                <div className="flex items-center">
                  <LogOut size={18} className="mr-2" />
                  Logg ut
                </div>
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
