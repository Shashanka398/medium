import { Avatar } from "./BlogCard"
import { Link } from "react-router-dom"
import Logo from '../assets/medium.svg'

 const Header = ({name}) => {
    return <div className="border-b flex justify-between px-10 py-4">
        <Link to={'/blogs'} className="flex flex-col justify-center cursor-pointer font-bold">
                <img src={Logo}/>
        </Link>
        <div>
            <Link to={`/editor`}>
                <button type="button" className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 ">New</button>
            </Link>

            <Avatar size={"big"} name={name} />
        </div>
    </div>
}
export default Header