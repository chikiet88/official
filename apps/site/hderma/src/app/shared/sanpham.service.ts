import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, switchMap, take } from 'rxjs';
import { environment } from 'apps/site/hderma/src/environments/environments';
@Injectable({
  providedIn: 'root',
})
export class SanphamService {
  private urlApi = environment.APIURL;
  private _products: BehaviorSubject<any | null> = new BehaviorSubject(null);
  private _product: BehaviorSubject<any | null> = new BehaviorSubject(null);

  get products$(): Observable<any[]> {
    return this._products.asObservable();
  }
  get product$(): Observable<any> {
    return this._product.asObservable();
  }
  constructor(private http: HttpClient) { }

  postProduct(data: any) {
    return this.products$.pipe(
      take(1),
      switchMap((proudcts: any) =>
        this.http.post(this.urlApi + '/hderma-product/', data).pipe(
          map((product) => {
            this._products.next([product, ...proudcts]);
            return product;
          })
        )
      )
    );
  }
  searchBaiviet(query:any) {
    return this.http.get(this.urlApi + `/hderma-product/search?query=${query}`).pipe(
      map((data: any) => { 
        return data;
      })
    );
  }
  getProducts():Observable<any> {
    return this.http.get(this.urlApi + `/hderma-product/`).pipe(
      map((products) => {
        this._products.next(products);
        return products;
      })
    );
  }
  getProductByid(id:any):Observable<any> {
    return this.http.get(this.urlApi + `/hderma-product/findid/${id}`).pipe(
      map((products) => {
        this._products.next(products);
        return products;
      })
    );
  }
  getProductBySlug(slug:any):Observable<any> {
    return this.http.get(this.urlApi + `/hderma-product/findslug/${slug}`).pipe(
      map((products) => {
        this._products.next(products);
        return products;
      })
    );
  }
  getPaginaProducts(page: number, limit: number) {
    const params ={ page: String(page), limit: String(limit) }
    return this.http.get(this.urlApi+'/hderma-product/pagina',{ params }).pipe(
      map((data: any) => {       
        this._products.next(data);
        return data;
      })
    );
  }
  getProductDetail(slug: string) {
    return this.http.get(this.urlApi + `/hderma-product/${slug}`).pipe(
      map((product) => {
        this._product.next(product);
        return product;
      })
    );
  }
  updateProduct(data: any) {
    return this.products$.pipe(
      take(1),
      switchMap((products) =>
        this.http.patch(this.urlApi + `/hderma-product/${data.id}`, data).pipe(
          map((product) => {
            if (products?.length > 0) {
              let index = products.findIndex(x => x.id == data.id)
              products[index] = data
              this._products.next(products);
            } else {
              this._products.next([product]);
            }
            return product;
          })
        )
      )
    );
  }
  deleteSanpham(id: string) {
    return this.products$.pipe(
      take(1),
      switchMap((productss: any) =>
        this.http.delete(this.urlApi + `/hderma-product/${id}`).pipe(
          map((isDelete) => {
            const updateSanPham = productss.filter((e: any) => e.id != id);
            this._products.next(updateSanPham);
            return isDelete;
          })
        )
      )
    );
  }
  uploadDriver(file: any): Observable<any> {
    return this.http.post(this.urlApi + '/upload/filehderma', file).pipe(
      map((data: any) => {
        if (data) {
          return data;
        }
      })
    );
  }
}
