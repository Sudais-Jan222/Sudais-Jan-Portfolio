import { useState } from "react";
import { MdArrowOutward } from "react-icons/md";

interface Props {
  image: string;
  alt?: string;
  video?: string;
  link?: string;
}

const WorkImage = (props: Props) => {
  const [isVideo, setIsVideo] = useState(false);
  const handleMouseEnter = () => {
    if (props.video) {
      setIsVideo(true);
    }
  };

  return (
    <div className="work-image">
      <div
        className="work-image-in"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsVideo(false)}
        data-cursor={"disable"}
      >
        {props.link && (
          <a href={props.link} target="_blank" className="work-link">
            <MdArrowOutward />
          </a>
        )}
        <img src={props.image} alt={props.alt} />
        {isVideo && props.video && (
          <video 
            src={props.video} 
            autoPlay 
            muted 
            playsInline 
            loop 
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )}
      </div>
    </div>
  );
};

export default WorkImage;
