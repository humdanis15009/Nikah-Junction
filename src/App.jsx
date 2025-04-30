import { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";

const Home = lazy(() => import("./components/Home"));
const Tnc = lazy(() => import("./components/Tnc"));
const AboutUs = lazy(() => import("./components/AboutUs"));
const Contact = lazy(() => import("./components/Contact"));
const Faq = lazy(() => import("./components/Faq"));
const Privacy = lazy(() => import("./components/Privacy"));
const Form1 = lazy(() => import("./components/Form1"));
const Form2 = lazy(() => import("./components/Form2"));
const Form3 = lazy(() => import("./components/Form3"));
const Verify = lazy(() => import("./components/Verify"));
const UserCardList = lazy(() => import("./components/UserCardList"));
const AdminDashboard = lazy(() => import("./components/AdminDashboard"));
const Services = lazy(() => import("./components/Services"));

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "Tnc",
          element: <Tnc />,
        },
        {
          path: "AboutUs",
          element: <AboutUs />,
        },
        {
          path: "Contact",
          element: <Contact />,
        },
        {
          path: "Faq",
          element: <Faq />,
        },
        {
          path: "Privacy",
          element: <Privacy />,
        },
        {
          path: "Form1",
          element: <Form1 />,
        },
        {
          path: "Form2",
          element: <Form2 />,
        },
        {
          path: "Form3",
          element: <Form3 />,
        },
        {
          path: "Verify",
          element: <Verify />,
        },
        {
          path: "UserCardList",
          element: <UserCardList />,
        },
        {
          path: "AdminDashboard",
          element: <AdminDashboard />,
        },
        {
          path: "Services",
          element: <Services />,
        },
      ],
    },
  ]);

  return (
    <>
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <img
              src="images/loading.gif"
              alt="Loading..."
              className="lg:w-40 lg:h-40 w-24 h-24"
            />
          </div>
        }
      >
        <RouterProvider router={router} />
      </Suspense>
    </>
  );
}

export default App;
