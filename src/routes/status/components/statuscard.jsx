
export default function StatusCard({ children }) {
  return (
    <div className="
      w-full min-w-full shrink-0 snap-start h-full min-h-20 bg-secondary border border-border rounded-outer p-5 pt-4
      md:min-w-0 md:shrink md:p-6 md:pt-4
    ">
      {children}
    </div>
  )
}
