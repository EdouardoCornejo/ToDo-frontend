import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import AppTodo from "./App.Todo";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

/**
 * If the user is logged in, render the AppTodo component, otherwise, render the Login component.
 * @returns The App component is being returned.
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <AppTodo />
            </PrivateRoute>
          }
        />
        {/* Rendering the Login and Register components. */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
