import { type ReactNode, useState, useRef } from "react";
import { ProjectContext } from "./context.tsx";
import { signupUser, loginUser } from "../Services/authService";
import {
  createComplain,
  getComplains,
  adminComplains,
  adminReply,
  complainDelete,
  accessComapanyList,
} from "../Services/complainService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { type ComplainStore } from "../Types/complainTypes.ts";
import isTokenExpired from "../Services/jwtToken.ts";
// IT is for children type
interface ProjectContextChild {
  children: ReactNode;
}
export interface Complaint {
  _id: string;
  title: string;
  description: string;
  date: string;
  status: number;
  reply?: string;
}
export const ProjectProvider = ({ children }: ProjectContextChild) => {
  const [data, setData] = useState<ComplainStore[]>([]);
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [submit, setSubmit] = useState(false); //Form Data
  const role = useRef("User");
  const reply = useRef<HTMLTextAreaElement | null>(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  //Complain Form
  const [complainForm, setComplainForm] = useState({
    title: "",
    date: "",
    description: "",
    contractNumber: "",
    status: 0,
    company: "",
    product: "",
  });
  //Navigate
  const navigate = useNavigate();

  // Handle Change
  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  //
  //adminComplain
  const adminComplain = async (e: React.FormEvent) => {
    e.preventDefault();
    const token: string | null = localStorage.getItem("cm");
    try {
      if (!token) {
        toast.error("Go for Login", {
          position: "top-center",
          className: "toast-message",
        });
        return;
      }
      const result = await adminComplains(token);
      setComplaints(
        result.map((complain: any) => {
          return {
            _id: complain._id,
            title: complain.title,
            status: complain.status,
            description: complain.description,
            date: complain.date,
            reply: complain.reply,
            //company: complain.company,
          };
        }),
      );
      toast.success("Welcome on Admin Panel.", {
        position: "top-center",
        className: "toast-message",
      });
      navigate("/admin");
    } catch (error: any) {
      toast.error(error, {
        position: "top-center",
        className: "toast-message",
      });
    }
  };
  //
  //Submit
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmit(true);
    try {
      const result = await signupUser(formData);

      toast.success(result.message, {
        position: "top-center",
        className: "toast-message",
      });
      localStorage.setItem("cm", result.token);
      setFormData({
        username: "",
        email: "",
        password: "",
      });
      setSubmit(false);
      navigate("/home", { replace: true });
    } catch (error) {
      toast.error("Server Error", {
        position: "top-center",
        className: "toast-message",
      });
      setSubmit(false);
    }
  };
  //
  //Handle Reply
  const handleReply = async (
    id: string,
    e: React.FormEvent,
    oldReply?: string,
  ) => {
    e.preventDefault();
    try {
      const token: string | null = localStorage.getItem("cm");
      if (!token) {
        toast.error("You are not login", {
          position: "top-center",
          className: "toast-message",
        });
      }
      if (!reply.current) {
        toast.error("Error Reply is Empty . \n Please reply again.", {
          position: "top-center",
          className: "toast-message",
        });
        return;
      } else {
        let ans = reply.current.value;
        if (oldReply != "" && oldReply != null) {
          ans = oldReply + "\n" + ans;
        }
        const response = await adminReply(ans, token, id);
        console.log(response.message);
        toast.success(response.message, {
          position: "top-center",
          className: "toast-message",
        });
      }
    } catch (error) {
      toast.error("Error : " + error, {
        position: "top-center",
        className: "toast-message",
      });
      return;
    }
  };
  //
  //Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmit(true);
    try {
      const result = await loginUser(formData);
      toast.success(result.message, {
        position: "top-center",
        className: "toast-message",
      });
      localStorage.setItem("cm", result.token);
      role.current = result.role;
      setFormData({ username: "", email: "", password: "" });
      setSubmit(false);
      navigate("/home", { replace: true });
    } catch (error: any) {
      toast.error(error.message, {
        position: "top-center",
        className: "toast-message",
      });
      setSubmit(false);
    }
  };
  //
  //Complain
  const submitComplain = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmit(true);
    const token = localStorage.getItem("cm");
    if (!token) {
      setSubmit(false);
      toast.error("You are not authenticated, Go for Login OR Signup", {
        position: "top-center",
        className: "toast-message",
      });
      navigate("/home", { replace: true });
      return;
    }
    try {
      console.log(complainForm);
      const result = await createComplain(complainForm, token);
      toast.success(result.message, {
        position: "top-center",
        className: "toast-message",
      });
      setComplainForm({
        title: "",
        date: "",
        description: "",
        contractNumber: "",
        status: 0,
        company: "",
        product: "",
      });
      setSubmit(false);
      navigate("/home");
    } catch (error) {
      toast.error(String(error), {
        position: "top-center",
        className: "toast-message",
      });
      setSubmit(false);
    }
  };

  //
  //Dashboard
  const accessComplain = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("cm");

    if (!token) {
      toast.error("You are not authenticated", {
        position: "top-center",
        className: "toast-message",
      });
      navigate("/home", { replace: true });
      return;
    }

    try {
      const result = await getComplains(token);
      let count: number = 1;

      const complainData: ComplainStore[] = result.map((complain: any) => ({
        date: complain.date,
        title: complain.title,
        description: complain.description,
        status: complain.status,
        index: count++,
        reply: complain.reply,
        id: complain._id,
        company: complain.company,
        product: complain.product,
      }));

      setData(complainData);
      navigate("/dashboard", { replace: true });
    } catch (error: any) {
      toast.error(error.message, {
        position: "top-center",
        className: "toast-message",
      });
    }
  };
  //   //
  //   //Delete Complain

  const deleteComplain = async (id: string) => {
    const token = localStorage.getItem("cm");
    if (!token) {
      toast.error("You are not authenticated", {
        position: "top-center",
        className: "toast-message",
      });
      navigate("/home", { replace: true });
      return;
    } else {
      try {
        let response: any = await complainDelete(id, token);
        if (response) {
          // Update the local state to remove the deleted complain
          setData((prevData) =>
            prevData.filter((complain) => complain.id !== id),
          );
          toast.success("Complain deleted successfully", {
            position: "top-center",
            className: "toast-message",
          });
          navigate("/dashboard", { replace: true });
        } else {
          toast.error("Failed to delete complain: " + response.message, {
            position: "top-center",
            className: "toast-message",
          });
        }
      } catch (error) {
        toast.error("Error deleting complain: " + error, {
          position: "top-center",
          className: "toast-message",
        });
      }
    }
  };

  const accessCompany = async (): Promise<{ _id: string; name: string }[]> => {
    const token = localStorage.getItem("cm");
    if (!token || isTokenExpired(token)) {
      toast.error("Please sign up or log in before registering a complaint.", {
        position: "top-center",
        className: "toast-message",
      });
      navigate("/home", { replace: true });
      return [];
    }
    try {
      let response: any = await accessComapanyList(token);
      if (response && response.company) {
        return response.company;
      } else {
        throw new Error("Failed to fetch company list: " + response.message);
      }
    } catch (error) {
      toast.error("Error fetching company list: " + error, {
        position: "top-center",
        className: "toast-message",
      });
      return [];
    }
  };
  return (
    <ProjectContext.Provider
      value={{
        formData,
        setFormData,
        handleSignup,
        handleOnChange,
        handleLogin,
        complainForm,
        setComplainForm,
        submitComplain,
        accessComplain,
        data,
        submit,
        role,
        adminComplain,
        complaints,
        reply,
        handleReply,
        deleteComplain,
        accessCompany,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
