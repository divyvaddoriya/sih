import { log } from "console";
import Meeting from "../models/meeting.model.js";
import Notification from "../models/notification.model.js";
import User from "../models/user.model.js";
import { fileURLToPath } from "url";

export const createMeeting = async (req, res) => {
	try {
		const  { mentorName, studentName,meetingName,date,time,meetingId } = req.body;
		let	newMeeting = new Meeting({
				mentorName: mentorName,
				studentName: studentName,
				createBy: req.user._id,
                meetingId: meetingId,
                meetingName: meetingName,
                date,
                time
			});
		await newMeeting.save();
        res.status(201).json(newMeeting);

	} catch (error) {
		console.error("Error in create Meeting controller:", error);
		res.status(500).json({ message: "Server error" });
	}
};
export const myMeetings = async (req, res) => {
	try {
	  if (!req.user || !req.user._id) {
		return res.status(400).json({ message: "User not authenticated" });
	  }
	  const id = req.params.id
	  const user = await User.findOne({_id : id})
	
	const filterField = user.mentor  ? "mentorName" : "studentName";
const requests = await Meeting.find({ [filterField]: user.username  });
			
	res.json(requests);
	
	} catch (error) {
	  console.error("Error in get meetings controller:", error);
	  res.status(500).json({ message: "Server error" });
	}
  };
  