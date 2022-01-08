// const { type } = require('express/lib/response');
const { Schema, Types, model, mongoose } = require('mongoose');

const reactionSchema = new Schema({
  reactionId: {type: Schema.Types.ObjectId, default: () => new Types.ObjectId()},
  reactionBody: {type: String, maxlength: 280, required: true},
  username: {type: String, required: true},
  createAt: {type: Date, default: Date.now,},
})

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

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
