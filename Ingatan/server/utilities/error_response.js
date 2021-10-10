const error_response = (error, request, response) => {
    if (error.name === 'CastError') {
        return response.status(404).json({ response: { status: false, message: 'Resource Not Found' } });
    };
    if (error.name === 'ValidationError') {
        return response.status(400).json({ response: { status: false, message: 'Validation Error' } });
    };
    if (error.name === 'MongoError' && error.code === 11000) {
        return response.status(400).json({ response: { status: false, message: 'Duplicate Field Value Entered' } });
    };
    if (error === 'MiddError') {
        return response.status(403).json({ response: { status: false, message: 'Forbidden' } });
    };
    return response.status(500).json({ response: { status: false, message: 'Something Went Wrong' } });
};

module.exports = error_response;