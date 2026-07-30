import { Input } from "./inputfield";
import ChangesBox from "./changesbox";

export default function AddChangelogForm({
  ChangelogDetails,
  setChangelogDetails,
  formatToHtmlDate,
  handleDateChange_changelog,
  saveChangelog,
  addNewChanges,
  editChanges,
  deleteChanges,
  getVersionPreview,
}) {
  return (
    <div className="
      w-full h-max p-5 pt-4 rounded-outer bg-secondary border border-border
      lg:p-6 lg:pt-4
    ">
      <h2>Add Changelogs</h2>
      <form className="mt-3 flex flex-col gap-3" onSubmit={saveChangelog}>
        <div className="flex flex-col gap-1 w-full">
          <div className="flex gap-3">
            <Input
              label="Version"
              required
              placeholder="major.minor.patch"
              onChange={(e) => setChangelogDetails({ ...ChangelogDetails, version: e.target.value })}
              value={ChangelogDetails.version}
            />
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="changelog_type" className="text-text-secondary text-sm">
                Type
                <span className="text-danger">*</span>
              </label>
              <select
                name="changelog_type"
                id="changelog_type"
                className={`w-full h-10 px-3 py-0 items-center grid border border-border rounded-inner ${
                  ChangelogDetails.type === "stable" ? "text-text-primary" : "text-warning"
                } bg-transparent`}
                onChange={(e) => setChangelogDetails(prev => ({ ...prev, type: e.target.value }))}
                value={ChangelogDetails.type || "stable"}
              >
                <option value="stable" className="bg-secondary text-text-primary text-sm">Stable</option>
                <option value="beta" className="bg-secondary text-warning text-sm">Beta</option>
              </select>
            </div>
            <Input
              label="Beta Stage"
              value={ChangelogDetails.beta_stage || ""}
              disabled={ChangelogDetails.type == "stable"}
              required={ChangelogDetails.type == "beta"}
              onChange={(e) => setChangelogDetails({ ...ChangelogDetails, beta_stage: e.target.value })}
            />
          </div>
          <span className={`text-text-secondary text-sm ${ChangelogDetails.type === "beta" ? "block" : "hidden"}`}>
            Version Preview: {getVersionPreview()}
          </span>
        </div>

        {/* Date */}
        <Input
          type="date"
          label="Date"
          required
          value={formatToHtmlDate(ChangelogDetails.date)}
          onChange={(e) => handleDateChange_changelog(e.target.value)}
        />

        {/* Changes */}
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="changelog_changes" className="text-text-secondary text-sm">
            Changes
            <span className="text-danger">*</span>
          </label>
          <div className="flex flex-col gap-2">
            {ChangelogDetails.changes.map((change) => (
              <ChangesBox
                key={change.id}
                id={change.id}
                value={change}
                editChanges={editChanges}
                deleteChanges={deleteChanges}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={addNewChanges}
            className="w-full h-9 flex items-center justify-center gap-2 border border-dashed border-border rounded-inner text-text-secondary text-sm transition-all duration-200 hover:border-accent hover:text-accent"
          >
            <span className="text-lg leading-none">+</span>
            Add Change
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full h-10 px-6 bg-accent rounded-inner font-bold text-text-primary mt-1"
        >
          Save Changelog
        </button>
      </form>
    </div>
  );
}
