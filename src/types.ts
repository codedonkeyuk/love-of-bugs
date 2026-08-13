export interface Sample {
  id: string;
  label: string;
  bugCount: number;
  src: string;
  size?: string;
}

export interface BugCategory {
  name: string;
  description: string;
  subcategories: {
    name: string;
    description: string;
    samples: Sample[];
  }[];
}

export interface AssistantMessage {
  message: string;
  emotion: "happy" | "shocked";
  trigger?: () => void;
  buttons?: { name: string; location: string }[];
}
