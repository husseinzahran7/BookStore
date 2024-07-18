import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

const BackButton = ({ destianation = "/" }) => {
  return (
    <div className="flex">
      <Link to={destianation} className="bg-sky-800 text-white px-4 py-1 rounded-lg w-fit">
        <BsArrowLeft className="text-2xl" /> Back
      </Link>
      <Link to="/"></Link>
    </div>
  );
};

export default BackButton;
