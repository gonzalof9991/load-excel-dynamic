import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import * as XLSX from 'xlsx';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit{
  @ViewChild('paginator') paginator: MatPaginator | undefined;
  @ViewChild('sort') sort: MatSort | undefined;
  public title = 'load-excel';
  public table: Table<any>;
  public showSpinner: boolean = false;
  constructor() {
    this.table = new Table<any>([], []);
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.table.setPaginator(this.paginator);
  }

  public async listening(event: any): Promise<void> {
    // @ts-ignore
    const file = (event.target as HTMLInputElement).files[0] || null;
    if (file) {
      this.showSpinner = true;
      await this._processFile(file);
      this.showSpinner = false;
    }
  }

  private async _processFile(file: File): Promise<void>{
    const contentBuffer = await this._readFile(file) as ArrayBuffer;
    const contentUint8Array = new Uint8Array(contentBuffer);
    const workbook = XLSX.read(contentUint8Array, {type: 'array'});
    const ws = workbook.Sheets[workbook.SheetNames[0]];
    const newArray = XLSX.utils.sheet_to_json(ws, {
    });
    const fileHeader = newArray[0] as JSON;
    this.table.columns = Object.keys(fileHeader);
    this.table.load(newArray);
    this.table.filter('key');
    this.table.setPaginator(this.paginator);
    this.table.setSort(this.sort);
  }

  private _readFile(file: File): Promise<any>{
    return new Promise<any>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        resolve(event.target.result);
      };
      reader.onerror = (event: any) => {
        reject(event.target.error);
      };
      reader.readAsArrayBuffer(file);
    });
  }
}


export class Table<T>{
  public columns: string[];
  public dataSource: MatTableDataSource<T>
  constructor(columns: string[], data: any[]) {
    this.columns = columns;
    this.dataSource = new MatTableDataSource<T>(data);
  }

  public load(data: any[]): void{
    this.dataSource = new MatTableDataSource<T>(data);
  }

  public filter(filterValue: string): void{
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public setPaginator(paginator: any): void{
    this.dataSource.paginator = paginator;
  }

  public setSort(sort: any): void{
    this.dataSource.sort = sort;
  }
}
