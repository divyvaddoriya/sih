import { useParams } from "react-router-dom"
import {ZegoUIKitPrebuilt} from "@zegocloud/zego-uikit-prebuilt"
import { useQuery } from "@tanstack/react-query";
const RoomMeeting = () => {

    const { data: authUser } = useQuery({ queryKey: ["authUser"] });
    
    const {roomId} = useParams()

    const myMeeting = async (element) => {

        const appID = 1752828211;
        const serverSecret = "5f951798623b5bca817ad06db59f6f31";

        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID,serverSecret,roomId,Date.now().toString(), authUser.username );

        const zc = ZegoUIKitPrebuilt.create(kitToken);

        zc.joinRoom({
            container: element,
            sharedLinks: [{
                name: 'Copy Link',
                url: `http://localhost:5173/room/${roomId}`,
            }],
            scenario: {
                mode: ZegoUIKitPrebuilt.OneONoneCall,
            },
            showScreenSharingButton: true,
        })
    };

    return (
    <div>
        <div ref={myMeeting}/>
    </div>
  )
}

export default RoomMeeting