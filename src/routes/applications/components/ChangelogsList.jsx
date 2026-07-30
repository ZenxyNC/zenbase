import ChangelogBox from "./changelogbox";

export default function ChangelogsList({ changelogs, formatChangelogDate }) {
  return (
    <div className="
      w-full h-max p-5 pt-4 rounded-outer bg-secondary border border-border
      lg:p-6 lg:pt-4
    ">
      <h2>Changelogs</h2>
      <div className="flex flex-col-reverse gap-3 mt-4">
        {changelogs.map((change) => (
          <ChangelogBox
            key={change.version}
            version={change.version}
            date={formatChangelogDate(change.date)}
            isBeta={change.type === "beta"}
          >
            <ul className="list-disc ml-7">
              {change.changes.map((change, index) => (
                <li key={index}>{change}</li>
              ))}
            </ul>
          </ChangelogBox>
        ))}
      </div>
    </div>
  );
}
