import React from "react";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import styles from "./app.module.css";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import OrderDetails from "../OrderDetails/OrderDetails";

const url = `https://norma.nomoreparties.space/api/ingredients`;

function App() {
  const [apiData, setApiData] = React.useState([]);
  const [success, setSuccess] = React.useState(false);

  React.useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    return fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          setSuccess(false);
          throw new Error("Ошибка при получении данных");
        }
      })
      .then((data) => {
        setApiData(data.data);
        setSuccess(data.success);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [openModal, setOpenModal] = React.useState(false);
  const [item, setItem] = React.useState(null);

  const handleOnButtonClick = () => {
    setItem(null);
    setOpenModal((prevState) => !prevState);
  };

  const handleIngredientClick = (selectedItem) => {
    setItem(selectedItem);
    setOpenModal((prevState) => !prevState);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients
          ingredients={apiData}
          handleIngredientClick={handleIngredientClick}
        />
        <BurgerConstructor handleOnButtonClick={handleOnButtonClick} />
      </main>
      {openModal && (
        <Modal close={closeModal}>
          {item ? <IngredientDetails ingredient={item} /> : <OrderDetails />}
        </Modal>
      )}
    </>
  );
}

export default App;
