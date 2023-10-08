import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID, RendererFactory2 } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from 'apps/site/hderma/src/environments/environments';
import { BehaviorSubject, Observable, map, take, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeotoolService {
  script: any;
  private urlApi = environment.APIURL;
  private _seotools: BehaviorSubject<any[] | null> = new BehaviorSubject<any[] | null>(null);
  get seotools$(): Observable<any[] | null> {
    return this._seotools.asObservable();
  }
  private _seotool: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  get seotool$(): Observable<any | null> {
    return this._seotool.asObservable();
  }
  constructor(private http: HttpClient, 
    private meta: Meta, 
    private title: Title, 
    private renderer: RendererFactory2,
    @Inject(PLATFORM_ID) private platformId: object
    ) { }
  setMetaData(title: string, description: string, keywords: string, robots: any = 'index, follow', url: any, image: any) {
    this.title.setTitle(title);
    this.meta.updateTag({ name: 'title', content: title });
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'keywords', content: keywords });
    this.meta.updateTag({ name: 'robots', content: robots });
    this.meta.updateTag({ name: 'og:url', content: url });
    this.meta.updateTag({ name: 'og:type', content: "article" });
    this.meta.updateTag({ name: 'og:title', content: title });
    this.meta.updateTag({ name: 'og:description', content: description });
    this.meta.updateTag({ name: 'og:image', content: image });
  }
  addStructuredData(data: any) {
    if (isPlatformBrowser(this.platformId)) {
      const script = this.renderer.createRenderer(null, null).createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(data);
      this.renderer.createRenderer(null, null).appendChild(document.body, script);
      }
      else
      {
        const script = this.renderer.createRenderer(null, null).createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify(data);
        this.renderer.createRenderer(null, null).appendChild(document.body, script);
      }
    
  }
  setMetabySlyg(slug: any) {
    return this.http.get(this.urlApi + `/hderma-seotool/findslug/${slug}`).pipe(
      map((data: any) => {
        if (data.Meta) {
          this.title.setTitle(data.Meta.title);
          this.meta.updateTag({ name: 'title', content: data.Meta.title });
          this.meta.updateTag({ name: 'description', content: data.Meta.description });
          this.meta.updateTag({ name: 'keywords', content: data.Meta.keywords });
          this.meta.updateTag({ name: 'robots', content: data.Meta.robots });
          this.meta.updateTag({ name: 'og:url', content: data.Meta.url });
          this.meta.updateTag({ name: 'og:type', content: data.Meta.article });
          this.meta.updateTag({ name: 'og:title', content: data.Meta.title });
          this.meta.updateTag({ name: 'og:description', content: data.Meta.description });
          this.meta.updateTag({ name: 'og:image', content: data.Meta.image });
        }
          const script = this.renderer.createRenderer(null, null).createElement('script');
          script.type = 'application/ld+json';
          script.text = data.Schema;
          if (isPlatformBrowser(this.platformId)) {
            this.renderer.createRenderer(null, null).appendChild(document.body, script);  
            }
            else
            {
              this.renderer.createRenderer(null, null).appendChild(document.body, script);  
            }      
        return data;
      })
    );
  }
  getSeotools() {
    return this.http.get(this.urlApi + '/hderma-seotool').pipe(
      map((data: any) => {
        this._seotools.next(data);
        return data;
      })
    );
  }
  getSeotoolDetail(slug: string) {
    return this.http.get(this.urlApi + `/hderma-seotool/findslug/${slug}`).pipe(
      map((data: any) => {
        this._seotool.next(data);
        return data;
      })
    );
  }
  getSeotoolById(id: string) {
    return this.http.get(this.urlApi + `/hderma-seotool/findid/${id}`).pipe(
      map((data: any) => {
        this._seotool.next(data);
        return data;
      })
    );
  }
  postSeotool(data: any) {
    return this.seotools$.pipe(
      take(1),
      switchMap((seotools: any) =>
        this.http.post(this.urlApi + '/hderma-seotool', data).pipe(
          map((seotool) => {
            if (seotools?.length > 0) {
              this._seotools.next([...seotools, seotool]);
            } else {
              this._seotools.next([seotool]);
            }
            return seotool;
          })
        )
      )
    );
  }
  updateSeotool(data: any) {
    return this.http.patch(this.urlApi + `/hderma-seotool/${data.id}`, data).pipe(
      map((seotool) => {
        this._seotool.next(seotool)
        return seotool;
      })
    )
  }
  deleteSeotool(id: String) {
    return this.seotools$.pipe(
      take(1),
      switchMap((seotools: any) =>
        this.http.delete(this.urlApi + `/hderma-seotool/${id}`).pipe(
          map((isDelete) => {
            const updateSeotool = seotools.filter((e: any) => e.id != id);
            this._seotools.next(updateSeotool);
            return isDelete;
          })
        )
      )
    );
  }
}
