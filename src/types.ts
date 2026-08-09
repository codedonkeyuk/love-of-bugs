export interface Sample {
  label: string;
  bugCount: number;
  src: string;
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
