import {Pipe, PipeTransform} from '@angular/core';
import {DataService} from "../../../core/data-service/data.service";

enum Greetings {
  'Hello',
  'Guten morgan',
  "Доброго здоров'я",
  'こんにちは',
  'Salut',
  'Bonjour'
}

@Pipe({
  name: 'username'
})

export class UsernamePipe implements PipeTransform {
  constructor(private ds: DataService) {
  }

  greetingsArr: string[] = ['Hello', 'Guten morgan', "Доброго здоров'я", 'こんにちは', 'Salut', 'Bonjour']

  getGreetings() {
    return this.greetingsArr[Math.floor(Math.random() * 6)]
  }

  transform(value: string): string {

    return this.getGreetings() +', ' + this.ds.getUsername();
  }

}
