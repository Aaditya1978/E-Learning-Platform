import React from "react";
import { BrowserRouter, Routes , Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import UserHome from "./components/UserHome/UserHome";
import Tracks from "./components/Tracks/Tracks";
import TrackHome from "./components/TrackHome/TrackHome";
import Admin from "./components/Admin/Admin";
import AdminHome from "./components/AdminHome/AdminHome";
import AddTrack from "./components/AdminHome/AddTrack";
import EditTrack from "./components/AdminHome/EditTrack";
import AdminTrack from "./components/AdminHome/AdminTrack";
import AddCourse from "./components/AdminHome/AddCourse";
import EditCourse from "./components/AdminHome/EditCourse";
import CourseHome from "./components/CourseHome/CourseHome";
import Analytics from "./components/Analytics/Analytics";
import Compete from "./components/Compete/Compete";
import Practice from "./components/Practice/Practice";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>

          {/* User Routes */}
          <Route exact path="/" element={<Home />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/home" element={<UserHome />} />
          <Route exact path="/tracks" element={<Tracks/>}/>
          <Route exact path="/track/:id" element={<TrackHome/>}/>
          <Route exact path="/course/:id" element={<CourseHome/>}/>
          <Route exact path="/analytics" element={<Analytics/>}/>
          <Route exact path="/compete" element={<Compete/>}/>
          <Route exact path="/practice" element={<Practice/>}/>

          {/* Admin Routes */}
          <Route exact path="/admin_login" element={<Admin/>}/>
          <Route exact path="/admin_home" element={<AdminHome/>}/>
          <Route exact path="/admin_add_track" element={<AddTrack/>}/>
          <Route exact path="/admin_home/edit/:id" element={<EditTrack/>}/>
          <Route exact path="/admin_home/view/:id" element={<AdminTrack/>}/>
          <Route exact path="/admin_add_course/:id" element={<AddCourse/>}/>
          <Route exact path="/admin_home/edit_course/:courseId" element={<EditCourse/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;