import mongoose from 'mongoose';

const EbookSchema = new mongoose.Schema(
  {
    ebookName: { type: String, required: true },
    ebookPrice: { type: Number },
    category: { type: String, required: true },
    description: { type: String, required: true },
    authorName: { type: String },
    publicationName: { type: String },
    coverImage: {type: String},
    previewImage: [{type: String}],
    ebookPdf: { type: String, required: true }
  },
  {
    timestamps: true,
  }
);

const Ebook =
  mongoose.models.Ebook || mongoose.model('Ebook', EbookSchema);
export default Ebook;