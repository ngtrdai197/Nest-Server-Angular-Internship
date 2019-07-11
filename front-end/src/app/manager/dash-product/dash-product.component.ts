import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatTableDataSource, MatDialog, MatSort, MatPaginator } from '@angular/material';
import { IProduct } from 'src/@core/interface/IProduct.interface';
import { CategoryService } from 'src/@core/services/category/category.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/@core/services/product/product.service';
import { ICategory } from 'src/@core/interface';

@Component({
  selector: 'shop-dash-product',
  templateUrl: './dash-product.component.html',
  styleUrls: ['./dash-product.component.scss']
})
export class DashProductComponent implements OnInit {
  isLoading = true;
  categorys: IProduct[] = [];
  isToggle: Boolean = false;
  productChecked: '';
  displayedColumns: string[] = ['no', 'productName', 'title', 'description', 'productTotal', 'currentPrice', 'oldPrice', 'discount', 'images', 'action'];
  dataSource: MatTableDataSource<IProduct>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  selectedIdDetele = '';
  categoryId = '';
  currentProduct = '';
  public createForm: FormGroup;
  public editForm: FormGroup;
  constructor(public dialog: MatDialog, private title: Title,
    private categoryService: CategoryService,
    private toastService: ToastrService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.onSetTitle();
    this.buildForm();
    this.activatedRoute.params.subscribe(params => {
      this.categoryId = params['id'];
      this.isLoading = true;
      this.refresh();
    });
  }
  onSetTitle() {
    this.title.setTitle('Quản lý sản phẩm');
  }

  onCreateProduct() {
    const product: IProduct = {
      productName: this.createForm.value.name,
      category: this.categoryId,
      currentPrice: this.createForm.value.currentPrice,
      oldPrice: this.createForm.value.oldPrice,
      description: this.createForm.value.description,
      discount: this.createForm.value.discount,
      title: this.createForm.value.title,
      productTotal: this.createForm.value.quantity,
      productAvailable: this.createForm.value.quantity
    }
    this.productService.createProduct(product).subscribe((response) => {
      if (response) {
        this.refresh();
        this.toastService.success('Thêm sản phẩm thành công', 'Thông báo');
      }
    });
  }

  updateImages(event) {
    const { files } = event.target;
    const images = new FormData();
    for (const file in files) {
      images.append('image', file);
    }
    console.log(images.get('image'));
    this.editForm = this.formBuilder.group({
      images: [files, [Validators.required]]
    });
    console.log(this.editForm.value);

  }

  update(product: IProduct) {
    this.editForm = this.formBuilder.group({
      name: [product.productName, [Validators.required]],
      currentPrice: [product.currentPrice, [Validators.required]],
      oldPrice: [product.oldPrice, [Validators.required]],
      description: [product.description, [Validators.required]],
      discount: [product.discount, [Validators.required]],
      title: [product.title, [Validators.required]],
      quantity: [product.productTotal, [Validators.required]],
    });
    this.currentProduct = product._id as string;

  }
  getIdToDelete(product: IProduct) {
    this.selectedIdDetele = product._id as string;
  }

  delete() {
    this.productService.deleteProduct(this.selectedIdDetele).subscribe(response => {
      if (response) {
        this.refresh();
        this.toastService.success('Xóa sản phẩm thành công', 'Thông báo');
      }
    })
  }

  onUpdateProduct() {
    const product: IProduct = {
      productName: this.editForm.value.name,
      category: this.categoryId,
      currentPrice: this.editForm.value.currentPrice,
      oldPrice: this.editForm.value.oldPrice,
      description: this.editForm.value.description,
      discount: this.editForm.value.discount,
      title: this.editForm.value.title,
      productTotal: this.editForm.value.quantity,
      _id: this.currentProduct
    }
    this.productService.updateProduct(product).subscribe((response) => {
      if (response) {
        this.refresh();
        this.toastService.success('Cập nhật sản phẩm thành công', 'Thông báo');
      }
    }, (error) => {
      this.toastService.error(error, 'Lỗi');
    });
  }

  private refresh() {
    this.categoryService.onGetById(this.categoryId).subscribe((response: ICategory) => {
      this.dataSource = new MatTableDataSource<IProduct>(response.products as IProduct[]);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoading = false;
    });
  }

  private buildForm() {
    this.createForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      title: ['', [Validators.required]],
      currentPrice: ['', [Validators.required]],
      oldPrice: ['', [Validators.required]],
      description: ['', [Validators.required]],
      discount: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      images: [null, [Validators.required]],
    });
    this.editForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      title: ['', [Validators.required]],
      currentPrice: ['', [Validators.required]],
      oldPrice: ['', [Validators.required]],
      description: ['', [Validators.required]],
      discount: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      images: [null, [Validators.required]]
    });
  }
}

