import ListRestaurant from "@/components/chat/ListRestaurant"
import ChatPanel from "@/components/chat/ChatPanel"
export default function Chat(){
    return (
        <main className="w-full h-[calc(100%-96px)] flex">
            <div className="sm:w-1/3 h-[100%] sm:border border-slate-300 pt-5 w-[100%]">
                <ListRestaurant></ListRestaurant>
            </div>
            <div className="sm:w-2/3 h-[100%] sm:border-t border-slate-300 hidden sm:inline-block">
                <ChatPanel></ChatPanel>
            </div>
        </main>
)
}