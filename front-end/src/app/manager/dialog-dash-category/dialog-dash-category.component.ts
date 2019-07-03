import { Component, OnInit, Inject } from '@angular/core';
import { IDialogCategory } from 'src/@core/interface/IDialogUser.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/@core/services/category/category.service';
import { ICategory } from 'src/@core/interface/ICategory.interface';

@Component({
  selector: 'shop-dialog-dash-category',
  templateUrl: './dialog-dash-category.component.html',
  styleUrls: ['./dialog-dash-category.component.scss']
})
export class DialogDashCategoryComponent implements OnInit {

  categoryName: "";
  constructor(
    public dialogRef: MatDialogRef<DialogDashCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDialogCategory,
    private toastService: ToastrService,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
  }

  onUpdate() { }
  onAddNewCategory(categoryName) {
    const category: ICategory = {
      categoryName
    }
    this.categoryService.onAddCategory(category).subscribe(response => {
      if (response) {
        this.toastService.success(`${response['message']}`, 'Thông báo');
        this.dialogRef.close();
      }
    }, err => {
      if (err) {
        this.toastService.error(`${err.error.message}`, 'Thông báo');
      }
    })
  }
}
