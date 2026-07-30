export default function StatusCard({ status, color, amount, className = "" }) {
  return(
    <div className={`
      w-full h-max bg-primary border border-border rounded-inner p-4 pt-2
      ${className}
    `}>
      <h2 className={`text-${color} text-sm font-medium`}>{status.charAt(0).toUpperCase() + status.slice(1)}</h2>
      <p className="text-text-primary text-[28px] font-medium">{amount}</p>
    </div>
  )
}