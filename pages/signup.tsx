import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  Heading,
  VStack,
  Text,
  Center,
  Alert,
  AlertIcon,
  AlertTitle,
  Select,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../context/AuthContext";
import { NewUser, SignUpCredentials } from "../types/user";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { LINEAGE } from "../utils/lineage";

const newUserSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  middleName: yup.string(),
  lastName: yup.string().required("Last name is required"),
  yearCrossed: yup.string().required("Year of when you crossed is required"),
  lineName: yup.string(),
  lineNumber: yup.number().required("Line number is required"),
  shipName: yup.string().required("Ship name is required"),
  phoneNumber: yup.string().required("Phone number is required"),
  location: yup.string(),
  jobTitle: yup.string(),
  company: yup.string(),
  klub: yup.string(),
});

const signUpSchema = yup.object().shape({
  email: yup.string().required("Email Address is required"),
  password: yup.string().required("Password required"),
  confirmPassword: yup.string().required("Please Confirm Password"),
});

const newUserFormFields = [
  { label: "First Name", name: "firstName", type: "text", required: true },
  { label: "Middle Name", name: "middleName", type: "text", required: false },
  { label: "Last Name", name: "lastName", type: "text", required: true },
  {
    label: "Year of When You Crossed",
    name: "yearCrossed",
    type: "select",
    options: LINEAGE,
    required: true,
  },
  { label: "Line Name", name: "lineName", type: "text", required: false },
  { label: "Line Number", name: "lineNumber", type: "number", required: true },
  { label: "Ship Name", name: "shipName", type: "text", required: true },
  { label: "Klub(s)", name: "klub", type: "text", required: false },
  { label: "Phone Number", name: "phoneNumber", type: "text", required: true },
  { label: "Location", name: "location", type: "text", required: false },
  { label: "Job Title", name: "jobTitle", type: "text", required: false },
  { label: "Company", name: "company", type: "text", required: false },
];

const signUpFormFields = [
  { label: "Email", name: "email", type: "email", required: true },
  { label: "Password", name: "password", type: "password", required: true },
  {
    label: "Confirm Password",
    name: "confirmPassword",
    type: "password",
    required: true,
  },
];

const NewUserForm = ({ handleSubmit, onSubmit, register, logout, errors }) => (
  <form onSubmit={handleSubmit(onSubmit)}>
    <VStack gap={4}>
      {newUserFormFields.map((field) => (
        <FormControl key={field.name} isRequired={field.required}>
          <FormLabel>{field.label}</FormLabel>
          {field.type === "text" && (
            <Input type={field.type} {...register(field.name as any)} />
          )}
          {field.type === "number" && (
            <Input type={field.type} {...register(field.name as any)} />
          )}
          {field.type === "select" && (
            <Select {...register(field.name as any)}>
              {field.options.map((option) => (
                <option key={option.name} value={option.name}>
                  {option.name}
                </option>
              ))}
            </Select>
          )}
        </FormControl>
      ))}

      {errors.message && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>{errors.message}</AlertTitle>
        </Alert>
      )}
      <Button type="submit">Sign Up</Button>
      <Button onClick={logout}>Go Back</Button>
    </VStack>
  </form>
);

const SignUpForm = ({
  handleSubmit,
  onSubmit,
  register,
  signInWithGoogle,
  errors,
}) => (
  <VStack gap={4}>
    <form>
      <VStack gap={4}>
        {signUpFormFields.map((field) => (
          <FormControl key={field.name} isRequired={field.required}>
            <FormLabel>{field.label}</FormLabel>
            <Input type={field.type} {...register(field.name as any)} />
          </FormControl>
        ))}
        {errors.message && (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>{errors.message}</AlertTitle>
          </Alert>
        )}
        <Button onClick={handleSubmit(onSubmit)}>Sign Up With Email</Button>
      </VStack>
    </form>
    <Button onClick={signInWithGoogle}>Sign Up with Google</Button>
  </VStack>
);

export default function SignUp() {
  const router = useRouter();
  const [apiError, setApiError] = useState(null);
  const {
    register: newUserRegister,
    handleSubmit: newUserHandleSubmit,
    formState: { errors: newUserErrors },
  } = useForm({
    resolver: yupResolver(newUserSchema),
  });

  const {
    register: signUpRegister,
    handleSubmit: signUpHandleSubmit,
    formState: { errors: signUpErrors },
  } = useForm({
    resolver: yupResolver(signUpSchema),
  });

  const { user, authUser, signUp, createUser, signInWithGoogle, logout } =
    useAuth();

  const onSignUpSubmit = async (data: SignUpCredentials) => {
    console.log({ data });
    try {
      await signUp(data);
    } catch (error) {
      setApiError(error);
    }
  };

  const onNewUserSubmit = async (data: NewUser) => {
    console.log({ data });
    try {
      await createUser(data);
    } catch (error) {
      setApiError(error);
    }
  };

  useEffect(() => {
    if (user && user.verified) {
      router.push("/dashboard");
    } else if (user) {
      router.push("/waiting-for-verification");
      logout();
    }
  }, [user]);

  console.log({ signUpErrors, newUserErrors });

  return (
    <Box p={8}>
      <Heading mb={4}>Sign Up</Heading>
      <Center>
        <VStack gap={4}>
          {!!authUser ? (
            <NewUserForm
              handleSubmit={newUserHandleSubmit}
              onSubmit={onNewUserSubmit}
              register={newUserRegister}
              logout={logout}
              errors={newUserErrors || apiError}
            />
          ) : (
            <SignUpForm
              handleSubmit={signUpHandleSubmit}
              onSubmit={onSignUpSubmit}
              register={signUpRegister}
              signInWithGoogle={signInWithGoogle}
              errors={signUpErrors || apiError}
            />
          )}
          <Text>
            Already have an account? Click{" "}
            <Link href={"/signin"} style={{ textDecoration: "underline" }}>
              here
            </Link>{" "}
            to sign in
          </Text>
        </VStack>
      </Center>
    </Box>
  );
}
