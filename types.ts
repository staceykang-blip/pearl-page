
export interface ProjectData {
  id: string;
  title: string;
  subtitle: string;
  origin: string;
  design: string;
  progress: string;
  expected: string;
  budget: string;
  image: string;
}

export interface BusinessStory {
  id: string;
  category: '美食' | '伴手禮' | '旅宿';
  name: string;
  description: string;
  image: string;
}
