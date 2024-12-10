import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import { Link } from "react-router-dom";


const Navbar = () => {
	const { data: authUser } = useQuery({ queryKey: ["authUser"] });
	const queryClient = useQueryClient();
	// notification count and requests counts
	// const { data: notifications } = useQuery({
	// 	queryKey: ["notifications"],
	// 	queryFn: async () => axiosInstance.get("/notifications"),
	// 	enabled: !!authUser,
	// });

	// const { data: connectionRequests } = useQuery({
	// 	queryKey: ["connectionRequests"],
	// 	queryFn: async () => axiosInstance.get("/connections/requests"),
	// 	enabled: !!authUser,
	// });

	const { mutate: logout } = useMutation({
		mutationFn: () => axiosInstance.post("/auth/logout"),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["authUser"] });
		},
	});


	return (
		<nav className='bg-primary font-bold text-white shadow-md sticky top-0 z-10'>
			<div className='max-w-7xl mx-auto px-4'>
				<div className='flex justify-between items-center py-5'>
					<div className='flex items-center space-x-4'>
						<Link to='/'>
							<div className="black text-3xl">CarrerMent</div>
						</Link>
					</div>
					<div className='flex items-center gap-2 md:gap-6'>
						{authUser ? (
							<>
								<Link to={"/"} className='text-white flex flex-col items-center'>
									<span className='text-lg  text-white hidden md:block'>Home</span>
								</Link>
								<Link to={"/join-meeting"} className=' text-white flex flex-col items-center'>
									<span className='text-lg  text-white hidden md:block'>join meeting</span>
								</Link>
								{ authUser.mentor &&
									<Link to={`/profile/${authUser._id}/mymeetings`} className=' text-white flex flex-col items-center'>
									<span className='text-lg  text-white hidden md:block'>dash board</span>
								</Link>
}
{
!authUser.mentor &&
	<Link to={`/find`} className='text-white flex flex-col items-center'>
	<span className='text-lg  text-white hidden md:block'>Find Mentor</span>
	</Link>
}
								
								{ !authUser.mentor &&
									<Link to={`/profile/${authUser._id}/mymeetings`} className='text-white flex flex-col items-center'>
									<span className='text-lg  text-white hidden md:block'> Meetings</span>
								</Link>
								}
								<Link to='/network' className='text-white flex flex-col items-center relative'>
									<span className='text-lg  text-white hidden md:block'> Network</span>
									
								</Link>
								<Link to='/notifications' className='text-white flex flex-col items-center relative'>
									<span className='text-lg  hidden md:block'>Notifications</span>
								
								</Link>
								<Link
									to={`/profile/${authUser.username}`}
									className='text-white flex flex-col items-center'
								>
									<span className='text-lg  hidden md:block'>My Profile</span>
								</Link>
								<button
									className='flex items-center space-x-1 text-sm text-white hover:text-white'
									onClick={() => logout()}
								>
									<span className='hidden font-bold text-2xl md:inline'>Logout</span>
								</button>
							</>
						) : (
							<>
								<Link to='/login' className='btn btn-ghost'>
									Sign In
								</Link>
								<Link to='/signup' className='btn btn-primary'>
									Join now
								</Link>
							</>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
};
export default Navbar;
