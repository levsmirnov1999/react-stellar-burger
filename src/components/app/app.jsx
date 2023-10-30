import React from "react";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import styles from "./app.module.css";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import OrderDetails from "../OrderDetails/OrderDetails";
import { useDispatch, useSelector } from "react-redux";
import { closeAllModals } from "../../services/modalSlice";
import { fetchIngredients } from "../../services/ingredientsQuery";
import { addIngredient } from "../../services/constructorSlice";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const state = useSelector((store) => {
    return store;
  });

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchIngredients());
  }, []);

  const handleDrop = (ingredient) => {
    dispatch(addIngredient(ingredient));
  };

  const handleCloseModals = () => {
    dispatch(closeAllModals());
  };

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor onDropHandler={handleDrop} />
        </DndProvider>
      </main>

      {state.modal?.orderDetails?.isOpened && (
        <Modal onClick={handleCloseModals} closeModal={handleCloseModals}>
          <OrderDetails
            orderNumber={state.burgerConstructor?.orderNumber}
            closeModal={handleCloseModals}
          />
        </Modal>
      )}
      {state.modal?.ingredientDetails?.isOpened && (
        <Modal closeModal={handleCloseModals}>
          <IngredientDetails
            ingredientData={state.data.ingredientDetails.ingredient}
            closeModal={handleCloseModals}
          />
        </Modal>
      )}
    </>
  );
}

export default App;
