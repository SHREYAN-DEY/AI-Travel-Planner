import mongoose, { Schema, model } from 'mongoose';

const budgetSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    destination: {
      type: String,
      required: [true, 'Destination is required'],
      trim: true,
    },
    destinationImage: {
      type: String,
      default: "https://unsplash.com/photos/palm-trees-against-blue-sky-IRP6_qeKkKc",
    },
    currency: {
      type: String,
      uppercase: true,
      default: "INR",
    },
    inputs: {
      duration: { type: Number, required: true, min: 1 },
      numTravelers: { type: Number, default: 1, min: 1 },
      accommodationType: { type: String, lowercase: true, trim: true },
      travelSeason: { type: String, lowercase: true, trim: true },
      dailyFoodPreference: { type: String, lowercase: true, trim: true },
      userCurrency: { type: String, default: "INR", uppercase: true },
    },
    breakdown: {
      accommodation: { type: Number, default: 0 },
      food: { type: Number, default: 0 },
      flights: { type: Number, default: 0 },
      transport: { type: Number, default: 0 },
      insurance: { type: Number, default: 0 },
      miscellaneous: { type: Number, default: 0 },
      emergencyBuffer: { type: Number, default: 0 },
      total: { type: Number, default: 0 },
      perPerson: { type: Number, default: 0 },
    },
    aiInsights: {
      verdict: String,
      moneySavingTips: [String],
      hiddenCosts: [String],
      localPriceExample: Schema.Types.Mixed,
    },
    status: {
      type: String,
      enum: ["active", "archived"],
      default: "active",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Auto calculate total before saving
// Note: This to access the ducument

// budgetSchema.pre('save', function(){
//   this.currency = this.inputs.userCurrency || "INR";

//   const b = this.breakdown;

//   // Calculate the total
//   const total = (Number(b.accommodation) || 0) + 
//     (Number(b.food) || 0) + 
//     (Number(b.flights) || 0) +
//     (Number(b.transport) || 0) +
//     (Number(b.insurance) || 0) +
//     (Number(b.miscellaneous) || 0) +
//     (Number(b.emergencyBuffer) || 0);

//   this.breakdown.total = Math.round(total);

//   // Calculate travellers
//   const travelers = Math.max(1, this.inputs.numTravelers || 1);
//   this.breakdown.perPerson = Math.round(total / travelers);
// });

budgetSchema.virtual("formulatedTotal").get(function () {
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: this.currency || "INR",
    }).format(this.breakdown.total);
  } catch (error) {
    return `${this.currency} ${this.breakdown.total}`;
  }
});

// Calculate daily burn rate (total / duration)
budgetSchema.virtual("dailyBurnRate").get(function(){
  if(!this.inputs.duration || this.inputs.duration <= 0){
    return 0;
  }
  else{
    return Math.round(this.breakdown.total / this.inputs.duration);
  }
})

const Budget = mongoose.models.Budget || model("Budget", budgetSchema);

export default Budget;