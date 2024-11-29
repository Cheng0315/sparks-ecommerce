import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen"> 
      <h4 className="text-2xl font-bold text-center mb-4"> This page could not be found </h4> 
      <Link to="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center" > Go to Home </Link> 
    </div>
  );
}

export default PageNotFound;