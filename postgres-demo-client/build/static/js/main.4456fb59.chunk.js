(this["webpackJsonppostgres-demo-client"]=this["webpackJsonppostgres-demo-client"]||[]).push([[0],{122:function(e,t,a){e.exports=a(171)},127:function(e,t,a){},171:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),r=a(8),s=a.n(r),i=a(25),c=a(11),o=a(217),u=a(77),m=a.n(u),d=(a(127),a(22)),h=a(23),f=a(28),g=a(26),p=a(43),E=a(19),v=a.n(E),b=a(202),S=a(203),C=a(55),y=a(204),j=a(206),O=a(205),_=a(212),k=a(4),N=a(108),x=a(210),I=a(222),A=a(220),D=a(224),W=a(207),w=a(221),F=a(211),L=a(107),q=a.n(L),M=function(e){Object(f.a)(a,e);var t=Object(g.a)(a);function a(e,n){var l;return Object(d.a)(this,a),(l=t.call(this,e,n)).handleSort=function(e){console.log(e.target.name),"ascending"===e.target.value||"descending"===e.target.value?(l.setState({sortOrder:e.target.value}),v.a.get("/api/students/".concat(e.target.value)).then((function(e){var t=[];e.data.forEach((function(e){return t.push(e)})),l.setState({students:t}),l.displayStudents()}),(function(e){console.log("sorting failed  ",e)}))):v.a.get("/api/students").then((function(e){var t=[];e.data.forEach((function(e){t.push(e)})),l.setState({students:t}),console.log("this is from React: ",e.data),l.displayStudents()})).catch((function(e){console.log(e)}))},l.handleChange=function(e){l.setState(Object(p.a)({},e.target.name,e.target.value))},l.handleSearch=function(){v.a.post("/api/search",{first:l.state.first_search}).then((function(e){var t=[];console.log(e.data),e.data.forEach((function(e){return t.push(e)})),l.setState({students:t})})).catch((function(e){return console.log(e)}))},l.handleDelete=function(e){v.a.post("/api/delete/".concat(e)).then((function(){console.log("deleted user");var t=l.state.students.filter((function(t){if(t.id!==e)return t}));l.setState({students:t})}))},l.displayStudents=function(){l.setState({loading:!1})},l.state={students:[],loading:!0},l}return Object(h.a)(a,[{key:"componentDidMount",value:function(){var e=this;this.state.students===[]?this.setState({loading:!1}):v.a.get("/api/students").then((function(t){t.data.forEach((function(t){e.state.students.push(t)})),console.log("this is from React: ",t.data),e.displayStudents()})).catch((function(e){console.log(e)}))}},{key:"render",value:function(){var e=this,t=this.props.classes;return l.a.createElement(N.a,{className:t.paper},l.a.createElement(b.a,null,l.a.createElement(S.a,null,l.a.createElement(y.a,null,l.a.createElement(O.a,null,l.a.createElement(j.a,null,"First Name"),l.a.createElement(j.a,null,"Last Name"),l.a.createElement(j.a,null,"Email"),l.a.createElement(j.a,null,"Age"),l.a.createElement(j.a,{size:"small"},l.a.createElement(W.a,{component:"fieldset"},l.a.createElement(I.a,null,"Sort"),l.a.createElement(A.a,{autoWidth:!0,name:"ascending",color:"primary",onChange:this.handleSort},l.a.createElement(D.a,{value:"none"},"None"),l.a.createElement(D.a,{value:"ascending"},"A-Z"),l.a.createElement(D.a,{value:"descending"},"Z-A")))),l.a.createElement(j.a,{size:"small"},l.a.createElement(W.a,null,l.a.createElement(w.a,{label:"Search",name:"first_search",onChange:this.handleChange,InputProps:{endAdornment:l.a.createElement(x.a,{position:"start"},l.a.createElement(F.a,{onClick:this.handleSearch},l.a.createElement(q.a,null)))}}))))),this.state.loading?l.a.createElement(C.a,null,"loading..."):this.state.students.map((function(t){return l.a.createElement(O.a,null,l.a.createElement(j.a,null,t.first_name),l.a.createElement(j.a,null,t.last_name),l.a.createElement(j.a,null,t.email),l.a.createElement(j.a,null,t.age),l.a.createElement(j.a,null,l.a.createElement(_.a,{component:i.b,to:"/api/edit-student/".concat(t.id)},"View")),l.a.createElement(j.a,null,l.a.createElement(_.a,{component:i.b,onClick:function(){return e.handleDelete(t.id)},color:"secondary"},"Delete")))})))))}}]),a}(n.Component),T=Object(k.a)({paper:{width:"80%",marginLeft:"auto",marginRight:"auto"}})(M),R=a(216),V=a(214),z=a(213),B=a(68),H=a.n(B),J=a(215),P=function(e){Object(f.a)(a,e);var t=Object(g.a)(a);function a(e,n){var l;return Object(d.a)(this,a),(l=t.call(this,e,n)).handleInput=function(e){l.setState(Object(p.a)({},e.target.name,e.target.value))},l.handleEdit=function(){l.setState({edit:!0})},l.handleCancel=function(){l.setState({edit:!1})},l.handleDelete=function(){v.a.post("/api/delete/".concat(l.state.studentId)).then((function(e){l.setState({redirect:!0})})).catch((function(e){console.log(e)}))},l.handleSave=function(e){e.preventDefault(),l.setState({loading:!0}),v.a.post("/api/update-student/".concat(l.state.studentId),l.state).then((function(e){l.setState({student:e.data[0]}),l.setState({edit:!1}),l.setState({loading:!1}),console.log(e.data)})).catch((function(e){console.log(e)}))},l.state={loading:!0,redirect:!1,studentId:l.props.student,student:{},edit:!1,first_name:"",last_name:"",email:"",age:0},l}return Object(h.a)(a,[{key:"componentDidMount",value:function(){var e=this;v.a.get("/api/edit-student/".concat(this.state.studentId)).then((function(t){e.setState({student:t.data[0]})})).catch((function(e){console.log(e)}))}},{key:"render",value:function(){var e=this,t=this.props.classes;return this.state.redirect?l.a.createElement(c.a,{to:"/"}):l.a.createElement("div",{className:"page-container"},l.a.createElement(z.a,{container:!0,direction:"row",justify:"center"},l.a.createElement(z.a,{item:!0,xs:6,sm:3,md:8},l.a.createElement(V.a,null,l.a.createElement(J.a,{title:"".concat(this.state.student.first_name," ").concat(this.state.student.last_name)}),l.a.createElement("hr",null),!this.state.edit&&l.a.createElement(R.a,null,l.a.createElement(C.a,{variant:"h5",className:t.items},"First Name: ",this.state.student.first_name),l.a.createElement(C.a,{variant:"h5",className:t.items},"Last Name: ",this.state.student.last_name),l.a.createElement(C.a,{variant:"h5",className:t.items},"Email Address: ",this.state.student.email),l.a.createElement(C.a,{variant:"h5",className:t.items},"Age: ",this.state.student.age),l.a.createElement(_.a,{color:"primary",variant:"contained",onClick:this.handleEdit},"Edit")," ",l.a.createElement(_.a,{color:"secondary",onClick:this.handleDelete},"Delete")),this.state.edit&&l.a.createElement(R.a,null,l.a.createElement("form",{noValidate:!0,autoComplete:"off"},l.a.createElement(w.a,{name:"first_name",label:"First name",fullWidth:!0,placeholder:this.state.student.first_name,onChange:this.handleInput}),l.a.createElement(w.a,{name:"last_name",label:"Last name",fullWidth:!0,placeholder:this.state.student.last_name,onChange:this.handleInput}),l.a.createElement(w.a,{type:"email",name:"email",label:"Email",fullWidth:!0,placeholder:this.state.student.email,onChange:function(t){return e.handleInput(t)}}),l.a.createElement(w.a,{type:"number",name:"age",label:"Age",fullWidth:!0,placeholder:this.state.student.age.toString(),onChange:function(t){return e.handleInput(t)}}),l.a.createElement(_.a,{onClick:function(t){return e.handleSave(t)},variant:"contained",type:"submit"},"save")," ",l.a.createElement(_.a,{variant:"contained",onClick:this.handleCancel},"cancel")))))))}}]),a}(n.Component),Z=H()({items:{padding:10},title:{padding:10}})(P),G=function(e){Object(f.a)(a,e);var t=Object(g.a)(a);function a(e,n){var l;return Object(d.a)(this,a),(l=t.call(this,e,n)).state={students:[],loading:!0},l}return Object(h.a)(a,[{key:"render",value:function(){var e=this.props.match.params;return l.a.createElement("main",null,l.a.createElement("h1",null,"Home"),0===Object.keys(e).length?l.a.createElement(T,null):l.a.createElement(Z,{student:this.props.match.params.student}))}}]),a}(n.Component),K=a(218),Q=a(219),U=function(e){Object(f.a)(a,e);var t=Object(g.a)(a);function a(){return Object(d.a)(this,a),t.apply(this,arguments)}return Object(h.a)(a,[{key:"render",value:function(){return l.a.createElement(K.a,null,l.a.createElement(Q.a,{className:"navbar"},l.a.createElement(_.a,{component:i.b,to:"/"},"Home"),l.a.createElement(_.a,{component:i.b,to:"/add-student"},"Add Student")))}}]),a}(n.Component),X=function(e){Object(f.a)(a,e);var t=Object(g.a)(a);function a(e,n){var l;return Object(d.a)(this,a),(l=t.call(this,e,n)).componentDidMount=function(){l.setState({loading:!1})},l.handleChange=function(e){l.setState(Object(p.a)({},e.target.name,e.target.value))},l.handleCreate=function(e){e.preventDefault();var t=l.state,a=t.first_name,n=t.last_name,r=t.email,s=t.age;a.length?l.setState({firstErr:!1}):l.setState({firstErr:!0}),n.length?l.setState({lastErr:!1}):l.setState({lastErr:!0}),r.length?l.setState({emailErr:!1}):l.setState({emailErr:!0}),s.length?l.setState({ageErr:!1}):l.setState({ageErr:!0}),a.length&&n.length&&r.length&&s.length&&v.a.post("/api/add-student",l.state).then((function(e){l.setState({redirect:!0})}))},l.state={loading:!0,redirect:!1,first_name:"",last_name:"",email:"",age:"",firstErr:!1,lastErr:!1,emailErr:!1,ageErr:!1,buttonState:!1},l}return Object(h.a)(a,[{key:"render",value:function(){var e=this.state,t=e.loading,a=e.redirect,n=e.firstErr,r=e.lastErr,s=e.emailErr,i=e.ageErr,o=e.buttonState,u=this.props.classes;return t?l.a.createElement("div",null,"Loading..."):a?l.a.createElement(c.a,{to:"/"}):l.a.createElement("div",{className:"page-container"},l.a.createElement(z.a,{container:!0,direction:"row",justify:"center"},l.a.createElement(z.a,{item:!0,xs:6,sm:3,md:8},l.a.createElement(V.a,{className:u.contentArea},l.a.createElement(J.a,{className:u.heading,title:"Welcome!",subheader:"Please enter your information"}),l.a.createElement(R.a,null,l.a.createElement("form",{noValidate:!0,autoComplete:"off"},l.a.createElement(w.a,{type:"text",name:"first_name",label:"First Name",required:!0,fullWidth:!0,error:n,autoFocus:!0,onChange:this.handleChange}),l.a.createElement(w.a,{type:"text",required:!0,name:"last_name",label:"Last Name",fullWidth:!0,error:r,onChange:this.handleChange}),l.a.createElement(w.a,{type:"email",name:"email",label:"Email",fullWidth:!0,required:!0,error:s,onChange:this.handleChange}),l.a.createElement(w.a,{type:"number",name:"age",label:"Age",required:!0,fullWidth:!0,error:i,onChange:this.handleChange}),l.a.createElement(_.a,{color:"primary",disabled:o,variant:"contained",fullWidth:!0,onClick:this.handleCreate,className:u.buttonStyle},"Create")))))))}}]),a}(n.Component),Y=H()({items:{padding:10},title:{padding:10},heading:{display:"flex",justifyContent:"center",alignItems:"center",flexFlow:"column",marginTop:80},contentArea:{display:"flex",justifyContent:"center",alignItems:"center",flexFlow:"column",margin:10},itemMargin:{margin:10},buttonStyle:{marginTop:20,marginBottom:30}})(X),$=m()({palette:{primary:{light:"#757ce8",main:"#3f50b5",dark:"#002884",contrastText:"#fff"},secondary:{light:"#ff7961",main:"#f44336",dark:"#ba000d",contrastText:"#000"}}});var ee=function(){return l.a.createElement(o.a,{theme:$},l.a.createElement("main",{className:"App"},l.a.createElement(i.a,null,l.a.createElement(U,null),l.a.createElement(c.d,null,l.a.createElement(c.b,{exact:!0,path:"/",component:G}),l.a.createElement(c.b,{exact:!0,path:"/add-student",component:Y}),l.a.createElement(c.b,{path:"/api/edit-student/:student",component:G})))))};s.a.render(l.a.createElement(ee,null),document.getElementById("root"))}},[[122,1,2]]]);
//# sourceMappingURL=main.4456fb59.chunk.js.map