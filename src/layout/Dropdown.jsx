import { Link } from "react-router-dom";
import Avatar from "../components/Avatar";
import { RightFromBracketIcon } from "../icons";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../hooks/use-Auth";

export default function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const dropDownEl =useRef(null);  //  step 1 : { current : null}                         // ไม่รีเรนเดอร์  ตอนเปลี่ยนเเปลงค่า
  // step 2 :  dropDownEL = { current : object <div className="relative" ></div>}
  

  const { logout , authUser } = useAuth()

//   useEffect( ()=>{
//     console.log('effect run...')                                    // run first render
//     return ()=>{
//         console.log('effect return run...')                         // ทำงานตอน remove dom
//     }
//   },[])
  useEffect( ()=>{
    
    const handleClickOutside =(event) => {
       if(!dropDownEl.current.contains(event.target)){
            setIsOpen(false)
       }
    }
    document.addEventListener('click',handleClickOutside)                            // run first render
    return ()=>{
        
        document.removeEventListener('click',handleClickOutside)                    // run remove dom
    }
  },[])


  return (
    <div className="relative" ref={dropDownEl}>
      <div className=" cursor-pointer" onClick={()=>setIsOpen(!isOpen)}>
        <Avatar />
      </div>
      {isOpen && (
        <div className="w-96 absolute bg-white right-0 translate-y-1 border rounded-xl shadow-xl p-2">
          <Link to="/profile/aaaaaa" onClick={ ()=>setIsOpen(false)}>
            <div className="flex gap-4 p-2 items-center rounded-xl hover:bg-gray-100">
              <Avatar className="h-14" />
              <div>
                <div className="font-semibold">{authUser.firstName} {authUser.lastName}</div>
                <div className="text-sm text-gray-500">See your profile</div>
              </div>
            </div>
          </Link>
          <hr className="m-2 border" />
          <div className="flex gap-4 p-2 items-center cursor-pointer hover:bg-gray-100 rounded-xl"  onClick={logout}>
            <div className="bg-gray-300 h-9 aspect-square rounded-full flex justify-center items-center">
              <RightFromBracketIcon />
            </div>
            <div className="font-semibold text-sm">Log out</div>
          </div>
        </div>
      )}
    </div>
  );
}
