const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate");
const QueryHelper = require("./query.helper");

const LocationSchema = new Schema(
  {
    locationType: {
      type: String,
      enum: ["Day care", "Pre school"],
      required: true
    },
    loc: {
      coordinates: {
        type: [Number],
        required: true
      },
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
        required: true
      }
    }
  },
  {
    timestamps: {
      createdAt: "created_at"
    },
    toJSON: {
      transform: function(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      }
    }
  }
);

LocationSchema.index({ loc: "2dsphere" });

LocationSchema.virtual("id").get(function() {
  return this._id;
});
LocationSchema.plugin(mongoosePaginate);

const Location = (module.exports = mongoose.model("Location", LocationSchema));
module.exports.getLocations = ({ createdAt, type, pageNumber }) => {
  const options = {
    page: parseInt(pageNumber, 10)
  };
  const query = QueryHelper.findLocationList({ createdAt, type });
  return Location.paginate(query, options);
};

module.exports.getNearByLocations = ({ lat, long, type }) => {
  const query = QueryHelper.findNearByPlaces({ lat, long, type });
  return Location.find(query);
};
