import{K as f,r as p,j as r}from"./app-8ICf-Exk.js";import s from"./Dashboard-CQ_W36Rp.js";import x from"./PageHeader-Cwk1gAul.js";import{s as o}from"./index-DaKDFMmQ.js";import d from"./Table-Cn7jq9K5.js";import a from"./TableData-Blh55tAh.js";import n from"./TableRow-DuNiiM4W.js";import"./moment-C5S46NFB.js";import h from"./EditBtn-ENACPDVL.js";import{y as j}from"./index-C_mG8bgr.js";import b from"./Status-o9c4LhSk.js";import N from"./DownloadBtn-DMaYY2hU.js";import g from"./Pagination-C4RJp_qi.js";import u from"./ViewBtn-Diqt7_hN.js";import w from"./Search-OL2ixHnV.js";import v from"./Download-BmbuWGck.js";import{a as T}from"./dateTime-By4nQQm4.js";import"./index-BjiWfgUh.js";import"./iconBase-BwOIGpdI.js";import"./index-BdCCk12d.js";import"./Filter-CZmF_Jfg.js";import"./BlurDiv-B1JagiG4.js";import"./Loading-C0CRg_Wd.js";import"./select2-BKeSVKc4.js";import"./index-Bvzseeto.js";function W({admissions:e,years:c,sectors:m}){const{flash:l}=f().props;p.useEffect(()=>{l.success&&j(l.success)},[l.success]);const i=["দাখেলা","ছাত্রের নাম","পিতার নাম","মোবাইল নং","বিভাগ / বর্ষ","স্টাটাস","ভর্তির তারিখ","একশন"];return r.jsxs(s,{children:[r.jsx(x,{title:"সকল ছাত্র",subTitle:"চলতি বছরের সকল ছাত্রের তথ্য",backLink:o("admission.index"),addLink:o("admission.create")}),r.jsxs("div",{className:"flex flex-col-reverse sm:flex-row-reverse md:flex-row justify-between mb-4 ",children:[r.jsx(w,{}),r.jsx(v,{years:c,sectors:m})]}),r.jsxs("div",{className:"relative",children:[r.jsxs(d,{headers:i,children:[(e==null?void 0:e.data.length)>0&&(e==null?void 0:e.data.map(t=>r.jsxs(n,{children:[r.jsx(a,{className:"border",children:r.jsx("span",{className:"font-banglaTitle font-medium",children:t.reg_id})}),r.jsx(a,{className:"border",children:t.name}),r.jsx(a,{className:"border",children:t.father_name}),r.jsx(a,{className:"border",children:r.jsx("span",{className:"font-banglaTitle font-medium",children:t.phone})}),r.jsx(a,{className:"border",children:t.sector.sector}),r.jsx(a,{className:"border",children:r.jsx(b,{status:t.status})}),r.jsx(a,{className:"border font-banglaTitle",children:T(t.created_at)}),r.jsxs(a,{className:"border flex",children:[r.jsx(h,{href:o("admission.edit",t.id)}),r.jsx(N,{href:o("vorti.pdf",t.id)}),r.jsx(u,{href:o("admission.view",t.id)})]})]},t.id))),(e==null?void 0:e.data.length)==0&&r.jsx("tr",{children:r.jsx("td",{colSpan:7,className:"border py-3 text-center",children:"কোনো তথ্য পাওয়া যায় নি"})})]}),r.jsx(g,{data:e.links,from:e.from,to:e.to,total:e.total,current_page:e.current_page})]})]})}export{W as default};
