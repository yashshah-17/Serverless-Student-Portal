(this["webpackJsonpserverless-group14"]=this["webpackJsonpserverless-group14"]||[]).push([[0],{106:function(e,t,a){},121:function(e,t,a){},183:function(e,t,a){e.exports=a(315)},305:function(e,t,a){},310:function(e,t,a){},315:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),l=a(16),s=a.n(l),o=a(21),i=a(22),c=a(24),u=a(23),m=a(32),d=a(18),p=(a(121),a(368)),h=a(36),g=a.n(h),E=function(e){Object(c.a)(a,e);var t=Object(u.a)(a);function a(){var e;Object(o.a)(this,a);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(e=t.call.apply(t,[this].concat(r))).logout=function(){var t={email:localStorage.getItem("email")};g.a.post("https://pjy23k2623.execute-api.us-east-1.amazonaws.com/default/serverless-logout",t).then((function(t){console.log(t),console.log(t.data);t.data;localStorage.clear(),e.props.history.push("/login")}))},e}return Object(i.a)(a,[{key:"render",value:function(){return r.a.createElement("nav",{class:"navbar navbar-expand-lg navbar-dark bg-dark"},r.a.createElement("a",{class:"navbar-brand",href:"/"},"Learning Management System"),r.a.createElement("button",{class:"navbar-toggler",type:"button","data-toggle":"collapse","data-target":"#navbarSupportedContent","aria-controls":"navbarSupportedContent","aria-expanded":"false","aria-label":"Toggle navigation"},r.a.createElement("span",{class:"navbar-toggler-icon"})),r.a.createElement("div",{class:"collapse navbar-collapse",id:"navbarSupportedContent"},r.a.createElement("ul",{class:"navbar-nav mr-auto"},r.a.createElement("li",{class:"nav-item active"},r.a.createElement("a",{class:"nav-link",href:"/"},"Home ",r.a.createElement("span",{class:"sr-only"},"(current)"))),r.a.createElement("li",{class:"nav-item active"},r.a.createElement("a",{class:"nav-link",href:"/StudentChat"},"Chat")),r.a.createElement("li",{class:"nav-item active"},r.a.createElement("a",{class:"nav-link",href:"/machinelearning"},"Machine Learning")),r.a.createElement("li",{class:"nav-item active"},r.a.createElement("a",{class:"nav-link",href:"/dataprocessing"},"Data Processing")),r.a.createElement("li",{class:"nav-item active"},r.a.createElement("a",{class:"nav-link",href:"/systemchat"},"Talk to our chatbot")),r.a.createElement("li",{class:"nav-item active"},r.a.createElement(p.a,{color:"secondary",onClick:this.logout},"Log Out")))))}}]),a}(n.Component),v=function(e){Object(c.a)(a,e);var t=Object(u.a)(a);function a(){return Object(o.a)(this,a),t.apply(this,arguments)}return Object(i.a)(a,[{key:"render",value:function(){return r.a.createElement("nav",{class:"navbar navbar-expand-lg navbar-dark bg-dark"},r.a.createElement("a",{class:"navbar-brand",href:"/"},"Learning Management System"),r.a.createElement("button",{class:"navbar-toggler",type:"button","data-toggle":"collapse","data-target":"#navbarSupportedContent","aria-controls":"navbarSupportedContent","aria-expanded":"false","aria-label":"Toggle navigation"},r.a.createElement("span",{class:"navbar-toggler-icon"})))}}]),a}(n.Component),b=a(108),f=a.n(b),y=a(157),w=function(e){Object(c.a)(a,e);var t=Object(u.a)(a);function a(){var e;Object(o.a)(this,a);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(e=t.call.apply(t,[this].concat(r))).state={onlineUsers:[]},e}return Object(i.a)(a,[{key:"componentDidMount",value:function(){var e=Object(y.a)(f.a.mark((function e(){var t,a=this;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:null===localStorage.getItem("organization")?this.props.history.push("/login"):(t={organization:localStorage.getItem("organization"),timestamp:Date.now()},g.a.post("https://ph3t9297m6.execute-api.us-east-1.amazonaws.com/default/serverless-onlineUsers?timestamp="+Date.now(),t).then((function(e){console.log(e),console.log(e.data);var t=e.data;a.setState({onlineUsers:t})})));case 1:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(E,{history:this.props.history}),r.a.createElement("header",{className:"App-header"},r.a.createElement("p",null,"Online users."),r.a.createElement("div",null,this.state.onlineUsers.map((function(e,t){return r.a.createElement("p",{key:e.email}," ",e.firstName," ",e.secondName," ")})))))}}]),a}(n.Component),S=a(164),N=a(158),x=a.n(N),C=function(e){Object(c.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).state={newdata:{}},n}return Object(i.a)(a,[{key:"componentDidMount",value:function(){var e=this;fetch("https://helloworld-ex2gcdwlnq-uc.a.run.app/").then((function(e){return e.text()})).then((function(t){e.setState({newdata:JSON.parse(t)}),console.log(e.state.newdata)}))}},{key:"render",value:function(){for(var e=[],t=0,a=Object.entries(this.state.newdata);t<a.length;t++){var n=Object(S.a)(a[t],2),l=n[0],s=n[1];console.log(l,s);var o={text:l,value:s};e.push(o)}return r.a.createElement(r.a.Fragment,null,r.a.createElement(E,{history:this.props.history}),r.a.createElement("div",{className:"container"},r.a.createElement("br",null),r.a.createElement("h1",{align:"center"},"Welcome to Visualize the Word Cloud"),r.a.createElement("br",null),r.a.createElement("hr",null),r.a.createElement("br",null),r.a.createElement(x.a,{data:e,width:1200,height:500,fontSizeMapper:function(e){return 30*Math.log2(e.value)}})))}}]),a}(n.Component);function k(){var e={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({type:"upload",organisation:localStorage.getItem("organization")||"dalhousie"})};fetch("https://us-central1-avid-garage-282122.cloudfunctions.net/pubsub_message_post_and_retrieve",e).then((function(e){return e.json()})).then((function(e){return console.log(e)}))}var O=function(){return r.a.createElement("div",null,r.a.createElement(E,null),r.a.createElement("div",{className:"container"},r.a.createElement("br",null),r.a.createElement("h1",{align:"center"},"Welcome to the Machine Learning Dashboard"),r.a.createElement("h5",{align:"center"},"Upload some files and see how clusters are formed"),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("center",null,r.a.createElement("form",{method:"post",action:"https://us-central1-instant-grove-279600.cloudfunctions.net/uploadFile",enctype:"multipart/form-data"},r.a.createElement("input",{type:"file",id:"file",name:"file",required:!0}),r.a.createElement("input",{type:"submit",className:"btn btn-success",value:"upload"}))),r.a.createElement("br",null),r.a.createElement("hr",null),r.a.createElement("br",null),r.a.createElement("center",null,r.a.createElement("form",{method:"post",action:"https://us-central1-instant-grove-279600.cloudfunctions.net/formClusters"},r.a.createElement("input",{type:"submit",className:"btn btn-primary",value:"Create Clusters"}))),r.a.createElement("br",null),r.a.createElement("center",null,r.a.createElement("button",{onClick:k,className:"btn btn-outline-primary"},"Upload Chat File"))))},j=a(84),T=a(159),z=a(11),I=a(372),D={aws_project_region:"us-east-1",aws_cognito_identity_pool_id:"us-east-1:041d2e03-292d-400b-99b3-6f7966b932af",aws_cognito_region:"us-east-1",oauth:{},aws_bots:"enable",aws_bots_config:[{name:"BookTrip_dev",alias:"$LATEST",region:"us-east-1"}]};T.default.configure(D);var _=Object(j.a)(Object(j.a)({},z.a),{},{sectionHeader:Object(j.a)(Object(j.a)({},z.a.sectionHeader),{},{backgroundColor:"#ff6600"})}),q=function(){return r.a.createElement("div",null,r.a.createElement(E,null),r.a.createElement(I.a,{userInput:"book ticket",title:"Virtual Help",theme:_,botName:"BookTrip_dev",welcomeMessage:"Welcome, with which module can i help you?",onComplete:function(e,t){return e?void alert("Bot conversation failed, please check your network and try again."):"Thank you! what would you like to do next?"},clearOnComplete:!1,textEnabled:!0,conversationModeOn:!0}))},V=a(111),L=(a(305),a(378)),M=a(379),A=a(380),F=function(e){Object(c.a)(a,e);var t=Object(u.a)(a);function a(){var e;return Object(o.a)(this,a),(e=t.call(this)).sendMessage=function(t){var a={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({type:"publish",topicName:"university-group-chat",messageContent:{username:e.username,text:e.state.inputText,timeStamp:Date.now(),groupName:e.university}})};fetch("https://us-central1-avid-garage-282122.cloudfunctions.net/pubsub_message_post_and_retrieve",a).then((function(e){return e.json()})).then((function(e){return console.log(e)})),e.setState({inputText:""})},e.receive=function(t){fetch("https://us-central1-avid-garage-282122.cloudfunctions.net/pubsub_message_post_and_retrieve?type=allMessages&university="+e.university).then((function(e){return e.json()})).then((function(t){var a=t.map((function(t){return new V.Message({id:t.username===e.username?0:1,message:t.text,senderName:t.username})}));e.setState({messages:a})}))},e.textChange=function(t){e.setState({inputText:t.target.value})},e.keyEvent=function(t){"Enter"===t.key&&e.sendMessage()},e.state={messages:[],inputText:""},e.university=localStorage.getItem("organization")||"dalhousie",e.username=localStorage.getItem("firstName")||"annoy",e.intervalVar=null,e}return Object(i.a)(a,[{key:"componentDidMount",value:function(){this.intervalVar=setInterval(this.receive,1e3)}},{key:"componentWillUnmount",value:function(){clearInterval(this.intervalVar)}},{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(E,{history:this.props.history}),r.a.createElement("h1",null,this.university),r.a.createElement(V.ChatFeed,{messages:this.state.messages,hasInputField:!1,showSenderName:!0,bubblesCentered:!1,bubbleStyles:{text:{fontSize:20},chatbubble:{borderRadius:20,padding:10,margin:10,backgroundColor:"#5BC236"}}}),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("div",{className:"footer"},r.a.createElement(L.a,{size:"lg"},r.a.createElement(M.a,{"aria-label":"Large","aria-describedby":"inputGroup-sizing-sm",onChange:this.textChange,value:this.state.inputText,onKeyDown:this.keyEvent}),r.a.createElement(L.a.Append,null,r.a.createElement(A.a,{variant:"primary",onClick:this.sendMessage},"Send")))))}}]),a}(r.a.Component),B=a(381),P=(a(106),function(e){Object(c.a)(a,e);var t=Object(u.a)(a);function a(){var e;Object(o.a)(this,a);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(e=t.call.apply(t,[this].concat(r))).state={email:"",password:"",nameError:null,emailError:null,passwordError:null,disabled:!0,credError:null},e.isSubmitDisabled=function(){var t=!1,a=!1;""===e.state.email?e.setState({emailError:null}):e.emailValidation(e.state.email)?(t=!0,e.setState({emailError:null})):e.setState({emailError:"Please enter valid email!"}),""!==e.state.password&&e.state.password?e.state.password.length>=6?(a=!0,e.setState({passwordError:null})):e.setState({passwordError:"Your password must be at least 6 characters"}):e.setState({passwordError:null}),t&&a&&(""===e.state.name?e.setState({nameError:"Please enter name"}):t&&a&&e.setState({disabled:!1}))},e.emailValidation=function(e){return new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(e)},e.onValueChange=function(t,a){var n={};n[a]=t.target.value,e.setState(n)},e.updateText=function(t){e.setState({text:t})},e.login=function(){console.log(e.state.email);var t={email:e.state.email,password:e.state.password,timestamp:Date.now()};g.a.post("https://us-central1-serverless-proj-284222.cloudfunctions.net/serverless-signin-first",t).then((function(t){console.log(t),console.log(t.data);var a=t.data;a.error?e.setState({credError:!0}):(localStorage.setItem("idToken",a.idToken),localStorage.setItem("refreshToken",a.refreshToken),localStorage.setItem("question",a.question),localStorage.setItem("questionID",a.questionID),localStorage.setItem("email",a.email),localStorage.setItem("firstName",a.firstName),localStorage.setItem("secondName",a.secondName),localStorage.setItem("organization",a.organization),e.props.history.push("/loginSecond"))}))},e}return Object(i.a)(a,[{key:"componentDidMount",value:function(){null===localStorage.getItem("organization")||this.props.history.push("/")}},{key:"render",value:function(){var e=this;return r.a.createElement(r.a.Fragment,null,r.a.createElement(v,null),r.a.createElement("div",{className:"App-content"},r.a.createElement("div",{style:{fontSize:"30px",paddingLeft:"475px",paddingTop:"30px",margin:"auto",width:"50%"}},"Login Form"),r.a.createElement("div",{style:{paddingLeft:"475px",paddingTop:"10px",margin:"auto",width:"50%"}},r.a.createElement("div",null,r.a.createElement("div",{style:this.state.credError?{}:{display:"none"}},r.a.createElement("p",null,"Check your cred")),r.a.createElement("div",{className:"space"},r.a.createElement(B.a,{className:"input-class",floatinglabeltext:"Email",type:"email",error:null!==this.state.emailError,helperText:this.state.emailError,onChange:function(t){return e.onValueChange(t,"email")},id:"standard-basic",required:!0,label:"Email",variant:"outlined",onBlur:this.isSubmitDisabled})),r.a.createElement("div",{className:"space"},r.a.createElement(B.a,{className:"input-class",floatinglabeltext:"Password",type:"password",error:null!==this.state.passwordError,helperText:this.state.passwordError,onChange:function(t){return e.onValueChange(t,"password")},id:"standard-basic",required:!0,label:"Password",variant:"outlined",onBlur:this.isSubmitDisabled}))),r.a.createElement("div",{className:"button-class"},r.a.createElement(p.a,{disabled:this.state.disabled,onClick:this.login,variant:"contained",color:"secondary"},"Login")),r.a.createElement("a",{href:"/signup"},"New user? Register?"))))}}]),a}(n.Component)),W=function(e){Object(c.a)(a,e);var t=Object(u.a)(a);function a(){var e;Object(o.a)(this,a);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(e=t.call.apply(t,[this].concat(r))).state={question:"",answer:"",credError:null},e.onValueChange=function(t,a){var n={};n[a]=t.target.value,e.setState(n)},e.loginSecond=function(){var t={email:localStorage.getItem("email"),answer:e.state.answer,timestamp:Date.now()};g.a.post(" https://knat64zukj.execute-api.us-east-1.amazonaws.com/default/ServerlessSignInSecond",t).then((function(t){console.log(t),console.log(t.data),t.data?e.props.history.push("/"):e.setState({credError:!0})}))},e}return Object(i.a)(a,[{key:"componentDidMount",value:function(){this.setState({question:localStorage.getItem("question")})}},{key:"render",value:function(){var e=this;return r.a.createElement(r.a.Fragment,null,r.a.createElement(v,null),r.a.createElement("div",{className:"App-content"},r.a.createElement("div",{style:{fontSize:"30px",paddingLeft:"475px",paddingTop:"30px",margin:"auto",width:"50%"}},"Login Form"),r.a.createElement("div",{style:{paddingLeft:"475px",paddingTop:"10px",margin:"auto",width:"50%"}},r.a.createElement("div",null,r.a.createElement("div",{style:this.state.credError?{}:{display:"none"}},r.a.createElement("p",null,"Wrong answer")),r.a.createElement("div",{className:"space"},r.a.createElement("p",null,"Question: ",this.state.question)),r.a.createElement("div",{className:"space"},r.a.createElement(B.a,{className:"input-class",floatinglabeltext:"Answer",type:"text",onChange:function(t){return e.onValueChange(t,"answer")},id:"standard-basic",required:!0,label:"Answer",variant:"outlined"}))),r.a.createElement("div",{className:"button-class"},r.a.createElement(p.a,{onClick:this.loginSecond,variant:"contained",color:"secondary"},"Login")))))}}]),a}(n.Component),U=a(382),J=a(383),H=a(375),R=a(376),Q=function(e){Object(c.a)(a,e);var t=Object(u.a)(a);function a(){var e;Object(o.a)(this,a);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(e=t.call.apply(t,[this].concat(r))).state={email:"",password:"",firstName:"",secondName:"",organization:"",question:"1",answer:"",nameError:null,emailError:null,passwordError:null,firstNameError:null,secondNameError:null,answerError:null,organizationError:null,disabled:!0,credError:null},e.isSubmitDisabled=function(){var t=!1,a=!1,n=!1,r=!1;""===e.state.email?e.setState({emailError:null}):e.emailValidation(e.state.email)?(t=!0,e.setState({emailError:null})):e.setState({emailError:"Please enter valid email!"}),""!==e.state.password&&e.state.password?e.state.password.length>=6?(a=!0,e.setState({passwordError:null})):e.setState({passwordError:"Your password must be at least 6 characters"}):e.setState({passwordError:null}),""!==e.state.firstName&&e.state.firstName?e.state.firstName.length>=1?(n=!0,e.setState({firstNameError:null})):e.setState({firstNameError:"Enter your first name"}):e.setState({firstNameError:null}),""!==e.state.firstName&&e.state.firstName?e.state.firstName.length>=1?(n=!0,e.setState({firstNameError:null})):e.setState({firstNameError:"Enter your first name"}):e.setState({firstNameError:null}),""!==e.state.secondName&&e.state.secondName?e.state.secondName.length>=1?(r=!0,e.setState({secondNameError:null})):e.setState({secondNameError:"Enter your second name"}):e.setState({secondNameError:null}),""!==e.state.answer&&e.state.answer?e.state.answer.length>=1?(!0,e.setState({answerError:null})):e.setState({answerError:"Enter your answer"}):e.setState({answerError:null}),t&&a&&n&&r&&e.setState({disabled:!1})},e.emailValidation=function(e){return new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(e)},e.onValueChange=function(t,a){var n={};n[a]=t.target.value,e.setState(n)},e.login=function(){console.log(e.state.email);var t={email:e.state.email,password:e.state.password,firstName:e.state.firstName,secondName:e.state.secondName,organization:e.state.organization,questionID:e.state.question,answer:e.state.answer,timestamp:Date.now()};g.a.post("https://us-central1-serverless-proj-284222.cloudfunctions.net/serverless-signup",t).then((function(t){console.log(t),console.log(t.data),t.data?e.props.history.push("/login"):e.setState({credError:!0})}))},e}return Object(i.a)(a,[{key:"render",value:function(){var e=this;return r.a.createElement(r.a.Fragment,null,r.a.createElement(v,null),r.a.createElement("div",{className:"App-content"},r.a.createElement("div",{style:{fontSize:"30px",paddingLeft:"475px",paddingTop:"30px",margin:"auto",width:"50%"}},"Sign up Form"),r.a.createElement("div",{style:{paddingLeft:"475px",paddingTop:"10px",margin:"auto",width:"50%"}},r.a.createElement("div",null,r.a.createElement("div",{style:this.state.credError?{}:{display:"none"}},r.a.createElement("p",null,"User Already exists")),r.a.createElement("div",{className:"space"},r.a.createElement(B.a,{className:"input-class",floatinglabeltext:"Email",type:"email",error:null!==this.state.emailError,helperText:this.state.emailError,onChange:function(t){return e.onValueChange(t,"email")},id:"standard-basic",required:!0,label:"Email",variant:"outlined",onBlur:this.isSubmitDisabled})),r.a.createElement("div",{className:"space"},r.a.createElement(B.a,{className:"input-class",floatinglabeltext:"Password",type:"password",error:null!==this.state.passwordError,helperText:this.state.passwordError,onChange:function(t){return e.onValueChange(t,"password")},id:"standard-basic",required:!0,label:"Password",variant:"outlined",onBlur:this.isSubmitDisabled}))),r.a.createElement("div",{className:"space"},r.a.createElement(B.a,{className:"input-class",floatinglabeltext:"First Name",type:"text",error:null!==this.state.firstNameError,helperText:this.state.firstNameError,onChange:function(t){return e.onValueChange(t,"firstName")},id:"standard-basic",required:!0,label:"First Name",variant:"outlined",onBlur:this.isSubmitDisabled})),r.a.createElement("div",{className:"space"},r.a.createElement(B.a,{className:"input-class",floatinglabeltext:"Second Name",type:"text",error:null!==this.state.secondNameError,helperText:this.state.secondNameError,onChange:function(t){return e.onValueChange(t,"secondName")},id:"standard-basic",required:!0,label:"Second Name",variant:"outlined",onBlur:this.isSubmitDisabled})),r.a.createElement("div",{className:"space"},r.a.createElement(B.a,{className:"input-class",floatinglabeltext:"Organization",type:"text",error:null!==this.state.organizationError,helperText:this.state.organizationError,onChange:function(t){return e.onValueChange(t,"organization")},id:"standard-basic",required:!0,label:"Organization",variant:"outlined",onBlur:this.isSubmitDisabled})),r.a.createElement("div",null,r.a.createElement(H.a,null,r.a.createElement(U.a,{id:"demo-simple-select-label"},"Question"),r.a.createElement(R.a,{labelId:"demo-simple-select-label",id:"demo-simple-select",value:this.state.question,onChange:function(t){return e.onValueChange(t,"question")}},r.a.createElement(J.a,{value:1},"What is your favorite dish?"),r.a.createElement(J.a,{value:2},"What is your favorite game?"),r.a.createElement(J.a,{value:3},"What is your crush name? ")))),r.a.createElement("div",{className:"space"},r.a.createElement(B.a,{className:"input-class",floatinglabeltext:"Answer",type:"text",error:null!==this.state.answerError,helperText:this.state.answerError,onChange:function(t){return e.onValueChange(t,"answer")},id:"standard-basic",required:!0,label:"Answer",variant:"outlined",onBlur:this.isSubmitDisabled})),r.a.createElement("div",null),r.a.createElement("div",{className:"button-class"},r.a.createElement(p.a,{disabled:this.state.disabled,onClick:this.login,variant:"contained",color:"secondary"},"Sign up")),r.a.createElement("a",{href:"/login"},"Old user? Login"))))}}]),a}(n.Component),Y=(a(309),a(310),function(e){Object(c.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).updateText1=function(e){n.setState({text:e})},n.state={text:"Initial Text"},n.updateText1=n.updateText1,n}return Object(i.a)(a,[{key:"render",value:function(){return r.a.createElement(m.a,null,r.a.createElement(d.a,{exact:!0,path:"/",component:w}),r.a.createElement(d.a,{path:"/dataprocessing",component:C}),r.a.createElement(d.a,{path:"/machinelearning",component:O}),r.a.createElement(d.a,{path:"/systemchat",component:q}),r.a.createElement(d.a,{path:"/studentchat",component:F}),r.a.createElement(d.a,{path:"/login",component:P}),r.a.createElement(d.a,{path:"/loginSecond",component:W}),r.a.createElement(d.a,{path:"/signup",component:Q}))}}]),a}(n.Component));s.a.render(r.a.createElement(Y,null),document.getElementById("root"))}},[[183,1,2]]]);
//# sourceMappingURL=main.d37064fd.chunk.js.map