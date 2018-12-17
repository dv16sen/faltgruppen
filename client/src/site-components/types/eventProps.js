import PropTypes from "prop-types";
import {validationProps} from "./validationProps";

export const eventProps = {
    events: PropTypes.shape({
        onAdd: PropTypes.func.isRequired,
        onUpdate: PropTypes.func.isRequired,
        onDelete: PropTypes.func.isRequired,
        entries: PropTypes.array.isRequired,
        locations: PropTypes.array.isRequired,
        eventToEdit: PropTypes.object,
        ...validationProps.validation.state
    })
};