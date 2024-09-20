import mongoose, { Document, Schema } from 'mongoose';

export interface IPdf extends Document {
    filename: string;
    file: Buffer;
}

const pdfSchema: Schema<IPdf> = new Schema({
    filename: { type: String, required: true },
    file: { type: Buffer, required: true },
});

export const Pdf = mongoose.model<IPdf>('Pdf', pdfSchema);
