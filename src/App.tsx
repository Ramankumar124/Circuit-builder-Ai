import "./App.css";
import {
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/Dashboard/Dashbaord";
import PromptPage from "./pages/Main/PromptPage";
import LandingPage from "./pages/Main/Landingpage";
import SavedProject from "./pages/Main/SavedProject";
import ProtectedRoute from "./protectedRoute/protectedRoute";
import { AppDispatch, RootState } from "./redux/Store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchUserData } from "./redux/features/authSlice";
import { useEffect } from "react";
import NotFound from "./pages/NotFound";
import AuthLayout from "./pages/auth";


function App() {

  const {user} = useSelector((state: RootState) => state?.auth);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUserData());
    console.log("data aya");
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route element={<ProtectedRoute user={user} />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="home" element={<PromptPage />} />
            <Route path="myprojects" element={<SavedProject />} />
          </Route>
          <Route
            path="/login"
            element={
              <ProtectedRoute user={!user} redirect="/home">
                <AuthLayout />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
