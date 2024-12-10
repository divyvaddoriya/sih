import { EuiFlexGroup, EuiForm, EuiSpacer } from "@elastic/eui";

import  { useState } from "react";
import CreateMeetingButtons from "../FormComponents/CreateMeetingButtons";
import MeetingNameField from "../FormComponents/MeetingNameFIeld";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from "dayjs";
import { generateMeetingID } from "../../utils/generateMeetingId";
import { useQuery } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import toast from "react-hot-toast";
import { useNavigate
  ,useLocation } from "react-router-dom";

export default function OneOnOneMeeting(){
  const [meetingName,setMeetingName] = useState("");
  const [selectedDate, setSelectedDate] = useState(dayjs("2024-12-7"));
  const [selectedTime, setSelectedTime] = useState(dayjs('2022-04-17T15:30'));
  const [meetingId,setMeetingId] = useState(generateMeetingID())
  const queryClient = useQueryClient();
 
  
  const { mutate: createMeetingMutation} = useMutation({
  mutationFn: async (meetingData) => {
    const res = await axiosInstance.post(`/meeting/create`,  meetingData, {
      headers: { "Content-Type": "application/json" },
    })
    return res.data;
  },
  onSuccess: () => {
    toast.success("meetings created successfully");
    queryClient.invalidateQueries({ queryKey: ["meetings"] });
  },
  onError: (err) => {
    toast.error(err.response.data.message || "Failed to create meeting");
  },
});
const { data: authUser } = useQuery({ queryKey: ["authUser"] });

  const navigate = useNavigate();
  const location = useLocation();

  const {mentorName} = location.state ;
 
    
    const studentName = authUser.username;

    const handleMeetingCreation = async (e) => {
      e.preventDefault()
      try {
        const date = selectedDate.format("YYYY-MM-DD");
        const time = selectedTime.format("hh:mm A");
        const meetingData = { mentorName,studentName,meetingName,date,time,meetingId };
        console.log(meetingData)
        createMeetingMutation({ mentorName,studentName,meetingName,date,time,meetingId });
        navigate(`/profile/${authUser._id}/myMeetings`,{state: {username: authUser.username}});
  } catch (error) {
    console.error("Error in handleMeetingCreation:", error);
  }
};

  return (
      <div
        style={{
          display: "flex",
          height: "50vh",
          flexDirection: "column",
        }}
      >
     
         <EuiFlexGroup justifyContent="center" alignItems="center">
          <EuiForm>
            <MeetingNameField
              label="Meeting name"
              placeholder="Meeting name"
              value={meetingName}
              setMeetingName={setMeetingName}
            /> 
            <EuiSpacer />
            <MeetingNameField
              label="Meeting code"
              placeholder="Meeting Code"
              value={meetingId}
              onChange={(newValue) => {setMeetingId(newValue) }}
            /> 
          <EuiSpacer />
           <DemoContainer components={['DatePicker']}>
           <DatePicker
           label="date pick"
           defaultValue={selectedDate}
         onChange={(newValue) => {setSelectedDate(newValue) }} />
           </DemoContainer>
           <EuiSpacer />
           <DemoContainer components={['TimePicker']}>
        <TimePicker defaultValue={selectedTime} onChange={(e) => {setSelectedTime(e)}} label="Basic time picker" />
      </DemoContainer>

            <EuiSpacer />
          
          <CreateMeetingButtons 
          createMeeting={handleMeetingCreation} />
          </EuiForm> 
        </EuiFlexGroup>
      </div>
    );
}