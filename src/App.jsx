import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute, ProtectedSignupRoute, AuthGuard } from "./auth/Auth";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Signup from "./pages/Signup";
import WeekData from "./components/WeekData";
import NotFound from "./pages/NotFound";
import GetAllData from "./components/Admin/GetAllData";

import TableData from "./components/Admin/TableData";
import GetUsers from "./components/HR/GetUsers";	
import Header from "./components/Header";
import EditDeleteData from "./components/User/EditDeleteData";
const currentUserType  = parseInt(localStorage.getItem('roleId'));
console.log( typeof currentUserType );
const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <AppRoutes />
    </BrowserRouter>
  );
};


export default App;


function AppRoutes(){
  return (
    
      <Routes>
        <Route path="/" element={<AuthGuard element={<LoginPage />} />} />
        <Route
          path="/signup"
          element={<ProtectedSignupRoute element={<Signup />} />}
        />
        <Route path="/user" element={<UserRoute currentUserType={currentUserType}>
          <HomePage />
           </UserRoute> }/>
        <Route path="/user/edit-delete" element={<UserRoute currentUserType={currentUserType}>
          <EditDeleteData />
           </UserRoute> }/>
        
        <Route path="/admin/data" element={
          <AdminRoute currentUserType={currentUserType}>
            <GetAllData/>
          </AdminRoute>} />

        <Route path="/admin/users" element={
          <AdminRoute currentUserType={currentUserType}>
            <TableData/>
          </AdminRoute>} />

        <Route path="/hr/users" element={
          <HrRoute currentUserType={currentUserType}>
            <GetUsers/>
            </HrRoute>
        } />
       
        <Route path="/weekdata" element={<WeekData />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    
  )
}

function UserRoute({children, currentUserType}){
  if(currentUserType === 1){
    return <>{children}</>
  }
}

function HrRoute({children, currentUserType}){
  if(currentUserType === 2){
    return <>{children}</>
  }
}
function AdminRoute({children, currentUserType}){
  if(currentUserType === 3){
    return <>{children}</>
  }
}
