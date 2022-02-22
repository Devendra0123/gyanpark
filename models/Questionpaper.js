import mongoose from 'mongoose';

const QuestionpaperSchema = new mongoose.Schema(
  {
    program: { type: String, required: true },
    questionPaper: [
      {
      programYear: { type: String, required: true },
      examYear: { type: String, required: true },
      questionPaper : [{ type: String, required: true }]
      }
    ],
    solution: [
        {
            question: { type: String, required: true },
            solution: { type: String, required: true },
            image:[{type: String}]
        }
    ]
  },
  {
    timestamps: true,
  }
);

const Questionpaper =
  mongoose.models.Questionpaper || mongoose.model('Questionpaper', QuestionpaperSchema);
export default Questionpaper;