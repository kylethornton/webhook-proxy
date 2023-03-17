import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import NewConnection from "./containers/NewConnection";
import Connections from "./containers/Connections";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";

export default function Links() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/login"
        element={
          <UnauthenticatedRoute>
            <Login />
          </UnauthenticatedRoute>
        }
      />
      <Route path="/signup"
        element={
          <UnauthenticatedRoute>
            <Signup />
          </UnauthenticatedRoute>
        }
      />
      <Route
        path="/connections/new"
        element={
          <AuthenticatedRoute>
            <NewConnection />
          </AuthenticatedRoute>
        }
      />
      <Route
        path="/connections/:connectionId"
        element={
          <AuthenticatedRoute>
            <Connections />
          </AuthenticatedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />;
    </Routes>


  );
}
