import mongoose from 'mongoose';
import { wordTypes } from '../constants';

const wordSchema = new mongoose.Schema(
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
    },
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
const Word = mongoose.model('Word', wordSchema);
export default Word;
