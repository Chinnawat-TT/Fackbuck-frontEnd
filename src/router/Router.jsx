import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/loginPage";
import Layout from "../layout/Layout";
import HomePage from "../pages/HomePage";
import FriendPage from "../pages/FriendPage";
import ProfilePage from "../pages/ProfilePage";
import RedireactAuthenticated from "../features/auth/RedireactAuthenticated";
import Authenticated from "../features/auth/Authenticated";

const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      // children props ชนิดพิเศษ ไม่ต้องเขียน
      <RedireactAuthenticated>               
        <LoginPage />                             
      </RedireactAuthenticated>
    ),
  },
  {
    path: "/",
    element: (
    <Authenticated>
    <Layout />
    </Authenticated>
    ),
    children: [
      { path: "", element: <HomePage /> },
      { path: "friend", element: <FriendPage /> },
      { path: "profile/:profileid", element: <ProfilePage /> },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />; // RouterProvider ไว้ ดีเทค path อะไร จะได้เรนเดอร์ element นั้นๆ
}
