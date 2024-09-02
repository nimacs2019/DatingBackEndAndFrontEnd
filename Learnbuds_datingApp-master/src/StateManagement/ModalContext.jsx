import { createContext, useState } from "react";

// Create the ModalContext
const ModalContext = createContext();

// Create the ModalProvider component
const ModalProvider = ({ children }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pageName, setPageName] = useState("Page name");

    // Function to toggle the modal open/closed
    const toggleModal = () => {
        setIsModalOpen((prev) => !prev);
    };

    // Function to change the page name and close the modal
    const handlePageNameChange = (name) => {
        setPageName(name);
        setIsModalOpen(false);
    };

    // Provide context values to children components
    return (
         <ModalContext.Provider value={{ isModalOpen, pageName, toggleModal, handlePageNameChange }}> 
            {children}
        </ModalContext.Provider>
    );
};

// Export the context and provider
export { ModalContext, ModalProvider };





























