import PropTypes from "prop-types";
import {validationActions} from "../../utils/validation";

const actions = [...Object.values(validationActions), ""];

export const validationProps = {
    validation: PropTypes.shape({
        setLoadingState: PropTypes.func.isRequired,
        setErrorState: PropTypes.func.isRequired,
        setCompletedActionState: PropTypes.func.isRequired,
        resetState: PropTypes.func.isRequired,
        state: PropTypes.shape({
            errors: PropTypes.array.isRequired,
            loading: PropTypes.bool.isRequired,
            completedAction: PropTypes.oneOf(actions).isRequired
        }).isRequired,
    }).isRequired
};