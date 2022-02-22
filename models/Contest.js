import mongoose from 'mongoose';

const contestantSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    token: { type: String },
    answers: [
      {
        questionId: { type: String, required: true },
        selectedOption: { type: Number, required: true }
      }
    ],
    correctAnswers: [
      {
        questionId: { type: String, required: true }
      }
    ],
    timeTaken: { type: Number }
  },
  {
    timestamps: true,
  }
);

const contestquestionSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    option1: { type: String, required: true },
    option2: { type: String, required: true },
    option3: { type: String, required: true },
    option4: { type: String, required: true },
    correctOption: { type: Number, required: true },
    solution: { type: String },
    time: { type: Number, required: true }
},
  {
    timestamps: true,
  }
);

const ContestSchema = new mongoose.Schema(
  {
    contestTitle: { type: String, required: true },
    contestDescription: { type: String, required: true },
    prizes: { type: String },
    examFee: { type: Number },
    contestTopic: [{ type: String, required: true }],
    tokenSystem: { type: String, required: true },
    token: [{ 
      token: { type: String, required: true },
      given: { type: Boolean }
     }],
    contestDateAndTime: {type: Date, required: true},
    contestant: [contestantSchema],
    contestQuestion:[contestquestionSchema],
    contestExpireTime: { type: Date, required: true },
    contestOrganizer: {
        name: { type: String, required: true },
        phoneNumber: { type: Number, required: true },
        email: { type: String, required: true },
        location: { type: String, required: true }
    }
  },
  {
    timestamps: true,
  }
);

const Contest =
  mongoose.models.Contest || mongoose.model('Contest', ContestSchema);
export default Contest;