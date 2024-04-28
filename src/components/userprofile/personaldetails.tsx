import User from "@/types/user";

export default function PersonalDetails({profile}:{profile:any}) {
    console.log(profile)
    return (
        <div className="w-full md:w-1/3 h-[500px] text-center mr-2 mt-2 rounded-lg flex flex-col shadow-lg border-2">
            <h2 className="m-5 mb-3 text-xl font-semibold">Personal Details</h2>
            <hr className="w-[95%] relative left-[2.5%] border-slate-400" />
            <h4 className="m-5 text-lg font-medium">Role</h4>
            <h4 className="m-5 mt-0 text-slate-400">{profile.role}</h4>
            <h4 className="m-5 text-lg font-medium">Telephone</h4>
            <h4 className="m-5 mt-0 text-slate-400">{profile.telephone}</h4>
            <h4 className="m-5 text-lg font-medium">Email Address</h4>
            <h4 className="m-5 mt-0 text-slate-400">{profile.email}</h4>
            <h4 className="m-5 text-lg font-medium">Date Created</h4>
            <h4 className="m-5 mt-0 text-slate-400">{profile.DateCreated?profile.DateCreated:'null'}</h4>
        </div>
    );
}
