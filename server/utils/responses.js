function successResponse(status = false, result = [], res) {
    if (status !== false) {
        res
            .status(200)
            .json({ status: true, statusCode: 200, message: "success", payload: result });

    } else {
        res
            .status(200)
            .json({ status: false, statusCode: 200, message: "success", payload: "No Data Found!" });


    }

}

function BadRequestResponse(result, res) {
    res
        .status(400)
        .json({ status: false, statusCode: 400, message: message = "Bad Request", error: result });
}

function serverFailureResponse(result, res) {
    res
        .status(500)
        .json({
            status: false,
            statusCode: 500,
            message: "Internal Server Error!",
            error: result,
        });
}

function dbError(err, res) {
    res.status(533).json({ status: false, statusCode: 533, message: 'Mysql_db Error!', error: err });
}

module.exports = {
    successResponse,
    BadRequestResponse,
    serverFailureResponse,
    dbError
};