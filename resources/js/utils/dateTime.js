import moment from "moment";

function getDate(date) {
    return moment(date).format("D-MMM-YYYY");
}

function getDateTime(date) {
    return moment(date).format("D-MMM-YYYY, h:mm A");
}

export { getDate, getDateTime };
