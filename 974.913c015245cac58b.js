"use strict";(self.webpackChunksite_hderma=self.webpackChunksite_hderma||[]).push([[974],{9974:(X,x,r)=>{r.r(x),r.d(x,{TagsModule:()=>P});var h=r(6895),u=r(9116),y=r(529),p=r(4006),M=r(9363),w=r(9102),E=r(9632),D=r(7851),U=r(8739),F=r(6308),Z=r(5423),_=r(5179),e=r(4650),d=r(5938),A=r(4859),m=r(9549),C=r(4144),T=r(3267),S=r(266);const N=function(a){return[a]};function I(a,s){if(1&a){const t=e.EpF();e.TgZ(0,"div",23),e.NdJ("click",function(){e.CHM(t),e.oxw();const l=e.MAs(2);return e.KtG(l.open())}),e.TgZ(1,"div",24)(2,"div",25)(3,"span"),e._uU(4),e.qZA(),e.TgZ(5,"span",26),e._uU(6),e.qZA()()()()}if(2&a){const t=s.$implicit;e.Q6J("routerLink",e.VKq(3,N,t.id)),e.xp6(4),e.hij("",t.Tieude," "),e.xp6(2),e.hij("",t.loc," ")}}function J(a,s){1&a&&(e.TgZ(0,"div",27)(1,"div",28),e._uU(2,"Th\xeam M\u1edbi"),e.qZA(),e.TgZ(3,"div",29),e._UZ(4,"div",30),e.qZA(),e.TgZ(5,"div",31)(6,"button",32),e._uU(7,"Hu\u1ef7"),e.qZA(),e.TgZ(8,"button",33),e._uU(9,"\u0110\u1ed3ng \xdd"),e.qZA()()())}let O=(()=>{class a{constructor(t,n,l){this.dialog=t,this.fb=n,this._tagService=l,this.tags=[],this.Filtertags=[],this.percentage=0,this._transformer=(i,o)=>({expandable:!!i.children&&i.children.length>0,level:o,...i}),this.treeControl=new D.C2(i=>i.level,i=>i.expandable),this.treeFlattener=new Z.JZ(this._transformer,i=>i.level,i=>i.expandable,i=>i.children),this.hasChild=(i,o)=>o.expandable,this.hasNoContent=(i,o)=>""===o.name,this.dataSource1=new Z.kc(this.treeControl,this.treeFlattener),this.nest=(i,o="",g="pid")=>{if(i)return i?.filter(c=>c[g]==o).map(c=>({...c,children:this.nest(i,c.id)}))},this.displayedColumns=["Loaitag","Tieude","Mota","Image","action"]}OpenThemTag(t,n){this.temp=t,this.dialog.open(n)}clickupdate(){this.tag.forEach(t=>{this._tagService.postTag(t).subscribe(n=>console.log(n))})}applyFilter(t){this.dataSource.filter=t.target.value.trim().toLowerCase(),this.dataSource.paginator&&this.dataSource.paginator.firstPage()}selectProduct(t){this.resetForm()}deleteProduct(t){this._tagService.deleteTag(t).subscribe(n=>{n&&alert("Xo\xe1 Tag th\xe0nh c\xf4ng")})}onSave(){this.TagList.pid=this.temp.id,this._tagService.postTag(this.TagList).subscribe(t=>{t&&(this.resetForm(),alert("T\u1ea1o danh m\u1ee5c th\xe0nh c\xf4ng"),this.dialog.closeAll())})}updateTag(t){t.Trangthai=0==t.Trangthai?1:0,this._tagService.updateTag(t).subscribe()}deleteTag(t){this._tagService.deleteTag(t).subscribe(n=>{n&&alert("Xo\xe1 danh m\u1ee5c th\xe0nh c\xf4ng")})}resetForm(){this.TagList={Title:"",Mota:"",Slug:"",Image:"",Ordering:0}}openDialog(t){this.dialog.open(t,{}).afterClosed().subscribe(l=>{})}ngOnInit(){this.resetForm(),this._tagService.getTags().subscribe(),this._tagService.tags$.subscribe(t=>{t&&(console.log(t),this.tags=this.Filtertags=t)})}}return a.\u0275fac=function(t){return new(t||a)(e.Y36(d.uw),e.Y36(p.qu),e.Y36(_.i))},a.\u0275cmp=e.Xpm({type:a,selectors:[["taza-base-tags"]],viewQuery:function(t,n){if(1&t&&(e.Gf(F.YE,5),e.Gf(U.NW,5)),2&t){let l;e.iGM(l=e.CRH())&&(n.sort=l.first),e.iGM(l=e.CRH())&&(n.paginator=l.first)}},decls:43,vars:1,consts:[["autosize","",1,"example-container","w-full","h-full"],["mode","side","position","end",1,"!flex","flex-col","flex-auto","min-w-0","relative","h-full","w-2/3"],["drawer",""],[1,"relative","flex","flex-col","h-full","w-full","overflow-auto"],[1,"absolute","top-0","z-10"],[1,"material-icons","p-3","hover:bg-gray-200","rounded-full",3,"click"],[1,"!flex","flex-col","flex-auto","min-w-0","relative","bg-white","!h-[90vh]"],[1,"relative","border-b-2","flex","flex-col"],[1,"flex","flex-col","p-3","items-center","justify-between","w-full"],["appearance","outline",1,"w-full","text-xs"],["matInput","","placeholder","M\xf4 T\u1ea3",1,"w-full",3,"keyup"],["matPrefix","",1,"material-icons","mr-2"],[1,"flex","flex-row","space-x-3","justify-start","w-full"],[1,"flex","items-center","space-x-2","p-2","hover:bg-gray-200","rounded-lg"],["matTooltip","T\xf9y Ch\u1ec9nh",1,"material-icons","text-xl"],[1,"text-sm"],["matTooltip","L\u1ea5y M\u1eabu",1,"material-icons","text-xl"],["matTooltip","Upload File",1,"material-icons","text-xl"],[1,"flex","items-center","space-x-2","p-2","hover:bg-gray-200","rounded-lg",3,"click"],["matTooltip","T\u1ea1o m\u1edbi",1,"material-icons","text-xl"],[1,"flex","flex-col"],["routerLinkActive","router-link-active","class","flex flex-row justify-between items-center p-4 hover:bg-gray-200",3,"routerLink","click",4,"ngFor","ngForOf"],["dialogTemplate",""],["routerLinkActive","router-link-active",1,"flex","flex-row","justify-between","items-center","p-4","hover:bg-gray-200",3,"routerLink","click"],[1,"flex","flex-row","space-x-2","items-center","justify-center"],[1,"flex","flex-col","space-y-2"],[1,"text-xs","italic"],[1,"min-w-[672px]"],["mat-dialog-title",""],["mat-dialog-content",""],[1,"flex","flex-col","w-full","space-y-4","p-4"],["mat-dialog-actions","",1,"justify-center"],["mat-button","","mat-dialog-close","false",1,"bg-red-400","hover:bg-red-600","text-white"],["mat-button","","mat-dialog-close","true",1,"bg-blue-400","hover:bg-blue-600","text-white"]],template:function(t,n){if(1&t){const l=e.EpF();e.TgZ(0,"mat-drawer-container",0)(1,"mat-drawer",1,2)(3,"div",3)(4,"div",4)(5,"span",5),e.NdJ("click",function(){e.CHM(l);const o=e.MAs(2);return e.KtG(o.close())}),e._uU(6," cancel "),e.qZA()(),e._UZ(7,"router-outlet"),e.qZA()(),e.TgZ(8,"mat-drawer-content",6)(9,"div",7)(10,"div",8)(11,"mat-form-field",9)(12,"mat-label"),e._uU(13,"Ti\xeau \u0110\u1ec1"),e.qZA(),e.TgZ(14,"input",10),e.NdJ("keyup",function(o){return n.applyFilter(o)}),e.qZA(),e.TgZ(15,"span",11),e._uU(16,"search"),e.qZA()(),e.TgZ(17,"div",12)(18,"div",13)(19,"span",14),e._uU(20,"tune"),e.qZA(),e.TgZ(21,"span",15),e._uU(22,"C\u1ea5u H\xecnh"),e.qZA()(),e.TgZ(23,"div",13)(24,"span",16),e._uU(25,"file_download"),e.qZA(),e.TgZ(26,"span",15),e._uU(27,"Download"),e.qZA()(),e.TgZ(28,"div",13)(29,"span",17),e._uU(30,"file_upload"),e.qZA(),e.TgZ(31,"span",15),e._uU(32,"Upload"),e.qZA()(),e.TgZ(33,"div",18),e.NdJ("click",function(){e.CHM(l);const o=e.MAs(42);return e.KtG(n.openDialog(o))}),e.TgZ(34,"span",19),e._uU(35,"add_circle"),e.qZA(),e.TgZ(36,"span",15),e._uU(37,"Th\xeam"),e.qZA()()()()(),e.TgZ(38,"div",3)(39,"div",20),e.YNc(40,I,7,5,"div",21),e.qZA()()()(),e.YNc(41,J,10,0,"ng-template",null,22,e.W1O)}2&t&&(e.xp6(40),e.Q6J("ngForOf",n.Filtertags))},dependencies:[h.sg,A.lW,d.ZT,d.uh,d.xY,d.H8,m.KE,m.hX,m.qo,C.Nt,T.jA,T.kh,T.LW,S.gM,u.lC,u.rH,u.Od],styles:[".tag[_ngcontent-%COMP%]   .mat-drawer-container[_ngcontent-%COMP%]{height:100vh}"]}),a})();var k=r(1094),H=r(8872),q=r(9016),L=r(3238),B=r(4385);function Y(a,s){if(1&a){const t=e.EpF();e.TgZ(0,"span",35),e.NdJ("click",function(){e.CHM(t);const l=e.oxw();return e.KtG(l.onSubmit())}),e._uU(1,"T\u1ea1o m\u1edbi"),e.qZA()}}function G(a,s){if(1&a){const t=e.EpF();e.TgZ(0,"span",36),e.NdJ("click",function(){e.CHM(t);const l=e.oxw();return e.KtG(l.updateTag())}),e._uU(1,"C\u1eadp nh\u1eadt"),e.qZA()}}function Q(a,s){if(1&a&&(e.ynx(0),e._UZ(1,"img",12),e.BQk()),2&a){const t=e.oxw(2);e.xp6(1),e.s9C("src",t.tag.Hinhanh.spath,e.LSH)}}function j(a,s){if(1&a&&e._UZ(0,"img",12),2&a){const t=e.oxw(2);e.MGl("src","https://drive.google.com/uc?id=",t.tag.Hinhanh.idDrive,"",e.LSH)}}function K(a,s){if(1&a){const t=e.EpF();e.ynx(0),e.TgZ(1,"div",37)(2,"div",10)(3,"span",11),e._uU(4,"Server"),e.qZA(),e.YNc(5,Q,2,1,"ng-container",13),e.YNc(6,j,1,1,"ng-template",null,14,e.W1O),e.TgZ(8,"span",38),e.NdJ("click",function(){e.CHM(t);const l=e.oxw();return e.KtG(l.removeSimpleImage("ContentImage"))}),e._uU(9," cancel "),e.qZA()()(),e.BQk()}if(2&a){const t=e.MAs(7),n=e.oxw();e.xp6(5),e.Q6J("ngIf",""!=n.tag.Hinhanh.spath)("ngIfElse",t)}}function z(a,s){1&a&&(e.TgZ(0,"div",39),e._UZ(1,"img",40),e.TgZ(2,"div"),e._uU(3,"Ch\u01b0a c\xf3 h\xecnh \u1ea3nh"),e.qZA()())}const v=function(){return{standalone:!0}};let b=(()=>{class a{constructor(t,n,l,i,o){this.route=t,this._tagService=n,this._danhmucService=l,this._sanphamService=i,this._NotifierService=o,this.tag={Tieude:"",Loaitag:0,Hinhanh:{spath:"",idDrive:""},Image:"",Ordering:0},this.percentage=0,this.nest=(g,c="",W="pid")=>{if(g)return g?.filter(f=>f[W]==c).map(f=>({...f,children:this.nest(g,f.id)}))}}onFileBrowse(t){let n=t.target.files[0];const l=new FormData;l.append("file",n),this._danhmucService.uploadDriver(l).subscribe(i=>{i&&(this.tag.Image=i.idDrive)})}removeSimpleImage(t){this.tag.Hinhanh={}}Uploadfile(t,n,l){const i=t.target.files[0],o=new FormData;o.append("file",i),o.append("alt",l),o.append("idDrive","0AKQL50NKsue5Uk9PVA"),o.append("parents","['1_3htpPNQTxMi2sDQZes2WGWXPNwRxDYv']"),this._sanphamService.uploadDriver(o).subscribe(g=>{g&&(this.tag.Hinhanh=g,this._tagService.updateTag(this.tag).subscribe(c=>{c&&(console.log(c),this._NotifierService.notify("success","Upload th\xe0nh c\xf4ng"))}))})}onSubmit(){this._tagService.postTag(this.tag).subscribe()}updateTag(){this._tagService.updateTag(this.tag).subscribe(t=>{t&&alert("C\u1eadp nh\u1eadt th\xe0nh c\xf4ng")})}ngOnInit(){this.route.params.subscribe(t=>{this.id=t.id,this.id&&(this._tagService.getTagDetail(this.id).subscribe(),this._tagService.tag$.subscribe(n=>{n&&(this.tag=n)}))})}}return a.\u0275fac=function(t){return new(t||a)(e.Y36(u.gz),e.Y36(_.i),e.Y36(k.a),e.Y36(H.D),e.Y36(q.lG))},a.\u0275cmp=e.Xpm({type:a,selectors:[["taza-base-tag-detail"]],decls:60,vars:15,consts:[[1,"!flex","flex-col","flex-auto","min-w-0","relative","bg-white"],[1,"relative","border-b-2","flex","flex-row","justify-between","items-center","p-3"],[1,"text-xl"],[1,"flex","items-center","w-full"],["class","px-3 py-1 text-white rounded bg-green-500 cursor-pointer",3,"click",4,"ngIf"],["class","px-3 py-1 text-white rounded bg-blue-500 cursor-pointer",3,"click",4,"ngIf"],[1,"relative","h-full","w-full","overflow-auto","flex","flex-row","space-x-2","justify-between","p-4"],[1,"w-1/2"],[1,"flex","flex-col","space-y-2","p-4","shadow"],[1,"font-bold","text-center"],[1,"relative","w-full","min-h-[14rem]","h-","bg-gray-100","border","border-gray-200","rounded-lg","dark:bg-gray-800","dark:border-gray-700"],[1,"bg-blue-200","text-xs","font-medium","text-blue-800","text-center","p-0.5","leading-none","rounded-full","px-2","dark:bg-blue-900","dark:text-blue-200","absolute","-translate-y-1/2","translate-x-1/2","right-1/2"],[3,"src"],[4,"ngIf","ngIfElse"],["elseTemplate",""],[1,"space-y-3","text-center"],[1,"flex","flex-row","space-x-3","justify-between","text-sm"],["appearance","outline",1,"w-full"],["matInput","","placeholder","Alt H\xecnh",1,"w-full"],["altInput1",""],["mat-raised-button","","color","primary",3,"click"],["type","file","accept","image/*",1,"hidden",3,"change"],["fileInput1",""],[1,"text-xs"],[1,"flex","flex-col","space-y-2","text-sm","w-full"],["appearance","outline",1,"flex","w-full"],["matInput","","type","text","placeholder","T\u1ea9y trang",1,"w-full","text-xs",3,"ngModel","ngModelOptions","ngModelChange"],[1,"flex","flex-row","space-x-3"],[3,"ngModel","ngModelOptions","ngModelChange"],["value","0"],["value","1"],[1,"flex","flex-col","text-center","min-w-[100px]","p-2","hover:bg-gray-200"],[1,"material-icons"],[1,"text-sm"],["matInput","","type","text","placeholder","Ordering",1,"w-full","text-xs",3,"ngModel","ngModelOptions","ngModelChange"],[1,"px-3","py-1","text-white","rounded","bg-green-500","cursor-pointer",3,"click"],[1,"px-3","py-1","text-white","rounded","bg-blue-500","cursor-pointer",3,"click"],[1,"relative"],[1,"material-icons","absolute","right-[-10px]","top-[-10px]","cursor-pointer",3,"click"],[1,"text-center"],["src","/assets/image/logo.svg",1,"m-auto","w-32"]],template:function(t,n){if(1&t){const l=e.EpF();e.TgZ(0,"div",0)(1,"div",1),e._UZ(2,"div"),e.TgZ(3,"div",2),e._uU(4),e.qZA(),e.TgZ(5,"div")(6,"div",3),e.YNc(7,Y,2,0,"span",4),e.YNc(8,G,2,0,"span",5),e.qZA()()(),e.TgZ(9,"div",6)(10,"div",7)(11,"div",8)(12,"div",9),e._uU(13,"Content Image"),e.qZA(),e.TgZ(14,"div",10)(15,"span",11),e._uU(16,"Cloud"),e.qZA(),e._UZ(17,"img",12),e.qZA(),e.YNc(18,K,10,2,"ng-container",13),e.YNc(19,z,4,0,"ng-template",null,14,e.W1O),e.TgZ(21,"div",15)(22,"div",16)(23,"mat-form-field",17)(24,"mat-label"),e._uU(25,"Alt H\xecnh"),e.qZA(),e._UZ(26,"input",18,19),e.qZA(),e.TgZ(28,"div")(29,"button",20),e.NdJ("click",function(){e.CHM(l);const o=e.MAs(33);return e.KtG(o.click())}),e.TgZ(30,"span"),e._uU(31,"Upload"),e.qZA(),e.TgZ(32,"input",21,22),e.NdJ("change",function(o){e.CHM(l);const g=e.MAs(27);return e.KtG(n.Uploadfile(o,"",g.value))}),e.qZA()()()(),e.TgZ(34,"div",23),e._uU(35,"K\xedch Th\u01b0\u1edbc File (800x800)px | \u0110\u1ecbnh d\u1ea1ng : .png,jpg | Dung L\u01b0\u1ee3ng File d\u01b0\u1edbi 1MB "),e.qZA()()()(),e.TgZ(36,"div",24)(37,"mat-form-field",25)(38,"mat-label"),e._uU(39," Ti\xeau \u0111\u1ec1"),e.qZA(),e.TgZ(40,"input",26),e.NdJ("ngModelChange",function(o){return n.tag.Tieude=o}),e.qZA()(),e.TgZ(41,"div",27)(42,"mat-form-field",17)(43,"mat-label"),e._uU(44,"Lo\u1ea1i Tags"),e.qZA(),e.TgZ(45,"mat-select",28),e.NdJ("ngModelChange",function(o){return n.tag.Loaitag=o}),e.TgZ(46,"mat-option",29),e._uU(47,"T\xecnh tr\u1ea1ng da"),e.qZA(),e.TgZ(48,"mat-option",30),e._uU(49,"Lo\u1ea1i s\u1ea3n ph\u1ea9m"),e.qZA()()(),e.TgZ(50,"div")(51,"div",31)(52,"span",32),e._uU(53,"add_circle"),e.qZA(),e.TgZ(54,"span",33),e._uU(55,"Th\xeam M\u1edbi"),e.qZA()()()(),e.TgZ(56,"mat-form-field",25)(57,"mat-label"),e._uU(58," Ordering"),e.qZA(),e.TgZ(59,"input",34),e.NdJ("ngModelChange",function(o){return n.tag.Ordering=o}),e.qZA()()()()()}if(2&t){const l=e.MAs(20);e.xp6(4),e.Oqu(n.tag.Tieude),e.xp6(3),e.Q6J("ngIf",!n.id),e.xp6(1),e.Q6J("ngIf",n.id),e.xp6(9),e.MGl("src","https://drive.google.com/uc?id=",n.tag.Image,"",e.LSH),e.xp6(1),e.Q6J("ngIf",n.tag.Image)("ngIfElse",l),e.xp6(22),e.Q6J("ngModel",n.tag.Tieude)("ngModelOptions",e.DdM(12,v)),e.xp6(5),e.Q6J("ngModel",n.tag.Loaitag)("ngModelOptions",e.DdM(13,v)),e.xp6(14),e.Q6J("ngModel",n.tag.Ordering)("ngModelOptions",e.DdM(14,v))}},dependencies:[h.O5,p.Fj,p.JJ,p.On,L.ey,A.lW,m.KE,m.hX,C.Nt,B.gD]}),a})(),P=(()=>{class a{}return a.\u0275fac=function(t){return new(t||a)},a.\u0275mod=e.oAB({type:a}),a.\u0275inj=e.cJS({imports:[h.ez,p.u5,y.JF,M.q,p.UX,E.kz,w.Z_,u.Bz.forChild([{path:"",component:O,children:[{path:"",component:b},{path:":id",component:b}]}]),u.Bz]}),a})()}}]);