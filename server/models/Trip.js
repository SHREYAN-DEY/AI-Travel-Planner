import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true,
        },
        destination: {
            type: String,
            required: [true, 'Destination is required'],
            trim: true,
        },
        input: {
            startDate: String,
            endDate: String,
            duration: { type: Number, default: 3 },
            numTravelers: { type: Number, default: 1 },
            travelStyle: { type: String, default: 'Standard' },
            interests: [String],
            budgetMin: Number,
            budgetMax: Number,
        },
        itinerary: {
            type: mongoose.Schema.Types.Mixed,
            required: true,
        },
        shareId: {
            type: String,
            unique: true,
            sparse: true,
        },
        isPublic: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

tripSchema.virtual("formattedDate").get(function(){
    return this.createdAt.toLocaleDateString("en-IN", {
        month: "long",
        year: "numeric",
    });
});

const Trip = mongoose.model('Trip', tripSchema);
export default Trip;