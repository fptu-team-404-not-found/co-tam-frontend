import { Routes, Route } from "react-router-dom";

import logo from "./logo.svg";
import "./App.scss";
import Menu from "./components/menu/Menu";
import Account from "./components/account/AccountHouseWorker";
import Navbar from "./components/nav/Navbar";
import Service from "./components/service/Service";
import Promotion from "./components/promotion/Promotion";
import Building from "./components/building/Building";
import Area from "./components/area/Area";
import Configuration from "./components/configuration/Configuration";
import AccountHouseWorker from "./components/account/AccountHouseWorker";
import AccountCustomer from "./components/account/AccountCustomer";
import AccountInformationCustomer from "./components/account/AccountInformationCustomer";
import AccountInformationHouseworker from "./components/account/AccountInformationHouseworker";
import CreateNewArea from "./components/area/CreateNewArea";
import CreateNewBuilding from "./components/building/CreateNewBuilding";
import CreateNewPromotion from "./components/promotion/CreateNewPromotion";
import CreateNewService from "./components/service/CreateNewService";
import AccountManager from "./components/account/AccountManager";
import Order from "./components/order/Order";
import Login from "./components/login/Login";
import { useState } from "react";
import { ProtectedRoute } from "./ProtectedRoute";

function App() {
  const [isAuth, setAuth] = useState(
    localStorage.getItem("user") !== null ? true : false
  );

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Manager */}
        <Route
          path="/order"
          element={
            <ProtectedRoute
              isAuth={isAuth}
              children={<Order />}
            ></ProtectedRoute>
          }
        />
        <Route
          path="/accounthouseworker"
          element={
            <ProtectedRoute
              isAuth={isAuth}
              children={<AccountHouseWorker />}
            ></ProtectedRoute>
          }
        />

        <Route
          path="/accountinformation"
          element={
            <ProtectedRoute
              isAuth={isAuth}
              children={<AccountInformationHouseworker />}
            ></ProtectedRoute>
          }
        />

        <Route
          path="/accountcustomer"
          element={
            <ProtectedRoute
              isAuth={isAuth}
              children={<AccountCustomer />}
            ></ProtectedRoute>
          }
        />
        {/* End Manager */}

        {/* Admin */}
        <Route
          path="/accountmanager"
          element={
            <ProtectedRoute
              isAuth={isAuth}
              children={<AccountManager />}
            ></ProtectedRoute>
          }
        />

        <Route
          path="/service"
          element={
            <ProtectedRoute
              isAuth={isAuth}
              children={<Service />}
            ></ProtectedRoute>
          }
        />

        {/* <Route
          path="/createnewservice"
          element={
            <ProtectedRoute
              isAuth={isAuth}
              children={<CreateNewService />}
            ></ProtectedRoute>
          }
        /> */}
        <Route
          path="/promotion"
          element={
            <ProtectedRoute
              isAuth={isAuth}
              children={<Promotion />}
            ></ProtectedRoute>
          }
        />

        <Route
          path="/createnewpromotion"
          element={
            <ProtectedRoute
              isAuth={isAuth}
              children={<CreateNewPromotion />}
            ></ProtectedRoute>
          }
        />

        <Route
          path="/building"
          element={
            <ProtectedRoute
              isAuth={isAuth}
              children={<Building />}
            ></ProtectedRoute>
          }
        />

        <Route
          path="/createnewbuilding"
          element={
            <ProtectedRoute
              isAuth={isAuth}
              children={<CreateNewBuilding />}
            ></ProtectedRoute>
          }
        />

        <Route
          path="/area"
          element={
            <ProtectedRoute
              isAuth={isAuth}
              children={<Area />}
            ></ProtectedRoute>
          }
        />

        <Route
          path="/createnewarea"
          element={
            <ProtectedRoute
              isAuth={isAuth}
              children={<CreateNewArea />}
            ></ProtectedRoute>
          }
        />

        <Route
          path="/configuration"
          element={
            <ProtectedRoute
              isAuth={isAuth}
              children={<Configuration />}
            ></ProtectedRoute>
          }
        />

        {/* End Admin */}
      </Routes>
    </>
  );
}

export default App;
