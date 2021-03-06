import mongoose from 'mongoose'
import { TaskStatus } from '../enums/task-status.enum';

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  status: {
    type: TaskStatus
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: String
  }
})

const task = mongoose.model('Task', TaskSchema)
export { task };

