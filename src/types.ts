export interface Bug {
  id: string;
  label: string;
  subcategory: BugSubcategory;
  bugCount: number;
  src: string;
  size?: string;
}

export interface BugCategory {
  name: string;
  description: string;
}

export interface BugSubcategory {
  name: string;
  description: string;
  bugCategory: BugCategory;
}

export interface AssistantMessage {
  message: string;
  emotion: "happy" | "shocked";
  trigger?: () => void;
  buttons?: { name: string; location: string }[];
}
