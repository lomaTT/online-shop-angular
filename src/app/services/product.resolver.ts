import {ResolveFn, Router} from '@angular/router';
import {IProducts, IProductsConfig} from "../models/products";
import {ProductsService} from "./products.service";
import {inject} from "@angular/core";
import {ProductsComponent} from "../components/products/products.component";
import {catchError, EMPTY, filter, Observable, take} from "rxjs";



export const productResolver: ResolveFn<IProducts> = (
  route,
  state,
  productsService: ProductsService = inject(ProductsService),
): Observable<IProducts> => productsService.getProduct(route.params?.['id'])
  .pipe(
    filter<IProducts>((product: IProducts) => !!product), take(1)
    // catchError(() => {
    //   route.navigate(['products']);
    //   return EMPTY;
    // })
  );

