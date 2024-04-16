import React, { createContext, useState } from 'react';
export const EditContext = createContext();

const EditContextProvider = ({ children }) => {
    const [currentSectionId, setCurrentSectionId] = useState(0);
    return (
        <EditContext.Provider value={{ currentSectionId, setCurrentSectionId }}>
            {children}
        </EditContext.Provider>
    );
};

export default EditContextProvider;
