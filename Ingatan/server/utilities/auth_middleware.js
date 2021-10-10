const jwt = require('jsonwebtoken');

// melakukan decrypt agar token jwt yang dimiliki user dapat dikenali
const auth_middleware = async (request, response, next) => {
    try {
        const token = request.headers.authorization.split(' ')[1];
        // apabila panjang token lebih dari 500 maka token berasal dari google login
        // apablia panjang token kurang dari 500 maka token berasal dari server ini
        const isCustomToken = token.length < 500;

        let decodedData;
        if (!token) {
            const error = 'midError';
            next(error);
        } else if (token && isCustomToken) {
            // melakukan decrypt token yang dibuat oleh server
            decodedData = jwt.verify(token, process.env.JWT_SECRET);

            request.userId = decodedData.Id;
            request.username = decodedData.username;
            next();
        } else {
            // melakukan decrypt token yang dibuat oleh google login
            decodedData = jwt.decode(token);

            request.userId = decodedData.sub;
            request.username = decodedData.name;
            next();
        };
    } catch (error) {
        next(error);
    };
};

module.exports = auth_middleware;