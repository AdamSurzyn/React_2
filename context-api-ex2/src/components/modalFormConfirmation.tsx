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
type ModalProps = {
  onClose: () => boolean;
  isOpen: boolean;
};

const Modal: React.FC<ModalProps> = () => {
  const { showModal, setShowModal } = useModalFormConfirmationContext();
  const handleShowButton = () => {
    setShowModal((showModal) => !showModal);
  };
  return (
    <ChakraModal
      blockScrollOnMount={false}
      isOpen={showModal}
      onClose={handleShowButton}
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
          <Button colorScheme="blue" onClick={handleShowButton}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </ChakraModal>
  );
};

export default Modal;
