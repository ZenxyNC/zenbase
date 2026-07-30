export function Input({ name, id, label, type, placeholder, required, className, value, onChange, handleChange, disabled }) {
  
  return (
    <div className={`flex flex-col gap-1 w-full h-full ${disabled ? "opacity-50" : ""}`}>
      <label htmlFor={id} className="text-text-secondary text-sm">
        {label}
        <span className="text-danger">{required ? "*" : ""}</span>
      </label>
      <input 
        type={type || "text"} 
        name={name} 
        id={id} 
        placeholder={placeholder}
        required={required || false}
        value={value}
        onChange={onChange || handleChange}
        disabled={disabled || false}
        className={`w-full h-10 px-3 py-0 border border-border rounded-inner text-text-primary bg-transparent ${className}`}
      />
    </div>
  )
}

export function TextArea({ name, id, label, placeholder, required, className, value, onChange, handleChange }) {
  
  return (
    <div className="flex flex-col gap-1 w-full h-full">
      <label htmlFor={id} className="text-text-secondary text-sm">
        {label}
        <span className="text-danger">{required ? "*" : ""}</span>
      </label>
      <textarea 
        name={name} 
        id={id} 
        placeholder={placeholder}
        required={required || false}
        value={value}
        onChange={onChange || handleChange}
        className={`h-full resize-none px-3 py-2 border border-border rounded-inner text-text-primary bg-transparent ${className}`}
      />
    </div>
  )
}