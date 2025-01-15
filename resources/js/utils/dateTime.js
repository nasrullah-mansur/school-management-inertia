import moment from "moment";

function getDate() {
    return moment(sector.created_at).format("MMM-D-YYYY, h:mm A");
}

function getDateTime() {
    return moment(sector.created_at).format("MMM-D-YYYY, h:mm A");
}

export { getDate, getDateTime };
