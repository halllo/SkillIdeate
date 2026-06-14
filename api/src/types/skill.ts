export interface SkillField {
  name: string;
  type: string;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  description: string;
  inputs: SkillField[];
  outputs: SkillField[];
  implementation: string;
  tags: string[];
}
