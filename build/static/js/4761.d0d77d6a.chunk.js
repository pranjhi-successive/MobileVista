"use strict";(self.webpackChunkmobile_app=self.webpackChunkmobile_app||[]).push([[4761],{4761:(e,s,a)=>{a.r(s),a.d(s,{default:()=>w});var t=a(8302),n=a(2690),r=a(2791),l=a(7689),o=a(1765),c=a(7833),i=a(4932),d=a(7462);const h={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zm-40 110.8V792H136V270.8l-27.6-21.5 39.3-50.5 42.8 33.3h643.1l42.8-33.3 39.3 50.5-27.7 21.5zM833.6 232L512 482 190.4 232l-42.8-33.3-39.3 50.5 27.6 21.5 341.6 265.6a55.99 55.99 0 0068.7 0L888 270.8l27.6-21.5-39.3-50.5-42.7 33.2z"}}]},name:"mail",theme:"outlined"};var u=a(4291),m=function(e,s){return r.createElement(u.Z,(0,d.Z)({},e,{ref:s,icon:h}))};const x=r.forwardRef(m);const p={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M832 464h-68V240c0-70.7-57.3-128-128-128H388c-70.7 0-128 57.3-128 128v224h-68c-17.7 0-32 14.3-32 32v384c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V496c0-17.7-14.3-32-32-32zM332 240c0-30.9 25.1-56 56-56h248c30.9 0 56 25.1 56 56v224H332V240zm460 600H232V536h560v304zM484 701v53c0 4.4 3.6 8 8 8h40c4.4 0 8-3.6 8-8v-53a48.01 48.01 0 10-56 0z"}}]},name:"lock",theme:"outlined"};var g=function(e,s){return r.createElement(u.Z,(0,d.Z)({},e,{ref:s,icon:p}))};const f=r.forwardRef(g);var v=a(3974),b=a(184);const{Link:j}=t.default,w=()=>{const e=(0,l.s0)(),[s,a]=n.ZP.useMessage(),{isAuthenticated:t}=(0,r.useContext)(c.AuthenticationContext),{setDashboardSelectedItem:d}=(0,r.useContext)(o.G),h=(e,a)=>{s.open({type:e,content:null===a||void 0===a?void 0:a.message})};return(0,r.useEffect)((()=>{d("Mobiles")}),[]),t?(0,b.jsx)(l.Fg,{to:"/dashboard",replace:!0}):(0,b.jsxs)(b.Fragment,{children:[a,(0,b.jsx)("section",{className:"bg-img",children:(0,b.jsxs)("div",{className:"content",children:[(0,b.jsx)("header",{children:"Sign in"}),(0,b.jsxs)(i.l0,{name:"login","aria-label":"login form",onFinish:async s=>{console.log("Received values of form: ",s);const a={method:"POST",url:"/auth/login",data:s};try{const s=await v.Z.request(a);localStorage.setItem("token",s.data.token),h("success",{message:"Login Successful"}),d("Mobiles"),window.location.reload(),e("/dashboard")}catch(t){h("error",{message:"Invalid credentials"})}},layout:"vertical",requiredMark:"optional",children:[(0,b.jsx)(i.xJ,{name:"email",label:"Email",rules:[{type:"email",required:!0,message:"Please input your Name!"}],children:(0,b.jsx)(i.II,{prefix:(0,b.jsx)(x,{}),placeholder:"Email"})}),(0,b.jsx)(i.xJ,{name:"password",label:"Password",rules:[{required:!0,message:"Please input your Password!"}],children:(0,b.jsx)(i.CM,{prefix:(0,b.jsx)(f,{}),type:"password",placeholder:"Password"})}),(0,b.jsxs)(i.xJ,{style:{marginBottom:"0px"},children:[(0,b.jsx)(i.zx,{block:"true",type:"primary",htmlType:"submit",children:"Log in"}),(0,b.jsxs)("div",{children:[(0,b.jsx)(i.xv,{children:"Don't have an account?"})," ",(0,b.jsx)(j,{href:"/register",children:"Sign up now"})]})]})]})]})})]})}}}]);
//# sourceMappingURL=4761.d0d77d6a.chunk.js.map