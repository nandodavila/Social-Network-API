const { Schema, Types } = require('mongoose');

const thoughtSchema = new Schema(
  {
    thoughtId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    thoughtName: {
      type: String,
      required: true,
      maxlength: 120,
      minlength: 1,
      default: 'Unnamed thought',
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  }
);

module.exports = thoughtSchema;
