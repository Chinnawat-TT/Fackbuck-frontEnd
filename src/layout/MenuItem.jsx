import { Link } from "react-router-dom";
import { HouseIcon } from "../icons";


export default function MenuItem( { to , Icon}) {
  return (
    <Link to={ to }>
    <div className=" px-10 py-2 rounded-md hover:bg-gray-100">
        <Icon/>
        </div>
    </Link>
  )
}
