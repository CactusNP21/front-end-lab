export interface Dashboard{
  _id: string
  title: string
  description: string
  date: Date
  tasks: Tasks
}

export interface Tasks {

  todo: Job[]
  progress: Job[]
  done: Job[]
  archive: Job[]

}

export interface Job {
  _id?: string
  id: number
  name?: string
  date: Date
  comments: string[],
  archived?: boolean
}
