import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, createBrowserRouter, RouterProvider } from "react-router-dom";
// import LoginFormPage from './components/LoginFormPage';
// import SignupFormPage from './components/SignupFormPage';
import Navigation from "./components/Navigation/Navigation-bonus";
import * as sessionActions from "./store/session";
import { Modal } from "./context/Modal";
import Homepage from "./components/Homepage/Homepage";
import DetailsPage from "./components/Spot/Spot";
import CreateSpot from "./components/Spot/CreateSpot";
import ManageSpots from "./components/Spot/ManageSpots";
import UpdateSpot from "./components/Spot/UpdateSpot";
function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch]);

  return (
    <>
      <Modal />
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "spots/:spotId",
        element: <DetailsPage />,
      },
      {
        path: "spots/new",
        element: <CreateSpot />,
      },
      {
        path: "/manage",
        element: <ManageSpots />,
      },
      {
        path: "spots/:spotId/update-spot",
        element: <UpdateSpot />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
