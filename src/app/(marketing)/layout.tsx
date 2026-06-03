import { ReactNode } from 'react'

const MarketingLayout = ({children} : {children: ReactNode}) => {
  return (
    <div className="flex flex-1 flex-col">
      {children}
    </div>
  )
}

export default MarketingLayout
