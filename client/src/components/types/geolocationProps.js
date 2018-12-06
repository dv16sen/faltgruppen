import PropTypes from "prop-types";

export const geolocationProps = {
    geolocation: PropTypes.shape({
        geocode: PropTypes.shape({
            results: PropTypes.array.isRequired
        }).isRequired,
        loading: PropTypes.bool.isRequired,
        available: PropTypes.bool,
        error: PropTypes.string,
        position: PropTypes.shape({
            coords: PropTypes.shape({
                latitude: PropTypes.number,
                longitude: PropTypes.number
            }),
            timestamp: PropTypes.number
        })
    })
};