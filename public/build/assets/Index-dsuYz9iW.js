import{K as c,r as m,j as s}from"./app-8ICf-Exk.js";import l from"./Dashboard-CQ_W36Rp.js";import n from"./PageHeader-Cwk1gAul.js";import{s as o}from"./index-DaKDFMmQ.js";import f from"./Table-Cn7jq9K5.js";import e from"./TableData-Blh55tAh.js";import p from"./TableRow-DuNiiM4W.js";import{h as i}from"./moment-C5S46NFB.js";import x from"./EditBtn-ENACPDVL.js";import{y as u}from"./index-C_mG8bgr.js";import b from"./Status-o9c4LhSk.js";import"./index-BjiWfgUh.js";import"./iconBase-BwOIGpdI.js";import"./index-BdCCk12d.js";function L({months:t}){const{flash:a}=c().props;m.useEffect(()=>{a.success&&u(a.success)},[a.success]);const d=["মাসের নাম","শিক্ষাবর্ষ","মোট শিক্ষার্থী","নতুন ভর্তি","বিদায়","স্টাটাস","তৈরীর তারিখ","আপডেটের তারিখ","একশন"];return s.jsxs(l,{children:[s.jsx(n,{title:"সকল মাস",subTitle:"সকল মাসের তথ্য",backLink:o("dashboard"),addLink:o("month.create")}),s.jsx(f,{headers:d,children:t.map(r=>s.jsxs(p,{children:[s.jsx(e,{className:"border",children:r.month}),s.jsx(e,{className:"border",children:r.year.year}),s.jsx(e,{className:"border",children:r.admissions_count?r.admissions_count:"0"}),s.jsx(e,{className:"border",children:r.admissions_count?r.admissions_count:"0"}),s.jsx(e,{className:"border",children:r.admissions_count?r.admissions_count:"0"}),s.jsx(e,{className:"border",children:s.jsx(b,{status:r.status})}),s.jsx(e,{className:"border font-banglaTitle",children:i(r.created_at).format("MMM-D-YYYY, h:mm A")}),s.jsx(e,{className:"border font-banglaTitle",children:i(r.updated_at).format("MMM-D-YYYY, h:mm A")}),s.jsx(e,{className:"flex",children:s.jsx(x,{href:o("month.edit",r.id)})})]},r.id))})]})}export{L as default};