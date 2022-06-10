import { HttpClient } from '@angular/common/http';
import { Component, HostBinding, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GridOptions } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { Utils } from 'src/app/shared/utils/utils';

@Component({
  selector: 'app-target',
  templateUrl: './target.component.html',
  styleUrls: ['./target.component.css']
})
export class TargetComponent implements OnInit {

  TargetForm: FormGroup | any;
  frameworkComponents: any;
  submitted = false;

  ligandVersion: number | any;
  Target: number | any;
  TargetVersion: number | any;
  CollectionId: number | any;
  Original: number | any;
  Acronym: number | any;
  Organism: number | any;
  Variant: number | any;

  hexToRgb: any;
  rgbToHex: any;
  public gridOptions: GridOptions | any;
  rowData: Observable<any[]> | any;

  @HostBinding('style.--color_l1') colorthemes_1: any;
  @HostBinding('style.--color_l2') colorthemes_2: any;
  @HostBinding('style.--color_l3') colorthemes_3: any;
  @HostBinding('style.--color_l4') colorthemes_4: any;
  constructor(private authManager: AuthManager, private formBuilder: FormBuilder, private http: HttpClient) {


    const rowData = this.getJSON().subscribe(data => {
      console.log(data);
      if (data.length > 0) {
        console.log(this.rowData, "data")
        this.gridOptions?.api?.setRowData(data);
      }
      else {
        this.gridOptions?.api?.setRowData([]);
      }
    });
  }

  public getJSON(): Observable<any> {
    return this.http.get("./assets/json/target.json");
  }

  ngOnInit(): void {
    this.createDataGrid001();

   
    this.TargetForm = this.formBuilder.group({
      ligandVersion: ['', Validators.required],
      Target: ['', Validators.required],
      TargetVersion: ['', Validators.required],
      CollectionId: ['', Validators.required],
      Original: ['', Validators.required],
      Acronym: ['', Validators.required],
      Organism: ['', Validators.required],
      Variant: ['', Validators.required],
    });


    this.authManager.currentUserSubject.subscribe((object: any) => {
      let rgb = Utils.hexToRgb(object.theme);
      this.colorthemes_1 = Utils.rgbToHex(rgb, -0.3);

      this.colorthemes_2 = Utils.rgbToHex(rgb, 0.1);

      this.colorthemes_3 = Utils.rgbToHex(rgb, 0.5);

      this.colorthemes_4 = Utils.rgbToHex(rgb, 0.8);
    });
  }



  createDataGrid001(): void {
		this.gridOptions = {
			paginationPageSize: 10,
			rowSelection: 'single',
			// onFirstDataRendered: this.onFirstDataRendered.bind(this),
		};
		this.gridOptions.editType = 'fullRow';
		this.gridOptions.enableRangeSelection = true;
		this.gridOptions.animateRows = true;
		this.gridOptions.columnDefs = [
			{
				headerName: 'Ligand Version',
				field: 'ligandVersion',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				headerCheckboxSelection: true,
				headerCheckboxSelectionFilteredOnly: true,
				checkboxSelection: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Target-Uri',
				field: 'Target',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,

			},
			{
				headerName: 'Target-Version',
				field: 'TargetVersion',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Target-Status',
				field: 'TargetStatus',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
      },
      {
				headerName: 'Collection-ID',
				field: 'CollectionId',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Target-Name',
				field: 'Original',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,

			},
			{
				headerName: 'Acronym',
				field: 'Acronym',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
			},
			{
				headerName: 'Organism-Source',
				field: 'Organism',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
      },
      {
				headerName: 'Variant',
				field: 'Variant',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
      }
		];
	}

  get f() { return this.TargetForm.controls; }

  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });

  }

  onTargetClick(event: any, TargetForm: any) {
    this.markFormGroupTouched(this.TargetForm);
    this.submitted = true;
    if (this.TargetForm.invalid) {
      return;
    }



  }

  onReset() {
	this.submitted = false;
	this.TargetForm.reset();
}

}
