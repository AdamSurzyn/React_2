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
  Tag,
} from "@chakra-ui/react";
import * as yup from "yup";
import { useNotificationsContext } from "../contexts/notificationContext";
import NotificationCount from "./notificationCount";
import { useModalFormConfirmationContext } from "../contexts/modalFormConfirmationContext";
import ModalForm from "./modalFormConfirmation";
import { Link } from "react-router-dom";
const phoneRegexp = /^\+\d{11}$/;
const validationSchema = yup.object().shape({
  name: yup.string().min(5).required("This field is mendatory!"),
  age: yup.number().min(18).max(99).required("This field is mendatory!"),
  city: yup.string().min(3).required("This field is mendatory!"),
  volountary: yup.boolean().required("This field is mendatory!"),
  imglink: yup.string(),
  phonenumber: yup
    .string()
    .matches(
      phoneRegexp,
      "Phone number must start with a + sign and be 11 characters long"
    ),
});

type postValues = {
  name: string;
  age: number;
  city: string;
  volountary?: boolean;
  imglink?: string;
  phonenumber: number;
};
//! Powinienem wyimportowac ten typ, bo go juz mam.
const fetchLogic = async (values: postValues) => {
  await fetch(`http://localhost:8000/people`, {
    method: "POST",
    headers: {
      "Content-type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify(values),
  });
};

const InputForm = () => {
  const { dispatch } = useNotificationsContext();
  const { toggleShowModal } = useModalFormConfirmationContext();
  return (
    <div>
      <ModalForm></ModalForm>
      <NotificationCount></NotificationCount>
      <ChakraProvider>
        <Flex bg="gray.100" align="center" justify="center" h="100vh">
          <Box bg="white" p={6} rounded="md" w={64}>
            <Tag colorScheme="purple" variant="solid">
              <Link to="login">Log in First!</Link>
            </Tag>

            <Formik
              initialValues={{
                name: "",
                age: 0,
                city: "",
                volountary: false,
                imglink: "",
                phonenumber: 0,
              }}
              validationSchema={validationSchema}
              onSubmit={async (values) => {
                //! Jako, ze aplikacja jest na porcie 3000, uzywam portu 8000
                toggleShowModal();
                fetchLogic(values);
                dispatch({ type: "INCREMENT" });
              }}
            >
              {({ handleSubmit, errors, touched }) => (
                <form onSubmit={handleSubmit}>
                  <VStack spacing={4} align="flex-start">
                    <FormControl isInvalid={!!errors.name && touched.name}>
                      <FormLabel htmlFor="name">Name</FormLabel>
                      <Field
                        as={Input}
                        id="name"
                        name="name"
                        type="text"
                        variant="filled"
                      ></Field>
                      <FormErrorMessage>{errors.name}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!!errors.age && touched.age}>
                      <FormLabel htmlFor="age">Age</FormLabel>
                      <Field
                        as={Input}
                        id="age"
                        name="age"
                        type="number"
                        variant="filled"
                      ></Field>
                      <FormErrorMessage>{errors.age}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!!errors.city && touched.city}>
                      <FormLabel htmlFor="city">City</FormLabel>
                      <Field
                        as={Input}
                        id="city"
                        name="city"
                        type="text"
                        variant="filled"
                      ></Field>
                      <FormErrorMessage>{errors.city}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!!errors.city && touched.city}>
                      <FormLabel htmlFor="volountary">Volounteer</FormLabel>
                      <Field
                        id="volountary"
                        name="volountary"
                        type="checkbox"
                      ></Field>
                      <FormErrorMessage>{errors.volountary}</FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={!!errors.imglink && touched.imglink}
                    >
                      <FormLabel htmlFor="imglink">Img Link</FormLabel>
                      <Field
                        as={Input}
                        id="imglink"
                        name="imglink"
                        type="text"
                        variant="filled"
                      ></Field>
                      <FormErrorMessage>{errors.imglink}</FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={!!errors.phonenumber && touched.phonenumber}
                    >
                      <FormLabel htmlFor="phonenumber">Phone Number</FormLabel>
                      <Field
                        as={Input}
                        id="phonenumber"
                        name="phonenumber"
                        type="text"
                        variant="filled"
                      ></Field>
                      <FormErrorMessage>{errors.phonenumber}</FormErrorMessage>
                    </FormControl>
                    <Button type="submit" colorScheme="purple" width="full">
                      Submit!
                    </Button>
                  </VStack>
                </form>
              )}
            </Formik>
          </Box>
        </Flex>
      </ChakraProvider>
    </div>
  );
};

export default InputForm;
