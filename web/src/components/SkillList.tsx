export type SkillField = {
  name: string;
  type: string;
  description: string;
};

export type SkillCandidate = {
  id: string;
  name: string;
  description: string;
  inputs: SkillField[];
  outputs: SkillField[];
  implementation: string;
  tags: string[];
};

type SkillListProps = {
  skills: SkillCandidate[];
};

function FieldList({
  label,
  fields,
}: {
  label: string;
  fields: SkillField[];
}) {
  return (
    <section>
      <strong>{label}</strong>
      {fields.length === 0 ? (
        <p>None defined.</p>
      ) : (
        <ul>
          {fields.map((field) => (
            <li key={`${label}-${field.name}`}>
              <strong>{field.name}</strong> ({field.type}) — {field.description}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default function SkillList({ skills }: SkillListProps) {
  if (skills.length === 0) {
    return <p>No generated skills yet. Submit a workflow to see candidate skills here.</p>;
  }

  return (
    <div>
      {skills.map((skill) => (
        <article
          key={skill.id}
          style={{
            border: "1px solid #d0d7de",
            borderRadius: "12px",
            padding: "1rem",
            marginBottom: "1rem",
          }}
        >
          <header>
            <h3>{skill.name}</h3>
            <p>{skill.description}</p>
          </header>
          <FieldList label="Inputs" fields={skill.inputs} />
          <FieldList label="Outputs" fields={skill.outputs} />
          <p>
            <strong>Implementation:</strong> {skill.implementation}
          </p>
          <p>
            <strong>Tags:</strong> {skill.tags.join(", ") || "None"}
          </p>
        </article>
      ))}
    </div>
  );
}
