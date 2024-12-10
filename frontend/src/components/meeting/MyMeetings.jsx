import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios"; 
export default function MyMeetings() {
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });
  const id = authUser._id
  const { data: connectionRequests, isLoading, isError } = useQuery({
    queryKey: ["Meetings"],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(`/meeting/${id}/all`,);
        return response.data; 
      } catch (error) {
        console.error("Error fetching meetings:", error);
        return []; 
      }
    },
    enabled: !!authUser , 
  });
  
  if (isLoading) {
    return <Box>Loading meetings...</Box>;
  }

  if (isError) {
    return <Box>Error loading meetings. Please try again later.</Box>;
  }
 
  
  const meetings = connectionRequests || []
  console.log(meetings);
  

  const handleUpdate = (id) => {
    alert(`Update meeting with ID: ${id}`);
  };

  const handleDelete = (id) => {
    alert(`Delete meeting with ID: ${id}`);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Meeting ID</TableCell>
            <TableCell>Meeting Name</TableCell>
            {
              authUser.mentor ? (
                <TableCell>Student Name</TableCell>
              ):(
                <TableCell> Mentor Name</TableCell>
              )
            }
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {meetings.length > 0 ? (
            meetings.map((meeting) => (
              <TableRow key={meeting.meetingId}>
                <TableCell>{meeting.meetingId}</TableCell>
                <TableCell>{meeting.meetingName}</TableCell>
                {
              authUser.mentor ? (
                <TableCell>{meeting.studentName}</TableCell>
              ):(
                <TableCell> {meeting.mentorName}</TableCell>
              )
            }
                <TableCell>{meeting.date}</TableCell>
                <TableCell>{meeting.time}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleUpdate(meeting.meetingId)}
                    style={{ marginRight: "8px" }}
                  >
                    Update
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={() => handleDelete(meeting.meetingId)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center">
                No meetings available.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
