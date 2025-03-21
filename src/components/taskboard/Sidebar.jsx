import React from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from "@headlessui/react";
import {
  XMarkIcon,
  ArrowRightEndOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { navigation } from "../../constants/navigation";
import { Link, useNavigate } from "react-router";
import TaskifyLogo from "../../assets/images/taskify-logo.png";
import { AuthUser } from "../../helpers/AuthUser";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();

  // Logout Function
  const handleLogout = () => {
    // Helper function to logout the user
    AuthUser.logout();
    navigate("/login");
  };

  return (
    <>
      {/*  Mobile Sidebar */}
      <Dialog
        open={sidebarOpen}
        onClose={setSidebarOpen}
        className="relative z-50 lg:hidden"
      >
        <DialogBackdrop className="fixed inset-0 bg-gray-900/80 transition-opacity" />
        <div className="fixed inset-0 flex">
          <DialogPanel className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-closed:-translate-x-full">
            <TransitionChild>
              <div className="absolute top-0 left-full flex w-16 justify-center pt-5">
                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  className="-m-2.5 p-2.5"
                >
                  <XMarkIcon className="size-6 text-white" />
                </button>
              </div>
            </TransitionChild>

            <div className="flex grow flex-col bg-gray-900 px-6 pb-2">
              <div className="flex h-16 shrink-0 items-center">
                <img src={TaskifyLogo} className="h-12 w-auto" />
              </div>

              <nav className="flex flex-1 flex-col">
                <ul role="list" className="-mx-2 flex-1 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        className={`group flex gap-x-3 rounded-md p-2 text-sm font-semibold ${
                          location.pathname === item.href
                            ? "bg-gray-800 text-white"
                            : "text-gray-400 hover:bg-gray-800 hover:text-white"
                        }`}
                      >
                        <item.icon className="size-6 shrink-0" />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Logout Button  */}
              <div className="mt-auto pb-4">
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center p-3 text-sm font-semibold text-gray-400 hover:bg-gray-800 hover:text-white rounded-md mx-auto cursor-pointer"
                >
                  <ArrowRightEndOnRectangleIcon className="size-6 shrink-0" />
                  Logout
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/*  Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:flex lg:flex-col lg:w-20 lg:bg-gray-900">
        <div className="flex h-16 items-center justify-center">
          <img src={TaskifyLogo} className="h-12 w-auto" />
        </div>
        <nav className="mt-8 flex flex-col flex-grow">
          <ul className="flex flex-col items-center space-y-1 flex-grow">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={`group flex gap-x-3 rounded-md p-3 text-sm font-semibold ${
                    location.pathname === item.href
                      ? "bg-gray-800 text-white"
                      : "text-gray-400 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  <item.icon className="size-6 shrink-0" />
                </Link>
              </li>
            ))}
          </ul>

          {/* Logout Icon  */}
          <div className="pb-4">
            <button
              onClick={handleLogout}
              className="flex items-center justify-center p-3 text-sm font-semibold text-gray-400 bg-gray-800 hover:text-white rounded-md mx-auto cursor-pointer"
            >
              <ArrowRightEndOnRectangleIcon className="size-6 shrink-0 text-red-500 hover:text-red-600" />
            </button>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
