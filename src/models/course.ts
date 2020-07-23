import mongoose, { mongo } from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface CourseAttrs {
  title: string;
  author: string;
  category: string;
}

interface CourseDoc extends mongoose.Document {
  title: string;
  author: string;
  category: string;
  version: number;
}

interface CourseModel extends mongoose.Model<CourseDoc> {
  build(attrs: CourseAttrs): CourseDoc;
}

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

courseSchema.set("versionKey", "version");
courseSchema.plugin(updateIfCurrentPlugin);

courseSchema.statics.build = (attr: CourseAttrs) => {
  return new Course(attr);
};

const Course = mongoose.model<CourseDoc, CourseModel>("Course", courseSchema);

export { Course };
