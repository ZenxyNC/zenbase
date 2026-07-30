import React from 'react'

export default function ChangelogBox({ version = "0.0.0", date = "Sep 29, 1998", children }) {
  const isBeta = version.includes("beta")

  return (
    <div className={`
      ${isBeta ? 'border border-warning' : 'border border-border'} w-full h-max p-5 rounded-inner bg-primary flex flex-col gap-2
    `}>
      <div className="flex flex-row justify-between items-center px-4">
        <span className={`text-lg font-bold ${isBeta ? 'text-warning' : 'text-text-primary'}`}>{version}</span>
        <span className={`text-sm font-medium ${isBeta ? 'text-warning/40' : 'text-text-secondary'}`}>{date}</span>
      </div>
      <div className='w-full h-px bg-border rounded-full'></div>
      <div>
        {children}
      </div>
    </div>
  )
}