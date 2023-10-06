import { useAuth } from "../../hooks/use-Auth";
import { MessageIcon, ThumbsUpAltIcon, ThumbsUpIcon } from "../../icons";
import ActionButton from "./ActionButton";


export default function PostFooter({ postObj }) {
    const { totalLike ,likes }= postObj
    const { authUser }= useAuth()
    const isLike = likes.find( (el)=> el.userId === authUser.id)

  return (
    <div>
        <div className=" flex justify-between pb-2 items-center">
            { totalLike > 0 && <div className=" flex gap-1 items-baseline">
                <div className=" bg-blue-600 h-5 w-5 rounded-full flex items-center justify-center">
                    <ThumbsUpIcon/>
                    </div>
                <span className=" text-sm text-gray-500">{ totalLike }</span>
            </div>}
            <span className=" text-sm text-gray-500 hover:underline cursor-pointer">8 Comment</span>
        </div>
        <hr />
        <div className=" flex gap-1 py-1">
            <ActionButton active={isLike}>
                <div className=" flex justify-center gap-2">
                    <ThumbsUpAltIcon className={isLike ? ' fill-blue-500' : 'fill-gray-500'}/>
                    <span>Like</span>
                </div>
            </ActionButton>
            <ActionButton>
            <div className=" flex justify-center gap-2">
                    <MessageIcon className=" fill-gray-500"/>
                    <span>Comment</span>
                </div>
            </ActionButton>
        </div>
    </div>
  )
}
