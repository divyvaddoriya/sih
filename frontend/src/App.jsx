import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import SignUpPage from "./pages/auth/SignUpPage";
import toast, { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./lib/axios";
import NotificationsPage from "./pages/NotificationsPage";
import NetworkPage from "./pages/NetworkPage";
import PostPage from "./pages/PostPage";
import ProfilePage from "./pages/ProfilePage";
import Home from "./components/videocall/Home";
import RoomMeeting from "./components/videocall/RoomMeeting";
import Dashboard from "./components/meeting/DashBoard";
import CreateMeeting from "./components/meeting/CreateMeeting";
import OneOnOneMeeting from "./components/meeting/OneOnOneMeeting";
import MyMeetings from "./components/meeting/MyMeetings";
import FindMentorPage from "./components/findMentor/FindMentorPage";
function App() {
	const { data: authUser, isLoading } = useQuery({
		queryKey: ["authUser"],
		queryFn: async () => {
			try {
				const res = await axiosInstance.get("/auth/me");
				return res.data;
			} catch (err) {
				if (err.response && err.response.status === 401) {
					return null;
				}
				toast.error(err.response.data.message || "Something went wrong");
			}
		},
	});

	if (isLoading) return null;

	return (
		<Layout>
			<Routes>
				<Route path='/' element={authUser ? <HomePage /> : <Navigate to={"/login"} />} />
				<Route path='/signup' element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />} />
				<Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to={"/"} />} />
				<Route path='/notifications' element={authUser ? <NotificationsPage /> : <Navigate to={"/login"} />} />
				<Route path='/network' element={authUser ? <NetworkPage /> : <Navigate to={"/login"} />} />
				<Route path='/post/:postId' element={authUser ? <PostPage /> : <Navigate to={"/login"} />} />
				<Route path='/profile/:username' element={<ProfilePage />} />
				<Route path='/join-meeting' element={ <Home />} />
				<Route path="/room/:roomId" element={<RoomMeeting />} />
				{/* all the meeting paths */}
				<Route path='/profile/dashboard' element={<Dashboard />} />
				<Route path='/create' element={authUser ? <CreateMeeting /> : <Navigate to={"/login"} />} />
				<Route path='profile/:profile/create1on1' element={<OneOnOneMeeting /> } />
				<Route path='profile/:profile/mymeetings' element={<MyMeetings /> } />
				<Route path='/find' element={<FindMentorPage /> } />
			</Routes>
			<Toaster />
		</Layout>
	);
}

export default App;