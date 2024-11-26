import { useNavigate } from "react-router-dom";

export const Appbar = ({ user }) => {
    const firstLetter = user ? user[0].toUpperCase() : "";
    const navigate = useNavigate();

    return <div className="shadow h-14 flex justify-between bg-slate-900">
        <div className="flex flex-col justify-center h-full ml-4">
            <h1 className="font-extrabold text-white">Mamoon's E-Wallet</h1>
        </div>
        <div className="flex">
        <div className="flex justify-between items-center gap-2">
          <button
            onClick={() => navigate("/")}
            className="rounded-full bg-slate-700 hover:bg-slate-900 text-white border border-slate-700 py-2 font-medium px-5 hover:cursor-pointer focus:outline-none mr-7"
          >
            Logout
          </button>
          </div>
            <div className="flex flex-col justify-center h-full mr-4">
                <h2 className="font-bold text-white">Hello, {user}</h2>
            </div>
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {firstLetter}
                </div>
            </div>
        </div>
    </div>
}