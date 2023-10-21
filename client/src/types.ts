export type User = {
  role: any;
  id: string;
  name: string;
  email: string;
  imgSrc?: string;
};

export type Question = {
  _id: any;
  id?: string;
  title: string;
  difficulty: QuestionDifficulty;
  tags: QuestionTag[];
  description: QuestionDescription;
  examples: QuestionExample[];
  constraints: QuestionConstraint[];
  createdAt?: Date;
  updatedAt?: Date;
};

export type QuestionDifficulty = 'EASY' | 'MEDIUM' | 'HARD';

export type QuestionTag = string;

export type QuestionDescription = string;

export type QuestionExample = {
  in: string;
  out: string;
  explanation: string;
};

export type QuestionConstraint = string;

export type StatusType = 'DEFAULT' | 'LOADING' | 'SUCCESS' | 'ERROR';
