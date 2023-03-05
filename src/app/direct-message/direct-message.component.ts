import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';

export interface Search {
  name: string;
}


@Component({
  selector: 'app-direct-message',
  templateUrl: './direct-message.component.html',
  styleUrls: ['./direct-message.component.scss']
})
export class DirectMessageComponent implements OnInit {
  myControl = new FormControl<string | Search>('');
  options: Search[] = [];
  filteredOptions: Observable<Search[]>;
  test = ['fjkdnjsdfds', 'ksfdjlfkj'];

  


  constructor() { }
  ngOnInit(): void {
    
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.options.slice();
      }),
    );
  }

  displayFn(user: Search): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): Search[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }
  }


