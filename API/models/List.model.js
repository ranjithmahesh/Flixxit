import mongoose from "mongoose";

const ListSchma = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
      unique: true,
    },
    type: {
      type: String,
    },
    genre: {
      type: String,
    },
    content: {
      type: Array,
    },
  },
  { timestamps: true }
);

const List = mongoose.model("List", ListSchma);
export default List;
