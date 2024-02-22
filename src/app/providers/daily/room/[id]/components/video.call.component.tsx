import {forwardRef, LegacyRef} from "react";

// eslint-disable-next-line react/display-name
const Video = forwardRef((
    {participantId}: {participantId: string},
        videoEl: LegacyRef<HTMLVideoElement> | null,
) => {
    return (
        <video autoPlay={true} muted playsInline ref={videoEl}></video>
    )
})

Video.displayName = "Video";
export default Video;
