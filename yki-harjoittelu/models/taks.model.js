import mongoose from 'mongoose';
import { wordTypes } from '../constants';

const taskSchema = new mongoose.Schema(
  {
    study_tasks: [
      {
        wordId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Localization_Key_Values'
        },
        count: {
          type: Number,
          default: 0
        },
        type: {
          type: String,
          enum: wordTypes,
          default: wordTypes[0]
        }
      }
    ],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
);

mongoose.models = {};
const Task = mongoose.model('Task', taskSchema);
export default Task;
