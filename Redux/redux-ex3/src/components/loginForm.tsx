import React from "react";
import { Formik, Field } from "formik";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  VStack,
  ChakraProvider,
} from "@chakra-ui/react";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store";
import { Link } from "react-router-dom";
const validationSchema = yup.object().shape({
  login: yup.string().min(5).required("You need to put in your login!"),
  password: yup
    .string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
});

const LoginForm = () => {
  const dispatch = useDispatch();
  const loginState = useSelector(
    (state: { login: { value: boolean } }) => state.login.value
  );
  return (
    <div>
      <ChakraProvider>
        <Flex bg="gray.100" align="center" justify="center" h="100vh">
          <Box bg="white" p={6} rounded="md" w={64}>
            {!loginState ? (
              <Formik
                initialValues={{
                  login: "",
                  password: "",
                }}
                validationSchema={validationSchema}
                onSubmit={async () => {
                  dispatch(login());
                }}
              >
                {({ handleSubmit, errors, touched }) => (
                  <form onSubmit={handleSubmit}>
                    <VStack spacing={4} align="flex-start">
                      <FormControl isInvalid={!!errors.login && touched.login}>
                        <FormLabel htmlFor="login">Login</FormLabel>
                        <Field
                          as={Input}
                          id="login"
                          name="login"
                          type="text"
                          variant="filled"
                        ></Field>
                        <FormErrorMessage>{errors.password}</FormErrorMessage>
                      </FormControl>
                      <FormControl
                        isInvalid={!!errors.password && touched.password}
                      >
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <Field
                          as={Input}
                          id="password"
                          name="password"
                          type="text"
                          variant="filled"
                        ></Field>
                        <FormErrorMessage>{errors.password}</FormErrorMessage>
                      </FormControl>
                      <Button type="submit" colorScheme="purple" width="full">
                        Login
                      </Button>
                    </VStack>
                  </form>
                )}
              </Formik>
            ) : (
              <div>
                <Link to="/">Go to Main page!</Link>
                <Button
                  colorScheme="purple"
                  width="full"
                  onClick={() => dispatch(logout())}
                >
                  Log out
                </Button>
              </div>
            )}
          </Box>
        </Flex>
      </ChakraProvider>
    </div>
  );
};

export default LoginForm;
