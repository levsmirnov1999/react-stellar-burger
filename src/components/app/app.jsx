import React from "react";
import AppHeader from "../AppHeader/AppHeader";
import styles from "./App.module.css";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import OrderDetails from "../OrderDetails/OrderDetails";
import { useDispatch, useSelector } from "react-redux";
import { closeAllModals } from "../../services/modalSlice";
import { fetchIngredients } from "../../services/ingredientsQuery";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Home from "../../Pages/Home/Home";
import Login from "../../Pages/Login/Login";
import Register from "../../Pages/Register/Register";
import ForgotPassword from "../../Pages/ForgotPassword/ForgotPassword";
import ResetPassword from "../../Pages/ResetPassword/ResetPassword";
import Profile from "../../Pages/Profile/Profile";
import EditProfile from "../../Pages/Profile/EditProfile/EditProfile";
import OrderHistory from "../../Pages/Profile/OrderHistory/OrderHistory";
import { fetchUserData } from "../../services/userSlice";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import IngredientsPage from "../../Pages/Ingredients/Ingredients";

function App() {
  const state = useSelector((store) => {
    return store;
  });
  console.log(state);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  React.useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(fetchUserData());
  }, [dispatch]);

  const handleCloseModals = () => {
    dispatch(closeAllModals());
    navigate(-1);
  };

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <Routes location={background || location}>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              <ProtectedRoute restricted={true}>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path="/register"
            element={
              <ProtectedRoute restricted={true}>
                <Register />
              </ProtectedRoute>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <ProtectedRoute restricted={true}>
                <ForgotPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reset-password"
            element={
              <ProtectedRoute restricted={true}>
                <ResetPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          >
            <Route
              path="edit-profile"
              element={
                <ProtectedRoute>
                  <EditProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="orders"
              element={
                <ProtectedRoute>
                  <OrderHistory />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="/ingredients/:id" element={<IngredientsPage />} />
        </Routes>
      </main>
      {state.modalSlice?.orderDetails?.isOpened && (
        <Modal closeModal={handleCloseModals}>
          <OrderDetails closeModal={handleCloseModals} />
        </Modal>
      )}
      {background && (
        <>
          {state.modalSlice?.ingredientDetails?.isOpened && (
            <Modal closeModal={handleCloseModals}>
              <IngredientDetails
                ingredientData={
                  state.ingredientsSlice.ingredientDetails.ingredient
                }
                closeModal={handleCloseModals}
              />
            </Modal>
          )}
        </>
      )}
    </>
  );
}

export default App;
// Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NGM4OTFkYzJjYzYxMDAxYjNkNjhkYyIsImlhdCI6MTY5OTUyMzI4MiwiZXhwIjoxNjk5NTI0NDgyfQ.z7tnkUxSP-pv7vjmoqJEl2RPROWyXPg4NaM0iHSc25Q
