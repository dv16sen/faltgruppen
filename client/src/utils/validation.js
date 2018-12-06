export const validationActions = {
    addEvent: "addEvent",
    deleteEvent: "deleteEvent",
    updateEvent: "updateEvent"
};

export const getEventErrors = ({gender, location, measure}) => {
    let errors = [];

    if(!gender){
        errors.push("Ett kön måste anges");
    }

    if(!location){
        errors.push("En plats måste anges");
    }

    if(!measure){
        errors.push("En åtgärd måste anges");
    }

    return errors;
};