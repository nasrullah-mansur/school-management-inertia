import{K as m,r as d,j as e}from"./app-8ICf-Exk.js";import n from"./Dashboard-CQ_W36Rp.js";import l from"./PageHeader-Cwk1gAul.js";import{s as a}from"./index-DaKDFMmQ.js";import x from"./Table-Cn7jq9K5.js";import s from"./TableData-Blh55tAh.js";import f from"./TableRow-DuNiiM4W.js";import"./moment-C5S46NFB.js";import p from"./EditBtn-ENACPDVL.js";import{y as b}from"./index-C_mG8bgr.js";import u from"./Status-o9c4LhSk.js";import{g as o}from"./dateTime-By4nQQm4.js";import"./index-BjiWfgUh.js";import"./iconBase-BwOIGpdI.js";import"./index-BdCCk12d.js";function K({years:i}){const{flash:r}=m().props;d.useEffect(()=>{r.success&&b(r.success)},[r.success]);const c=["শিক্ষাবর্ষ","মোট শিক্ষার্থী","স্টাটাস","তৈরীর তারিখ","আপডেটের তারিখ","স্টাটাস"];return e.jsxs(n,{children:[e.jsx(l,{title:"সকল শিক্ষাবর্ষ",subTitle:"সকল শিক্ষাবর্ষ হালনাগাত করুন",backLink:a("dashboard"),addLink:a("year.create")}),e.jsx(x,{className:"text-center",headers:c,children:i.map(t=>e.jsxs(f,{children:[e.jsx(s,{className:"border text-center",children:t.year}),e.jsxs(s,{className:"border text-center",children:[t.admissions_count?t.admissions_count:"0"," ","জন"]}),e.jsx(s,{className:"border text-center",children:e.jsx(u,{status:t.status})}),e.jsx(s,{className:"border font-banglaTitle text-center",children:o(t.created_at)}),e.jsx(s,{className:"border font-banglaTitle text-center",children:o(t.updated_at)}),e.jsx(s,{className:"border flex justify-center",children:e.jsx(p,{href:a("year.edit",t.id)})})]},t.id))})]})}export{K as default};
