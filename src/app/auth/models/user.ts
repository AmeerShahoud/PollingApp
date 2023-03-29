export interface User {
  id: string;
  name: string;
  avatarURL: string;
  answers: { [answerId: string]: string };
  questions: string[];
}
