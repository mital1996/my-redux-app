import { React, Suspense, lazy } from "react";
import { useSelector } from "react-redux";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const Login = lazy(() => import("./pages/Login"));
const HomeScreen = lazy(() => import("./pages/HomeScreen"));

const DeleteModal = lazy(() => import("./component/modal/delete"));
const StandardModal = lazy(() => import("./component/modal/standard"));

function App() {
  const modal = useSelector((state) => state?.modal);
  // console.log("data>>>>", modal.delete.data);
  const router = createBrowserRouter([
    { path: "/", element: <Login /> },
    { path: "/dashboard", element: <HomeScreen /> },
  ]);

  return (
    <div className="App">
      <Suspense>
        <RouterProvider router={router} />

        {modal?.standard?.open && (
          <StandardModal data={modal?.standard?.data} />
        )}
        <DeleteModal data={modal?.delete?.data} />
      </Suspense>
    </div>
  );
}

export default App;
