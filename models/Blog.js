import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    titleImage: { type: String },
    category: { type: String, required: true },
    description: [{ 
        title: {type: String},
        subtitle: {type: String},
        descDetail: {type: String, required: true},
        images: [{type: String}]
     }],
  },
  {
    timestamps: true,
  }
);

const Blog =
  mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
export default Blog;