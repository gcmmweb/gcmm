import { StaffCard, type StaffMember } from "./staff-card"

interface StaffGridProps {
  members: StaffMember[]
  className?: string
}

export function StaffGrid({ members, className = "" }: StaffGridProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${className}`}>
      {members.map((member, index) => (
        <StaffCard key={index} member={member} />
      ))}
    </div>
  )
}
