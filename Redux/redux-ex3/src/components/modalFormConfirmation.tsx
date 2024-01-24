import {
  Button,
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
} from "@chakra-ui/react";
import { useModalFormConfirmationContext } from "../contexts/modalFormConfirmationContext";

const ModalForm: React.FC = () => {
  const { showModal, toggleShowModal } = useModalFormConfirmationContext();
  return (
    <ChakraModal
      blockScrollOnMount={false}
      isOpen={showModal}
      onClose={toggleShowModal}
      size="md"
      motionPreset="scale"
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton color="black" />
        <ModalBody>
          <Text>Do you wish to continue?</Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={toggleShowModal}>
            Always
          </Button>
        </ModalFooter>
      </ModalContent>
    </ChakraModal>
  );
};

export default ModalForm;
