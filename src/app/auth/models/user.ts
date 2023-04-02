export interface UserPollData {
  answers: { [questionsId: string]: "optionOne" | "optionTwo" };
  questions: string[];
}
export interface User extends UserPollData {
  id: string;
  name: string;
  avatarURL: string;
}
