import React, { useState } from "react";
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
  Center,
} from "@chakra-ui/react";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { increase, decrease } from "../store";
const validationSchema = yup.object().shape({
  pay: yup.number().positive(),
});

const BankingForm = () => {
  const dispatch = useDispatch();
  const bankState = useSelector(
    (state: { bank: { amount: number } }) => state.bank.amount
  );
  const [payState, setPayState] = useState<"inc" | "dec" | "">("");
  const setDecState = () => {
    setPayState("dec");
  };
  const setIncState = () => {
    setPayState("inc");
  };

  return (
    <div>
      <ChakraProvider>
        <Flex bg="gray.100" align="center" justify="center" h="100vh">
          <Box bg="white" p={6} rounded="md" w={64}>
            <Center>
              <div>{bankState}</div>
            </Center>
            <Formik
              initialValues={{
                pay: 0,
              }}
              validationSchema={validationSchema}
              onSubmit={async (values) => {
                if (payState === "inc") {
                  dispatch(increase(values.pay));
                } else if (payState === "dec") {
                  dispatch(decrease(values.pay));
                } else {
                  throw new Error("No pay state set");
                }
              }}
            >
              {({ handleSubmit, errors, touched }) => (
                <form onSubmit={handleSubmit}>
                  <VStack spacing={4} align="flex-start">
                    <FormControl isInvalid={!!errors.pay && touched.pay}>
                      <FormLabel htmlFor="pay">Pay </FormLabel>
                      <Field
                        as={Input}
                        id="pay"
                        name="pay"
                        type="number"
                        variant="filled"
                      ></Field>
                      <FormErrorMessage>{errors.pay}</FormErrorMessage>
                    </FormControl>
                    <Button
                      type="submit"
                      onClick={setDecState}
                      colorScheme="red"
                      width="full"
                    >
                      Pay Out
                    </Button>
                    <Button
                      type="submit"
                      onClick={setIncState}
                      colorScheme="green"
                      width="full"
                    >
                      Pay In
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

export default BankingForm;
