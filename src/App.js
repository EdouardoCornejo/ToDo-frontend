import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import AppTodo from "./App.Todo"
import PrivateRoute from "./components/PrivateRoute/PrivateRoute"

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
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
    )
}

export default App;