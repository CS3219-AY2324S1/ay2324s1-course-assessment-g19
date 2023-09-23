import { ObjectId } from 'mongodb';

export default class Question {
  constructor(
    public title: string,
    public description: string,
    public category: string,
    public complexity: string,
    public id?: ObjectId
  ) {}
}
