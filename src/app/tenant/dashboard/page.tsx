import { DropdownAccountCardSM } from "@/components/reusable/account-card"
import LogoutDialog from "@/components/reusable/logout-dialog";

const TenantDashboard = () => {
  return (
    <div className="flex flex-col items-center justify-between">
      
        <h1>Tenant Dashboard</h1>
        <p>Hi, welcome to your dashboard!</p>
      
      
        <LogoutDialog
          redirectTo="/sign-in" 
        />
        <DropdownAccountCardSM 
          redirectTo="/sign-in"
        />
      
    </div>
  )
}

export default TenantDashboard
