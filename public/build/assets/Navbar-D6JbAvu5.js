import{r as x,K as m,m as g,j as e,$ as h}from"./app-BtWbPvnG.js";import{G as p}from"./iconBase-CXF7Z-H8.js";function u(t){return p({tag:"svg",attr:{viewBox:"0 0 448 512"},child:[{tag:"path",attr:{d:"M288 64c0 17.7-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l224 0c17.7 0 32 14.3 32 32zm0 256c0 17.7-14.3 32-32 32L32 352c-17.7 0-32-14.3-32-32s14.3-32 32-32l224 0c17.7 0 32 14.3 32 32zM0 192c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 224c-17.7 0-32-14.3-32-32zM448 448c0 17.7-14.3 32-32 32L32 480c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"},child:[]}]})(t)}function j({onShow:t}){var r,l,n;const[a,d]=x.useState(!1),{auth:s}=m().props,{post:o}=g(),c=window.location.origin,i=b=>{o(route("logout"),{},{onSuccess:()=>{console.log("Logged out successfully")}})};return e.jsx(e.Fragment,{children:e.jsx("nav",{className:"bg-white border-b dark:bg-gray-900",children:e.jsxs("div",{className:"max-w-screen-2xl flex flex-wrap items-center mx-auto px-4 py-3",children:[e.jsx("button",{onClick:t,className:"bg-white h-10 w-10 mr-2 flex justify-center items-center z-[5] border",children:e.jsx(u,{className:"text-gray-600"})}),e.jsx("div",{className:"text-md hidden text-green-600 text-xl md:block font-banglaTitle ",children:e.jsxs("div",{children:[e.jsx("span",{className:"font-semibold text-xl",children:(r=s==null?void 0:s.user)==null?void 0:r.name})," কে ","ড্যশবোর্ড প্যনেলে স্বাগতম"]})}),e.jsxs(h,{href:"/dashboard",className:"flex items-center space-x-3 rtl:space-x-reverse md:hidden",children:[e.jsx("img",{src:`${c}/images/logo.png`,className:"h-10",alt:"madrasatu ahmad"}),e.jsx("span",{className:"self-center font-banglaTitle text-md md:text-2xl font-semibold whitespace-nowrap dark:text-white",children:"মাদরাসাতু আহমাদ"})]}),e.jsxs("div",{className:"flex relative items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse ml-auto",children:[e.jsxs("button",{onClick:()=>d(!a),type:"button",className:"flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600",id:"user-menu-button","aria-expanded":"false","data-dropdown-toggle":"user-dropdown","data-dropdown-placement":"bottom",children:[e.jsx("span",{className:"sr-only",children:"Open user menu"}),e.jsx("img",{className:"w-10 h-10 rounded-full",src:"https://i.postimg.cc/JhBqDrXN/FB-IMG-1695654585761.png",alt:"user photo"})]}),a&&e.jsxs("div",{className:"z-10 pb-4 text-center absolute border right-0 top-6 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600",id:"user-dropdown",children:[e.jsxs("div",{className:"px-4 py-3",children:[e.jsx("span",{className:"block text-sm text-gray-900 dark:text-white font-banglaTitle",children:(l=s==null?void 0:s.user)==null?void 0:l.name}),e.jsx("span",{className:"block text-sm  text-gray-500 truncate dark:text-gray-400 font-banglaTitle",children:(n=s==null?void 0:s.user)==null?void 0:n.email})]}),e.jsxs("ul",{className:"py-2","aria-labelledby":"user-menu-button",children:[e.jsx("li",{className:"mb-2",children:e.jsx("a",{href:"#",className:"font-banglaTitle block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white",children:"My Profile"})}),e.jsx("li",{children:e.jsx("button",{onClick:i,className:"mx-auto font-banglaTitle bg-red-700 text-white block px-4 py-2 text-sm hover:bg-red-600 rounded dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white",children:"Sign out"})})]})]})]})]})})})}export{j as default};
