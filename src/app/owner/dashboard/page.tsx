import { DropdownAccountCardSM } from "@/components/reusable/account-card"
import LogoutButton from "@/components/reusable/logoutbutton"


const OwnerDashboard = () => {
  return (
    <div className="flex flex-col justify-between gap-4">
      <div className="flex items-center ">
        <h1>Owner Dashboard</h1>
        <p>Hi, welcome to your dashboard!</p>
      </div>
      <div className="flex items-center flex-wrap gap-4">
        <LogoutButton />
        <DropdownAccountCardSM />
      </div>
    </div>
  )
}

export default OwnerDashboard
