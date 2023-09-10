import { Component } from '@angular/core';
import { faCircleCheck, faTrash} from '@fortawesome/free-solid-svg-icons';

class Task {
  id: number
  taskName: string 
  constructor(id: number, taskName: string) {
    this.id = id
    this.taskName = taskName
  }
}

@Component({
  selector: 'TodoList-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TodoList' 
  faCircleCheck = faCircleCheck
  faTrash = faTrash
  inputValue = ""

  nextTaskID = 1  
  todoList = [new Task(0, "Coding")] 
  nextCompletedTaskID = 1 
  completedList = [new Task(0, "Cooking")]

  addTask() {
    if (this.inputValue == "") return 
    this.todoList.push(new Task(this.nextTaskID, this.inputValue))
    this.inputValue = ""
    this.nextTaskID ++ 
  }

  handleEnterNewTask(event: KeyboardEvent) {
    if (event.key == "Enter") {
      this.addTask()
    }
  }

  tickTask(idToTick: number) {
    let indexOfTask = this.todoList.findIndex(taskObj => taskObj.id == idToTick)
    this.completedList.unshift(new Task(
      this.nextCompletedTaskID,  
      this.todoList[indexOfTask].taskName 
    ))
    this.nextCompletedTaskID++ 
    
    this.todoList.splice(indexOfTask, 1)
  }

  removeTask(idToRemove: number) {
    let indexOfTask = this.todoList.findIndex(taskObj => taskObj.id == idToRemove)
    this.todoList.splice(indexOfTask, 1)
  }

  removeCompletedTask(idToRemove: number) {
    let indexOfTask = this.todoList.findIndex(taskObj => taskObj.id == idToRemove)
    this.completedList.splice(indexOfTask, 1)
  }
}
