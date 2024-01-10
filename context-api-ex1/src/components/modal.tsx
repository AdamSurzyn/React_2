import React from "react";
import {
  Button,
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
} from "@chakra-ui/react";

type ModalProps = {
  message: string;
  type: string;
  time: string;
  onClose: () => void;
  isOpen: boolean;
};

const Modal: React.FC<ModalProps> = ({
  message,
  type,
  time,
  onClose,
  isOpen,
}) => {
  return (
    <ChakraModal
      blockScrollOnMount={false}
      isOpen={isOpen}
      onClose={onClose}
      size="md"
      motionPreset="scale"
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader borderBottomWidth="1px">{type}</ModalHeader>
        <ModalCloseButton color="black" />
        <ModalBody>
          <Text fontWeight="bold" mb="1rem">
            {message}
          </Text>
          <Text>{time}</Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={onClose}></Button>
        </ModalFooter>
      </ModalContent>
    </ChakraModal>
  );
};

export default Modal;
