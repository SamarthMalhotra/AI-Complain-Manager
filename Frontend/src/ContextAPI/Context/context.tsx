import { createContext, type RefObject } from "react";
import { type Complaint } from "./provider";
import { type ComplainStore } from "../Types/complainTypes";
//Form signup
type signupForm = {
  username: string;
  email: string;
  password: string;
};
type complain = {
  company: string;
  title: string;
  product: string;
  date: string;
  description: string;
  contractNumber: string;
  status: number;
};
interface ProjectContextType {
  //All the state and function come in it.
  formData: signupForm;
  setFormData: React.Dispatch<React.SetStateAction<signupForm>>;
  handleSignup: (e: React.FormEvent) => void;
  handleLogin: (e: React.FormEvent) => void;
  handleOnChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  complainForm: complain;
  setComplainForm: React.Dispatch<React.SetStateAction<complain>>;
  submitComplain: (e: React.FormEvent) => void;
  accessComplain: (e: React.FormEvent) => void;
  data: Array<ComplainStore>;
  submit: boolean;
  role: RefObject<string>;
  adminComplain: (e: React.FormEvent) => void;
  complaints: Complaint[];
  reply: RefObject<HTMLTextAreaElement | null>;
  handleReply: (id: string, e: React.FormEvent, oldReply?: string) => void;
  deleteComplain: (id: string) => void;
  accessCompany: () => Promise<Array<{ _id: string; name: string }>>;
}
export const ProjectContext = createContext<ProjectContextType | null>(null);
