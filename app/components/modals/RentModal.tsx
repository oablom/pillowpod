import { use } from "react";
import Modal from "./Modal";
import useRentModal from "@/app/hooks/useRentmodal";

const RentModal = () => {
  const rentModal = useRentModal();
  return (
    <Modal
      isOpen={rentModal.isOpen}
      title="Rent your pod"
      onClose={rentModal.onClose}
      onSubmit={rentModal.onClose}
      actionLabel="Submit"
    />
  );
};

export default RentModal;
