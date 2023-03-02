const mongoose = require("mongoose");
import {v4 as uuid} from "uuid";
import BaseCurationApplication from "../data/curation-application.json";

const ApplicationConditionSchema = new mongoose.Schema({
  subjectId: String,
  displayIfEquals: mongoose.Schema.Types.Mixed,
});

const ApplicationQuestionSchema = new mongoose.Schema({
  id: {type: String, required: [true, uuid()]},
  type: {type: String, required: [true, "Question"]},
  displayText: {type: String, required: [true, ""]},
  componentType: {
    type: String,
    enum: ["text", "radioBoolean", "select"],
  },
  options: {
    type: [String],
  },
  answer: {
    type: String,
  },
  children: [
    {
      mixed: mongoose.Schema.Types.Mixed,
      // type: [ApplicationSectionSchema] | [ApplicationQuestionSchema],
    },
  ],
  conditions: {
    type: [ApplicationConditionSchema],
  },
});

const ApplicationSectionSchema = new mongoose.Schema({
  id: {type: String, required: [true, uuid()]},
  type: {type: String, required: [true, "Section"]},
  title: String,
  children: [
    {
      mixed: mongoose.Schema.Types.Mixed,
      // type: [ApplicationSectionSchema] | [ApplicationQuestionSchema],
    },
  ],
  conditions: {
    type: [ApplicationConditionSchema],
  },
});

const ApplicationSchema = new mongoose.Schema({
  id: {type: String, required: [true, uuid()]},
  carriers: {type: [String], required: [true, ["chubb"]]},
  content: {
    type: [ApplicationSectionSchema],
    required: [true, BaseCurationApplication],
  },
});

// const DatastoreSchema = new mongoose.Schema({
//   appId: String,
//   app: ApplicationSchema,
// });

const DatastoreObject = mongoose.model("DatastoreObject", ApplicationSchema);
module.exports = DatastoreObject;
