import{K as m,r as d,j as e}from"./app-BtWbPvnG.js";import n from"./Dashboard-BB309s4x.js";import l from"./PageHeader-zdvXrL8c.js";import{s as a}from"./Sidebar-BnSSIqUb.js";import x from"./Table-DnY-eexq.js";import r from"./TableData-DeDRV9ll.js";import p from"./TableRow-AwITs1tu.js";import"./moment-C5S46NFB.js";import f from"./EditBtn-Djw46hHA.js";import{y as b}from"./index-C3nG6Yvv.js";import u from"./Status-LlOSTh4o.js";import{g as o}from"./dateTime-By4nQQm4.js";import"./Navbar-D6JbAvu5.js";import"./iconBase-CXF7Z-H8.js";import"./index-DVyDiad_.js";import"./index-DSkXDQtU.js";function P({years:i}){const{flash:s}=m().props;d.useEffect(()=>{s.success&&b(s.success)},[s.success]);const c=["শিক্ষাবর্ষ","মোট শিক্ষার্থী","স্টাটাস","তৈরীর তারিখ","আপডেটের তারিখ","স্টাটাস"];return e.jsxs(n,{children:[e.jsx(l,{title:"সকল শিক্ষাবর্ষ",subTitle:"সকল শিক্ষাবর্ষ হালনাগাত করুন",backLink:a("dashboard"),addLink:a("year.create")}),e.jsx(x,{className:"text-center",headers:c,children:i.map(t=>e.jsxs(p,{children:[e.jsx(r,{className:"border text-center",children:t.year}),e.jsxs(r,{className:"border text-center",children:[t.admissions_count?t.admissions_count:"0"," ","জন"]}),e.jsx(r,{className:"border text-center",children:e.jsx(u,{status:t.status})}),e.jsx(r,{className:"border font-banglaTitle text-center",children:o(t.created_at)}),e.jsx(r,{className:"border font-banglaTitle text-center",children:o(t.updated_at)}),e.jsx(r,{className:"border flex justify-center",children:e.jsx(f,{href:a("year.edit",t.id)})})]},t.id))})]})}export{P as default};