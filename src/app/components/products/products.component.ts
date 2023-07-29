import {Component, OnInit} from '@angular/core';
import {IProducts} from "../../models/products";
import {Subscription} from "rxjs";
import {ProductsService} from "../../services/products.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogBoxComponent} from "../dialog-box/dialog-box.component";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  canEdit: boolean = true;
  products!: IProducts[];
  productsSubscription!: Subscription;

  constructor(private ProductService: ProductsService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.productsSubscription = this.ProductService.getProducts().subscribe( (data) => {
      this.products = data;
    });
  }

  ngOnDestroy(): void {
    if (this.productsSubscription) this.productsSubscription.unsubscribe();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: "50%",
      height: "500px"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // console.log(result);
    });
  }
}
