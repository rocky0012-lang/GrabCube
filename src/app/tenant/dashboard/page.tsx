import { DropdownAccountCardSM } from "@/components/reusable/account-card"
import LogoutButton from "@/components/reusable/logoutbutton"


const TenantDashboard = () => {
  return (
    <div className="flex flex-col align-center justify-between">
      
        <h1>Tenant Dashboard</h1>
        <p>Hi, welcome to your dashboard!</p>
      
      
        <LogoutButton />
        <DropdownAccountCardSM />
      
    </div>
  )
}

export default TenantDashboard
