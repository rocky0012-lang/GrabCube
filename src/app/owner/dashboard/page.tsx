import { DropdownAccountCardSM } from "@/components/reusable/account-card"
import LogoutDialog from "@/components/reusable/logout-dialog";




const OwnerDashboard = () => {
  return (
    <div className="flex flex-col justify-between gap-4">
      <div className="flex items-center ">
        <h1>Owner Dashboard</h1>
        <p>Hi, welcome to your dashboard!</p>
      </div>
      <div className="flex items-center flex-wrap gap-4">
        <LogoutDialog
          redirectTo="owner-signin"
        />
        <DropdownAccountCardSM 
          redirectTo="/owner-signin"
        />
      </div>
    </div>
  )
}

export default OwnerDashboard
