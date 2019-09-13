const moment = require("moment");

module.exports.findNearByPlaces = ({ type, lat, long }) => {
  return {
    locationType: type,
    loc: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [parseFloat(long), parseFloat(lat)]
        },
        $maxDistance: 10000 // 10 Kms in meters
      }
    }
  };
};

module.exports.findLocationList = ({ type, createdAt }) => {
  let filterObj = {};
  if (type) {
    filterObj.locationType = type;
  }
  if (createdAt) {
    filterObj.created_at = {
      $gte: moment(createdAt)
        .startOf("day")
        .utc()
        .toDate(),
      $lte: moment(createdAt)
        .endOf("day")
        .utc()
        .toDate()
    };
  }
  return {
    ...filterObj
  };
};
