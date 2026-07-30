import { Input } from "./inputfield";
import { TbTrash } from "react-icons/tb";

export default function ChangesBox({ id, value, editChanges, deleteChanges }) {
  return (
    <div className="w-full h-max flex items-end gap-3">
      <Input
        value={value.description}
        className="w-full!"
        onChange={(e) => editChanges(id, e.target.value)}
      />
      <button className="
        shrink-0 w-10! h-10! border border-dashed border-border bg-transparent text-danger flex items-center justify-center rounded-inner transition-all duration-200
        hover:border-danger
      "
        type="button"
        onClick={() => deleteChanges(id)}
      >
        <TbTrash className="text-inherit" size={20} />
      </button>
    </div>   
  )
}