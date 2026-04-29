const appointmentSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    startTime: {
      type: Date,
      required: true,
    },

    endTime: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["booked", "cancelled", "completed", "no_show"],
      default: "booked",
    },

    reason: String,

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "refunded"],
      default: "pending",
    },
  },
  { timestamps: true },
);

// 🔥 Critical index (prevents duplicate slot at DB level)
appointmentSchema.index(
  { doctor: 1, startTime: 1 },
  { unique: true, partialFilterExpression: { status: "booked" } },
);

export default mongoose.model("Appointment", appointmentSchema);
