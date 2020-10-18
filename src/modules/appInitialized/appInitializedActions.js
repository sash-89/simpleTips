export const INITIALIZED = {
    SUCCESSFULLY: 'INITIALIZED.SUCCESSFULLY',
    ADMIN_INITIALIZING: 'INITIALIZED.ADMIN_INITIALIZING',
};

export const initialization = () => ({
    type: INITIALIZED.SUCCESSFULLY,
});


//sagaActions
export const adminInitializing = () => ({
    type: INITIALIZED.ADMIN_INITIALIZING,
});