import{m,j as e}from"./app-8ICf-Exk.js";import u from"./Cart-D3N_bJH0.js";import c from"./PageHeader-Cwk1gAul.js";import p from"./TextInput-VFJRzZ6V.js";import d from"./Dashboard-CQ_W36Rp.js";import x from"./Loading-C0CRg_Wd.js";import{S as f,s as b,a as j}from"./select2-BKeSVKc4.js";import"./index-BjiWfgUh.js";import"./iconBase-BwOIGpdI.js";import"./index-BdCCk12d.js";import"./index-Bvzseeto.js";function A(){const{data:o,setData:a,post:i,processing:s,errors:r,reset:l}=m({year:"",status:"active"});function n(t){t.preventDefault(),i(route("year.store"),{onSuccess:()=>{l()}})}return e.jsxs(d,{children:[e.jsx(c,{title:"নতুন শিক্ষাবর্ষ",subTitle:"নতুন শিক্ষাবর্ষ তৈরী করুন",backLink:route("year.index"),addLink:null}),e.jsxs(u,{title:"নতুন শিক্ষাবর্ষ তৈরী",children:[e.jsxs("form",{className:"space-y-6",onSubmit:n,children:[e.jsx(p,{label:"শিক্ষাবর্ষটি লিখুন",placeholder:"এখানে লিখুন",name:"year",value:o.year,onChange:t=>a("year",t.target.value)}),r.year&&e.jsx("span",{className:"text-red-500 text-sm",children:r.year}),e.jsx(f,{styles:b,isSearchable:!1,name:"status",onChange:t=>a("status",(t==null?void 0:t.value)||"active"),defaultValue:{value:"active",label:"Active"},options:j}),e.jsx("button",{disabled:s,type:"submit",className:"blue-btn",children:e.jsx("span",{className:"font-banglaTitle",children:"নতুন শিক্ষাবর্ষটি সেভ করুন"})})]}),s&&e.jsx(x,{})]})]})}export{A as default};