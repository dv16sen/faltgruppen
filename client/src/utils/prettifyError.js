export const prettifyError = (err) => {
    if(err.message){
        return err.message;
    }

    return err.toString();
};